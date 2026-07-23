---
title: Cloudflare Workers
description: 通过 GitHub Actions 部署 ZPan，并自动准备 D1、Queues 与 R2 资源。
sidebar:
  order: 1
---

Cloudflare Workers 是 ZPan 的首选部署方式。它不要求你维护 VPS：应用运行在 Workers，用户、目录、分享和配置保存在 D1，压缩任务通过 Queues 执行，头像保存在单独的 R2 Bucket 中。用户文件仍然由你在管理控制台配置，可以放在任意 S3 兼容存储中。

## 准备账号与 Fork

1. 登录 Cloudflare，并确认账号已经启用 Workers。
2. Fork [saltbo/zpan](https://github.com/saltbo/zpan) 到自己的 GitHub 账号。
3. 在 Cloudflare 控制台复制 **Account ID**。
4. 创建一个 API Token。部署工作流至少需要：
   - `Workers Scripts: Edit`
   - `D1: Edit`
   - `R2 Storage: Edit`
5. 如果你还希望工作流自动配置独立的 WebDAV 子域名，再增加目标 Zone 的 `Transform Rules: Edit` 权限。

不要使用 Global API Key。单独创建 Token，权限更容易审计和撤销。

## 配置 GitHub Secrets

进入 Fork 后的 **Settings → Secrets and variables → Actions**，添加：

| Secret | 内容 |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |
| `CLOUDFLARE_API_TOKEN` | 上一步创建的 API Token |
| `BETTER_AUTH_SECRET` | 可选；不填写时，首次部署会自动生成并保存 |

`BETTER_AUTH_SECRET` 用于签名登录会话。自动生成通常最省事；如果你自行提供，请使用 `openssl rand -base64 32` 生成，并在升级时保持不变。更换它会让已有登录会话失效。

## 运行部署工作流

打开 **Actions → Deploy to Cloudflare Workers → Run workflow**。不指定版本时，工作流会部署最新正式 Release，而不是直接部署上游仓库的 `main`。

首次运行会自动完成这些工作：

1. 创建或复用 `zpan-db` D1 数据库。
2. 创建压缩任务使用的 Queue。
3. 创建保存头像的 `zpan-public-images` R2 Bucket。
4. 设置认证密钥并执行数据库迁移。
5. 构建并部署 Worker。

工作流结束后，打开 Summary 中的 Worker 地址。注册的第一个账号会自动成为站长管理员。

## 绑定正式域名

在 Worker 的 **Settings → Domains & Routes** 中添加 Custom Domain，例如 `files.example.com`。随后进入 ZPan **管理控制台 → 设置 → 站点标识**，把 Public URL 改成完全一致的 `https://files.example.com`。

Public URL 不只是展示字段，分享链接、图床地址与 WebDAV 地址都会依赖它。OAuth Callback 使用认证服务实际运行的域名；域名切换后，也要同步检查每个提供商中的 Callback URL。

## 配置对象存储

Cloudflare 部署完成不代表文件存储已经配置好。进入 **管理控制台 → 存储 → 添加存储**，添加 R2、S3、B2、Tigris 或其他 S3 兼容 Bucket，并按[对象存储配置](/zh-cn/docs/site-management/storage/)设置 CORS。

这里有两个不同的 R2 概念：工作流自动创建的 `zpan-public-images` 只保存头像；用户文件使用哪个 Bucket，仍由你在管理控制台决定。

## 更新与回滚

更新时重新运行部署工作流即可。工作流会复用现有资源并在部署前执行迁移。建议一次只跨一个稳定版本，部署后依次检查登录、上传、分享和后台任务。

如果新版本出现问题，可以在 Cloudflare 的 Worker 版本页面回滚应用代码。但数据库迁移不会随 Worker 回滚，因此生产环境仍应保留 D1 备份，并先阅读版本发布说明。

## 部署后检查

- 首个用户是否为管理员。
- Public URL 是否为最终 HTTPS 域名。
- 存储连接测试是否能完成创建、直传和清理。
- 分享链接是否使用正式域名。
- Worker 日志中是否存在持续错误。
