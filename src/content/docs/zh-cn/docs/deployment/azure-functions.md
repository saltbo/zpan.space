---
title: Azure Functions
description: 使用 Bicep、Turso 与外部 S3 兼容存储部署 ZPan。
sidebar:
  order: 6
---

如果组织已经在 Azure 中管理应用、身份与监控，Azure Functions 是自然的部署目标。ZPan 使用 Node.js 22 Functions v4 模型运行在 Consumption Plan 中；Turso 保存业务元数据，外部 S3 兼容服务保存用户文件。

## 理解部署资源

官方 Bicep 模板会创建 Consumption Plan、Function App 与 Azure Storage Account。这个 Storage Account 是 Functions Runtime 的必要资源，不是 ZPan 用户文件 Bucket。

Azure Blob Storage 没有提供 ZPan 所需的 S3 兼容 API。部署后请配置 Amazon S3、R2、B2、Tigris、RustFS 或其他兼容服务。

先创建 Turso 数据库，并 Fork [saltbo/zpan](https://github.com/saltbo/zpan)。

## 创建设备凭据

为 GitHub Actions 创建 Service Principal：

```sh
az ad sp create-for-rbac \
  --name zpan-github-actions \
  --role Contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID \
  --sdk-auth
```

把完整 JSON 输出保存为 `AZURE_CREDENTIALS`。订阅级 Contributor 适合快速验证，但生产权限过宽。建议先创建专用 Resource Group，再把 Service Principal 收敛到该范围。

## 配置 GitHub Secrets

添加：

| Secret | 必填 | 用途 |
| --- | --- | --- |
| `AZURE_CREDENTIALS` | 是 | Azure 登录使用的 Service Principal JSON |
| `TURSO_DATABASE_URL` | 是 | 持久化 libSQL 数据库地址 |
| `TURSO_AUTH_TOKEN` | 是 | 数据库认证 |
| `BETTER_AUTH_SECRET` | 否 | 稳定的会话签名密钥 |

未填写时工作流会生成并保存 `BETTER_AUTH_SECRET`。正常升级不要更换它。

## 部署

打开 **Actions → Deploy to Azure Functions → Run workflow**。选择 Resource Group 名称和 Azure Region；版本留空时部署最新正式 Release。

工作流会创建 Resource Group、应用 `deploy/azure-functions/main.bicep`、写入应用设置、执行 Turso 迁移、构建并发布 Function App，最后根据 Azure 域名设置 `APP_URL` 与 `BETTER_AUTH_URL`。

使用 Summary 中的地址验证：

```sh
curl https://your-function-app.azurewebsites.net/api/health
```

新数据库中注册的第一个账号会成为管理员。

## 添加自定义域名

在 Function App 的 **Custom domains** 中绑定域名。TLS 生效后更新 App Settings：

```dotenv
BETTER_AUTH_URL=https://files.example.com
TRUSTED_ORIGINS=https://files.example.com
REFRESH_CRON_SECRET=替换为随机密钥
```

重启或重新部署应用，在 **管理控制台 → 设置 → 站点标识** 中设置同一个 Origin，并更新 OAuth Callback。

## 配置文件存储

进入 **管理控制台 → 存储** 添加 S3 兼容 Bucket。ZPan 使用预签名 URL，上传会从用户浏览器直达 Endpoint，因此 Bucket CORS 必须允许最终 Azure 或自定义域名。详见[对象存储配置](/zh-cn/docs/site-management/storage/)。

除非另有受支持的 S3 网关，否则不要把用户文件写入 Functions Runtime 的 Storage Account。

## 配置定时任务

使用 Azure Timer Trigger、Logic App 或其他私有调度器发送 `POST` 请求：

| 周期 | Endpoint |
| --- | --- |
| 每 6 小时 | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| 每 10 分钟 | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

Azure 提供 [Timer Trigger](https://learn.microsoft.com/zh-cn/azure/azure-functions/functions-bindings-timer) 处理周期任务。无论使用哪种调度器，请确保密钥等于 `REFRESH_CRON_SECRET`，且不被提交到仓库。

## 升级与排错

重新运行工作流即可升级。迁移前备份 Turso，并保留上一个 Function Package 以便回滚代码。

- 基础设施步骤失败：查看 Resource Group 的 Deployment History。
- 页面正常但 API 失败：检查 App Settings 与 Turso 连通性。
- 上传 CORS 错误：问题发生在浏览器与 S3 之间，与 Azure Storage Account 无关。
