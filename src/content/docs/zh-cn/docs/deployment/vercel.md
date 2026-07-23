---
title: Vercel
description: 使用 Node.js Vercel Function、Turso 与外部 S3 存储部署 ZPan。
sidebar:
  order: 4
---

如果团队已经使用 Vercel 发布 Web 应用，可以把 ZPan 纳入同一套部署流程。静态界面由 Vercel CDN 提供，API 运行在 Node.js 22 Function 中；Turso 保存元数据，用户文件则继续放在独立的 S3 兼容存储中。

## 准备项目

Fork [saltbo/zpan](https://github.com/saltbo/zpan)，创建 Turso 数据库，并在 Vercel 创建或选择一个 Project。ZPan 使用 Node.js Runtime，不使用 Edge Runtime。

在本地 Clone 中完成一次关联：

```sh
cp deploy/vercel/vercel.json vercel.json
pnpm exec vercel link
```

生成的 `.vercel/project.json` 包含 GitHub Actions 需要的组织和项目 ID。不要提交 `.vercel` 目录。

## 配置 GitHub Secrets

在 **Settings → Secrets and variables → Actions** 中添加：

| Secret | 必填 | 用途 |
| --- | --- | --- |
| `VERCEL_TOKEN` | 是 | 授权 Vercel CLI 部署 |
| `VERCEL_ORG_ID` | 是 | 标识账号或 Team |
| `VERCEL_PROJECT_ID` | 是 | 标识关联的 Project |
| `TURSO_DATABASE_URL` | 是 | 持久化 libSQL 数据库地址 |
| `TURSO_AUTH_TOKEN` | 是 | 数据库认证 |
| `BETTER_AUTH_SECRET` | 否 | 稳定的会话签名密钥 |
| `BETTER_AUTH_URL` | 否 | 最终 HTTPS Origin |
| `TRUSTED_ORIGINS` | 否 | 需要时补充允许的 Origin |

未提供 `BETTER_AUTH_SECRET` 时，工作流会自动生成并保存。正常升级不要更换它。

## 部署

打开 **Actions → Deploy to Vercel → Run workflow**。不指定版本时，工作流会解析最新正式 Release、执行 Turso 迁移、构建并创建 Production Deployment。

仓库配置把 `/api/*` 与 `/health` 路由到一个 Node.js Function，其他请求返回单页应用。使用 Summary 中的地址验证：

```sh
curl https://your-project.vercel.app/api/health
```

确认部署连接到正确的 Turso 数据库后，再注册首个管理员。

## 绑定自定义域名

在 **Project → Settings → Domains** 添加域名，或参考 Vercel 的[自定义域名文档](https://vercel.com/docs/domains/set-up-custom-domain)。随后把 `BETTER_AUTH_URL` 设置为最终 HTTPS Origin，按需更新 `TRUSTED_ORIGINS`，并重新部署。

在 **管理控制台 → 设置 → 站点标识** 中设置同一个地址，同时更新 OAuth Callback。环境变量修改后必须新建部署，Function 才能读取新值。

## 配置文件存储

Vercel 承载的是界面和 API，不会自动成为用户文件存储。进入 **管理控制台 → 存储** 添加 S3 兼容 Bucket，并让 CORS 允许最终的 Vercel 或自定义域名。

浏览器通过预签名 URL 直接上传，因此 Vercel Function 的请求体和执行时长限制不决定最大文件大小；对象存储本身的限制仍然有效。详见[对象存储配置](/zh-cn/docs/site-management/storage/)。

## 配置定时任务

在 Vercel Project 中设置随机的 `REFRESH_CRON_SECRET`，再使用私有调度器发送：

| 周期 | Endpoint |
| --- | --- |
| 每 6 小时 | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| 每 10 分钟 | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

Vercel 支持 [Cron Jobs](https://vercel.com/docs/cron-jobs)，但 Cron Path 会保存在项目配置中。不要把密钥直接写进 `vercel.json`；应使用受保护的包装 Endpoint，或把完整请求配置留在私有调度器中。

## 升级与排错

重新运行工作流即可升级。迁移前备份 Turso，并保留上一个 Vercel Deployment 以便回滚代码。

- 所有 API 都返回 `500`：检查 Turso 与认证环境变量。
- OAuth 跳回 `*.vercel.app`：绑定域名后没有更新 `BETTER_AUTH_URL`。
- 上传出现 CORS 错误：检查浏览器到 S3 的请求，而不是 Vercel 部署。
