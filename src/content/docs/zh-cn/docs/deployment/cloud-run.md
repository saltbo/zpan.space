---
title: Google Cloud Run
description: 使用 Turso、Secret Manager 与 S3 兼容存储把 ZPan 部署为 Cloud Run 容器。
sidebar:
  order: 7
---

如果组织已经在 Google Cloud 上管理容器，Cloud Run 是很合适的 ZPan 部署目标。应用使用官方 Dockerfile 构建并自动伸缩；Turso 保存元数据，Secret Manager 保护凭据，用户文件则留在外部 S3 兼容 Bucket 中。

## 架构与前置条件

仓库中的 Service Manifest 让 ZPan 监听 `8222` 端口，使用 1 CPU、512 MiB 内存、并发 `80` 与 300 秒请求超时，实例数可从零扩展到十。实例是临时的，也可能并发运行，因此必须使用 Turso，不能使用本地 SQLite。

部署前需要：

- 已启用 Billing 与 Cloud Run 的 Google Cloud Project。
- Turso 数据库和 Token。
- Fork [saltbo/zpan](https://github.com/saltbo/zpan)。
- S3 兼容 Bucket。Google Cloud Storage 目前不是 ZPan 已适配的存储类型。

## 创建部署 Service Account

工作流需要构建镜像、写入 Secret、部署 Cloud Run 并允许公开调用。仓库的快速部署文档列出了 Cloud Run Admin、Cloud Build Editor、Secret Manager Admin、Service Account User 与 Storage Admin 等角色。

这些权限用于快速验证，生产环境应拆分构建与运行身份，只允许读取 ZPan 使用的 Secret，并把部署权限收敛到该服务涉及的 Project Resource。Google 建议使用 [Secret Manager 管理 Cloud Run Secret](https://cloud.google.com/run/docs/configuring/services/secrets)。

如果 GitHub 尚未使用 Workload Identity Federation，再为部署身份创建 JSON Key。

## 配置 GitHub Secrets

添加：

| Secret | 必填 | 用途 |
| --- | --- | --- |
| `GCP_SERVICE_ACCOUNT_KEY` | 是 | 部署 Service Account JSON |
| `GCP_PROJECT_ID` | 是 | 选择 Google Cloud Project |
| `TURSO_DATABASE_URL` | 是 | 持久化 libSQL 数据库地址 |
| `TURSO_AUTH_TOKEN` | 是 | 数据库认证 |
| `BETTER_AUTH_SECRET` | 否 | 稳定的会话签名密钥 |
| `BETTER_AUTH_URL` | 否 | 最终公开 HTTPS Origin |

未填写时，工作流会自动生成并保存 `BETTER_AUTH_SECRET`。

## 部署

打开 **Actions → Deploy to Google Cloud Run → Run workflow**。选择靠近 Turso 数据库和主要用户的 Region；版本留空时部署最新正式 Release。

工作流会启用必要的 Google API、执行 Turso 迁移、保存 Secret、构建容器、部署 `deploy/cloud-run/service.yaml`、授予公开 Invoker 权限，并记录生成的服务地址。

验证：

```sh
curl https://your-service.run.app/api/health
```

确认连接的是目标 Turso 数据库后，再注册首个管理员。

## 添加自定义域名

通过 Google Cloud 支持的自定义域名方案暴露 Cloud Run，然后把 `BETTER_AUTH_URL` 设置为完全一致的 HTTPS Origin，并部署新 Revision。在 **管理控制台 → 设置 → 站点标识** 中设置同一个地址，同时更新 OAuth Callback。

正式域名生效后，不要再让分享链接使用生成的 `run.app` 地址。

## 配置 S3 兼容存储

进入 **管理控制台 → 存储** 添加 Bucket。Cloud Run 容器负责签发权限，但文件内容通过预签名 URL 在浏览器与 S3 之间直传。请按最终 Origin 配置 Endpoint 与 CORS，详见[对象存储配置](/zh-cn/docs/site-management/storage/)。

Cloud Run 容器文件系统和 Google Cloud Storage 都不会自动成为 ZPan 文件存储。

## 配置定时任务

设置 `REFRESH_CRON_SECRET`，然后用 Cloud Scheduler 发送带密钥的 `POST` 请求：

| 周期 | Endpoint |
| --- | --- |
| 每 6 小时 | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| 每 10 分钟 | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

Google 提供[定时调用 Cloud Run](https://cloud.google.com/run/docs/triggering/using-scheduler) 的官方方案。ZPan 主服务本身是公开的，因此这两个应用 Endpoint 仍要使用随机密钥保护，并保持 Scheduler 配置私有。

## 升级与排错

重新运行工作流会创建新的 Cloud Run Revision。迁移前备份 Turso。Cloud Run 可以在 Revision 之间切换流量，但旧容器无法撤销数据库迁移。

- Revision 无法 Ready：查看启动日志与 Secret Manager 权限。
- API 延迟偏高：先让 Cloud Run 与 Turso 更接近，再考虑增加计算资源。
- 只有文件传输失败：检查浏览器到 S3 的请求与 Bucket CORS。
