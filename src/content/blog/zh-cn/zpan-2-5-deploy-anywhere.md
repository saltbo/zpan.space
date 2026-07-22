---
title: "ZPan 2.5：一个应用，七种部署目标"
description: "在保持同一产品与 S3 原生架构的前提下，ZPan 从 Workers 和 Docker 扩展到更多平台。"
publishedAt: 2026-04-23
locale: zh-cn
tags: [发布, v2.5]
---

有人偏好零运维的边缘部署，有人必须使用现有云账户、传统服务器或特定数据库。ZPan 2.5 把这些差异限制在部署层，而不是拆成多个产品分支。

## 七种支持目标

同一个应用可以运行在 Cloudflare Workers、Docker、AWS、Vercel、Netlify、Azure 与 Google Cloud。Cloudflare 仍是首选目标，Docker 仍是通用的自托管方案。

## 计算与存储彼此独立

部署位置不决定存储位置。ZPan 持续使用 S3 兼容 API，因此运行在一个平台上的应用完全可以连接另一个厂商的对象存储。Turso 也为不适合本地 SQLite 或 D1 的场景提供了可移植数据库选项。

共享 Hono 应用保证产品行为一致，窄平台适配层处理运行时差异，避免重复实现业务能力。
