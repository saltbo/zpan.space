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
