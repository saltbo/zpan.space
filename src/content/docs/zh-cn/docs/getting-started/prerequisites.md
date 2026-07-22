---
title: 部署前准备
description: 提前准备 ZPan 所需的域名、数据库、认证密钥、对象存储和平台权限。
---

一套生产环境的 ZPan 会同时涉及应用运行平台、数据库、对象存储、DNS，以及可选的邮件服务和身份提供商。开始具体平台的部署步骤之前，先确认这些资源由谁管理，并准备好对应权限。

如果只是临时在本机体验，可以跳过本页，直接使用[快速开始](/zh-cn/docs/getting-started/quick-start/)。

## 1. 确定最终访问地址

准备一个类似 `drive.example.com` 的域名，并确认自己可以管理它的 DNS。生产环境中的登录、分享链接、OAuth Callback、图床地址和 WebDAV 发现都依赖一个稳定的公开地址。

生产环境必须使用 HTTPS。应在配置 OAuth 和 Bucket CORS 之前确定最终域名；以后更换域名时，所有包含旧 Origin 的白名单与回调地址都需要同步更新。

## 2. 准备运行平台与数据库

所有平台运行的是同一套 ZPan 应用，但持久化方式不同。

| 平台 | 部署前需要准备 | 数据库 |
| --- | --- | --- |
| Cloudflare Workers | Cloudflare 账号、Workers/D1 权限、API Token 和 GitHub Fork | D1 |
| Docker | Linux 主机或 NAS、Docker Engine、Compose、持久化 Volume；生产环境还需要反向代理 | 默认使用本地 SQLite，也可使用 Turso |
| AWS Lambda | AWS 账号、部署用 IAM 凭证、Region、GitHub Fork 和 Turso 账号 | Turso/libSQL |
| Vercel | Vercel 账号与项目权限、GitHub Fork 和 Turso 账号 | Turso/libSQL |
| Netlify | Netlify 账号与站点权限、GitHub Fork 和 Turso 账号 | Turso/libSQL |
| Azure Functions | Azure Subscription、Service Principal、资源组权限、GitHub Fork 和 Turso 账号 | Turso/libSQL |
| Google Cloud Run | 已启用结算的 GCP 项目、部署用 Service Account、所需 IAM Role、GitHub Fork 和 Turso 账号 | Turso/libSQL |

Serverless 平台的本地文件系统是临时的，不能拿来保存数据库。在这些生产部署方式中，只有 Docker 可以把 SQLite 保存在本地持久化 Volume 中。

## 3. 生成并保管认证密钥

`BETTER_AUTH_SECRET` 用于签名认证数据。生成一个高强度随机值，保存到目标平台的 Secret Manager，并在部署流水线之外保留一份可恢复的副本。

```sh
openssl rand -base64 32
```

不要在每次部署时重新生成。更换这个值会使已有会话失效，还可能中断正在使用的认证流程。

部分官方部署工作流会在第一次部署时自动创建该密钥。如果使用自动生成，部署完成后仍应从平台中取回并妥善备份。

## 4. 准备 S3 兼容对象存储

为 ZPan 创建独立 Bucket 和专用凭证。应用部署完成后，再从管理控制台添加存储；这些凭证通常不需要放进 GitHub Actions Secrets。

提前记录以下信息：

- 用户浏览器可以访问的 S3 兼容 Endpoint。
- Bucket 名称与 Region。
- 具备所需对象权限的 Access Key 和 Secret Key。
- 当前服务商是否要求 Path-style 请求。
- 用于访问对象的可选公开域名或自定义 Host。

ZPan 对接的是 S3 兼容 API。Google Cloud Storage 本身不能直接替代 S3 Bucket，除非另行提供了兼容接口。

## 5. 规划浏览器 CORS

由于文件采用浏览器直传，浏览器会从 ZPan 的 Origin 向对象存储 Endpoint 发起请求。Bucket 必须允许最终站点域名，以及预签名上传所需的方法和请求头。

确定最终域名之后再应用 CORS。稍后在管理控制台添加存储时，应使用 ZPan 提供的连接测试和 CORS 提示，完整验证创建对象、浏览器上传与清理流程。

## 6. 确认需要哪些可选服务

最基本的文件链路不依赖全部集成。只有在实际需要时才准备：

- 用于邮箱验证、密码重置和邀请的 SMTP 或受支持邮件服务。
- 用于第三方登录的 OAuth 或 OIDC 应用凭证。
- 需要独立域名访问时使用的 WebDAV Hostname。
- 用于执行远程下载任务的一台或多台可访问主机。
- 激活 Pro 或 Business 功能时使用的 ZPan Cloud 账号。

应先跑通登录、存储、上传和下载，再逐项启用可选服务。这样出现问题时，可以明确是哪个边界没有配置正确。

## 可以开始部署了

当你已经确定最终 HTTPS 地址、拥有平台和 DNS 管理权限、准备好可持久化的数据库、保管好认证密钥，并且有一个用户浏览器可以访问的 S3 兼容 Bucket，就可以进入生产部署。

从“部署 ZPan”中选择目标平台，然后从头到尾完成该平台的独立文档。
