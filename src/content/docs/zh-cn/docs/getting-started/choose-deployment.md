---
title: 选择部署方式
description: 根据运维成本和现有基础设施，在 Cloudflare Workers、Docker 与其他运行时之间做选择。
sidebar:
  order: 3
---

ZPan 把控制平面和文件存储分开了。应用可以运行在 Workers、容器或 Serverless Function 上，文件则继续放在任意 S3 兼容存储中。因此选择部署方式时，真正要考虑的不是“文件放在哪里”，而是“你愿意维护多少基础设施”。

| 部署方式 | 数据库 | 适合场景 | 运维成本 |
| --- | --- | --- | --- |
| Cloudflare Workers | D1 | 大多数个人和小团队 | 最低 |
| Docker | SQLite 或 Turso | VPS、NAS、Homelab、内网 | 需要维护主机与反代 |
| AWS Lambda | Turso | 已经使用 AWS 的团队 | 需要 IAM 与定时任务 |
| Vercel / Netlify | Turso | 已经使用对应平台的团队 | 注意平台限制与定时任务 |
| Azure Functions | Turso | 现有 Azure 环境 | 需要服务主体与定时任务 |
| Google Cloud Run | Turso | 现有 GCP 容器环境 | 需要 GCP IAM，可能有冷启动 |

## 默认建议

如果你只是想长期稳定地运行一个自己的 ZPan，我建议优先选择 **Cloudflare Workers**。它用 Workers 运行应用、D1 保存元数据、Queues 处理压缩任务，并用一个小型 R2 存储桶保存头像。真正的用户文件仍然可以放在 R2、S3、B2、Tigris、MinIO 或其他 S3 兼容存储中。

如果应用必须放在自己的网络里，或者你已经有 VPS、NAS 和 Docker 环境，就选择 **Docker**。Docker 也最适合把 ZPan 与远程下载器一起部署。

其余 Serverless 目标更适合已经在对应云平台上完成账号、权限和监控建设的团队。由于这些平台的本地文件系统不能持久化，它们都需要 Turso 作为数据库。

## 所有部署都需要准备什么

开始之前，请准备好：

1. 一个最终用于访问 ZPan 的 HTTPS 地址。
2. 一个稳定且妥善保存的认证密钥。
3. 当前运行时支持的数据库。
4. 一个 S3 兼容存储桶，以及具备对象读、写、删除权限的凭证。
5. 允许 ZPan 最终域名访问存储桶的浏览器 CORS 规则。

最后一点最容易被忽略。ZPan 的文件是浏览器直传对象存储的，因此“服务端能访问 Bucket”并不等于“用户可以上传文件”。

## 接下来

- [部署到 Cloudflare Workers](/zh-cn/docs/deployment/cloudflare/)
- [使用 Docker 部署](/zh-cn/docs/deployment/docker/)
- [配置对象存储](/zh-cn/docs/site-management/storage/object-storage/)
