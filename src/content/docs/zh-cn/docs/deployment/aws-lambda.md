---
title: AWS Lambda
description: 使用 SAM、Turso 与 Lambda Function URL 部署 ZPan。
sidebar:
  order: 3
---

如果团队已经在 AWS 上管理权限、监控与账单，AWS Lambda 可以让 ZPan 在没有常驻服务器的情况下运行。ZPan 以 Node.js 22 Lambda 提供服务，通过 Function URL 对外访问；Turso 保存业务元数据，用户文件仍放在你选择的 S3 兼容存储中。

## 架构与准备工作

官方模板会部署一个名为 `zpan` 的 Lambda，配置 512 MB 内存与 30 秒超时。Function URL 在网络层公开，用户身份与文件权限仍由 ZPan 处理。

部署前需要：

- 一个支持 [Lambda Function URL](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/urls-configuration.html) 的 AWS 区域。
- Turso 数据库和 Token。Lambda 本地文件系统不能用作持久数据库。
- Fork [saltbo/zpan](https://github.com/saltbo/zpan)。
- 一个能够被用户浏览器访问的 S3 兼容 Bucket。

## 配置 GitHub Secrets

进入 Fork 的 **Settings → Secrets and variables → Actions**，添加：

| Secret | 必填 | 用途 |
| --- | --- | --- |
| `AWS_ACCESS_KEY_ID` | 是 | 部署 SAM Stack |
| `AWS_SECRET_ACCESS_KEY` | 是 | 认证部署工作流 |
| `AWS_REGION` | 是 | 选择 Lambda 区域 |
| `TURSO_DATABASE_URL` | 是 | 持久化 libSQL 数据库地址 |
| `TURSO_AUTH_TOKEN` | 是 | 数据库认证 |
| `BETTER_AUTH_SECRET` | 否 | 稳定的会话签名密钥；未填写时自动生成 |

仓库中的 IAM 示例用于快速验证，包含较宽泛的 Lambda、IAM、S3 与 CloudFormation 权限。生产环境应创建独立部署角色，并把权限收敛到 `zpan` Stack 及其构建产物 Bucket。

升级时保持 `BETTER_AUTH_SECRET` 不变，否则所有用户都会退出登录。

## 运行部署工作流

打开 **Actions → Deploy to AWS Lambda → Run workflow**。不指定版本时会部署最新正式 Release。

工作流会先执行数据库迁移，再创建以账号和区域命名的 SAM 构建产物 Bucket，打包应用并部署 `zpan` CloudFormation Stack。首次部署完成后，它会把 Function URL 写入 `APP_URL` 与 `BETTER_AUTH_URL`。

使用 Summary 中的地址验证：

```sh
curl https://your-function-url/api/health
```

新数据库中注册的第一个账号会成为管理员。

## 配置正式域名

Lambda Function URL 不能直接绑定自定义域名。你可以保留生成的地址，或在前面增加支持自定义域名和 TLS 的 AWS 服务。公开 Origin 改变后，需要更新 `BETTER_AUTH_URL`、重新部署，并在 **管理控制台 → 设置 → 站点标识** 中设置同一个地址。

同时更新 OAuth Callback。除非已经明确配置多 Origin，否则认证地址与 Public URL 不要使用不同域名。

## 配置对象存储

SAM 构建产物 Bucket 只用于部署，不是 ZPan 的用户文件存储。进入 **管理控制台 → 存储**，添加 Amazon S3、R2、B2、Tigris 或其他 S3 兼容 Bucket。

上传下载使用预签名 URL，文件直接在浏览器与 Bucket 之间传输，不经过 Lambda。Endpoint 必须能被浏览器访问，CORS 必须允许 ZPan 的最终域名。请先完成[对象存储配置](/zh-cn/docs/site-management/storage/)，再测试大文件上传。

## 配置定时任务

Lambda 实例不会持续运行。使用 EventBridge Scheduler、私有外部 Cron 或其他调度器发送带密钥的 `POST` 请求：

| 周期 | Endpoint |
| --- | --- |
| 每 6 小时 | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| 每 10 分钟 | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

在 Lambda 环境变量中设置相同的 `REFRESH_CRON_SECRET`。不要把密钥提交到仓库或输出到公开日志。

## 升级与排错

重新运行工作流即可升级。迁移会在替换 Lambda 包之前执行，因此生产升级前要备份 Turso 并阅读 Release Notes；回滚代码不会撤销已经完成的数据库迁移。

`/api/health` 失败时先检查 CloudWatch 日志。如果只有上传失败，优先检查 Bucket CORS 与浏览器网络请求，因为文件内容不会经过 Lambda。
