---
title: 部署平台能力对照
description: 比较 ZPan 各部署平台的运行条件与能力差异。
sidebar:
  order: 3
---

ZPan 还提供 AWS Lambda、Vercel、Netlify、Azure Functions 与 Google Cloud Run 的官方构建入口和 GitHub Actions 工作流。这些目标适合已经在对应平台建立账号、IAM、账单和监控体系的团队。

## 共同前提

这些平台都需要远程 Turso/libSQL 数据库和外部 S3 兼容存储。Function 或容器的临时文件系统不能替代数据库，也不能作为用户文件存储。

共同 Secret 包括：

- `TURSO_DATABASE_URL`
- 远程数据库使用的 `TURSO_AUTH_TOKEN`
- 稳定的 `BETTER_AUTH_SECRET`
- 最终域名对应的 `BETTER_AUTH_URL`
- 当前平台的部署凭证

Bucket 凭证不需要放进 GitHub Actions；应用上线后在 ZPan 管理后台配置。

## 平台差异

| 平台 | 入口 | 主要额外配置 |
| --- | --- | --- |
| AWS Lambda | Function URL | AWS IAM、SAM Artifact Bucket |
| Vercel | Node.js Function | Org ID、Project ID、Token |
| Netlify | Functions v2 | Site ID、Personal Access Token |
| Azure Functions | Node.js v4 | Service Principal、Resource Group |
| Google Cloud Run | Docker 容器 | GCP Service Account、Secret Manager |

Vercel 使用 Node.js Runtime，而不是 Edge Runtime；S3 SDK 依赖 Node 的 Stream 与 Crypto 能力。Google Cloud Storage 也不是这里的文件后端，ZPan 需要 S3 兼容 API。

## 定时任务

没有常驻进程的平台需要外部 Scheduler 定期调用授权刷新和流量同步接口。设置 `REFRESH_CRON_SECRET` 后，分别按 6 小时和 10 分钟周期发送受保护的 POST 请求。具体 URL 与工作流参数以 [ZPan 仓库中的平台部署文档](https://github.com/saltbo/zpan/tree/main/docs/deploy)为准。

## 上线验证

无论哪个平台，都按相同顺序检查：健康接口、首个管理员、Public URL、数据库迁移、对象存储 CORS 与直传、分享链接、定时任务。平台显示“部署成功”只证明构建已发布，并不证明文件链路可用。

## 数据库与持久化

数据库保存账号、设置、目录结构、权限、配额、分享、任务和对象引用，文件内容始终位于配置的对象存储中。

- Node 和 Docker 默认使用 `./zpan.db` 下的 SQLite。应通过 `DATABASE_URL` 指向明确的持久化路径，并挂载为持久卷。
- Node 可以通过 `TURSO_DATABASE_URL` 使用 Turso/libSQL；远程数据库同时设置 `TURSO_AUTH_TOKEN`。
- 除 Cloudflare 原生版本外，Serverless 平台使用远程 Turso/libSQL，因为函数本地文件系统不持久。
- Cloudflare 部署使用配置文件声明的 D1 Binding。

不要把 SQLite 放在对象存储挂载或不可靠的网络共享上，也不要让多个独立实例写入同一个 SQLite 文件。数据库与对象存储必须从一致时间点分别备份，任何一方都无法重建另一方。

## 版本与客户端兼容性

ZPan 前端、API、数据库结构和下载节点必须使用兼容版本。前后端应来自同一发布产物；发布说明提到协议或授权变化时，同步升级下载节点。

主要浏览器目标是当前版本的 Chrome、Edge、Firefox 和 Safari。WebDAV 客户端在 Lock、文件名和大文件行为上存在差异，应测试用户实际依赖的客户端与系统版本。

升级前查看发布说明中的最低 Node、数据库、平台和下载节点要求。反馈兼容问题时，应提供 ZPan 版本、部署目标、浏览器或客户端版本和存储服务商，但不要暴露凭据。
