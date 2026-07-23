---
title: Netlify
description: 使用 Netlify Functions、Turso 与浏览器直传 S3 部署 ZPan。
sidebar:
  order: 5
---

如果团队已经使用 Netlify 的 CDN、部署预览与 Functions，ZPan 可以直接进入现有工作流。静态界面由 CDN 提供，API 运行在 Netlify Function 中；Turso 持久化业务元数据，独立的 S3 兼容 Bucket 保存文件。

## 准备 Netlify 与 Turso

Fork [saltbo/zpan](https://github.com/saltbo/zpan)，创建 Netlify Site 与 Turso 数据库。在 **Site configuration → General** 复制 Site ID，并为部署工作流创建 Personal Access Token。

官方 `netlify.toml` 已经把 API 请求转发到 ZPan Function，并把迁移文件包含在 Function Bundle 中。请直接使用仓库配置，不要在 Dashboard 中重复创建路由。

## 配置 GitHub Secrets

添加以下 Repository Secrets：

| Secret | 必填 | 用途 |
| --- | --- | --- |
| `NETLIFY_AUTH_TOKEN` | 是 | 授权部署 |
| `NETLIFY_SITE_ID` | 是 | 选择 Netlify Site |
| `TURSO_DATABASE_URL` | 是 | 持久化 libSQL 数据库地址 |
| `TURSO_AUTH_TOKEN` | 是 | 数据库认证 |
| `BETTER_AUTH_SECRET` | 否 | 稳定的会话签名密钥 |

未填写 `BETTER_AUTH_SECRET` 时，工作流会自动生成并保存；升级时保持不变。

运行时变量必须包含 **Functions** Scope。Netlify 明确说明，写在 `netlify.toml` 中的值不会自动提供给 Function，所以 Secret 应通过 Dashboard 或 CLI 保存。参考 [Netlify 环境变量文档](https://docs.netlify.com/build/functions/environment-variables/)。

## 部署

打开 **Actions → Deploy to Netlify → Run workflow**。工作流会选择正式 Release，把必要环境变量写入 Netlify，执行 Turso 迁移、构建并发布站点。

验证部署地址：

```sh
curl https://your-site.netlify.app/api/health
```

新数据库中注册的第一个账号会成为管理员。

## 配置正式 Origin

在 **Domain management** 中添加自定义域名，然后为 Functions Scope 添加或更新：

```dotenv
BETTER_AUTH_URL=https://files.example.com
TRUSTED_ORIGINS=https://files.example.com
REFRESH_CRON_SECRET=替换为随机密钥
```

修改后触发一次新部署。在 **管理控制台 → 设置 → 站点标识** 中设置同一个地址，并同步更新 OAuth Callback。

## 配置 S3 兼容存储

Netlify 的部署存储不是 ZPan 对象存储。进入 **管理控制台 → 存储** 添加 Bucket；Endpoint 必须能被浏览器访问，CORS 必须允许最终生产 Origin。

文件通过预签名 URL 在浏览器与 S3 之间直传，不经过 Netlify Function。参考[对象存储配置](/zh-cn/docs/site-management/storage/)，并在域名变化后重新运行连接测试。

## 配置定时任务

使用外部调度器，或另写一个 Netlify Scheduled Function，发送带密钥的 `POST` 请求：

| 周期 | Endpoint |
| --- | --- |
| 每 6 小时 | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| 每 10 分钟 | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

请求密钥必须等于 `REFRESH_CRON_SECRET`。不要公开调度器 URL 和请求日志。

## 升级与排错

重新运行工作流即可升级。迁移前备份 Turso，部署后验证登录、上传、分享与两个定时调用。

- 页面正常但 API 失败：检查环境变量是否包含 Functions Scope。
- 认证跳回 Netlify 子域名：统一 `BETTER_AUTH_URL`、Public URL 与 OAuth Callback。
- 只有上传失败：检查 S3 Endpoint 和 CORS。
