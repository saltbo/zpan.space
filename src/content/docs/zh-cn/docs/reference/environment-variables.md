---
title: "环境变量"
description: 查阅不同 ZPan 运行时使用的认证、数据库、端口和定时任务环境变量。
---

环境变量用于运行时和平台密钥。站点品牌、注册、验证码、邮件和对象存储连接等产品设置应在管理控制台配置。

| 变量 | 是否必需 | 用途 |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | 是 | 登录与派生凭据使用的稳定密钥 |
| `BETTER_AUTH_URL` | 生产环境 | 规范公开 Origin，如 `https://drive.example.com` |
| `PORT` | Node 可选 | HTTP 监听端口 |
| `DATABASE_URL` | Node 可选 | SQLite 路径，默认 `./zpan.db` |
| `TURSO_DATABASE_URL` | Turso 平台 | libSQL/Turso 数据库地址 |
| `TURSO_AUTH_TOKEN` | 远程 Turso | 远程数据库 Token |
| `REFRESH_CRON_SECRET` | 外部 Cron | 保护定时维护接口 |

Cloudflare 的 D1、R2 等 Binding 在 Worker 配置中声明，不使用上面的 Node 变量。各平台部署文档会列出 CI 所需的额外凭据。

使用托管平台提供的 Secret 管理，不要把服务端密钥暴露为前端公开变量，不要提交 `.env`，也不要把值放进截图。日常发布时保持 `BETTER_AUTH_SECRET` 不变，否则会话和设备授权可能失效。

修改 `BETTER_AUTH_URL` 后，还要同步更新 OAuth/OIDC 回调、存储 CORS、WebDAV 地址和反向代理配置，然后重新部署并完成一次登录验证。
