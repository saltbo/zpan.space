---
title: "ZPan 2.0：为边缘运行时重新构建"
description: "一次完整的 TypeScript 重写，如何让 ZPan 同时适配 Cloudflare Workers 与 Docker。"
publishedAt: 2026-04-12
locale: zh-cn
tags: [发布, v2.0]
---

ZPan 2.0 不只是换了一套界面，而是一次完整的 TypeScript 重写。Hono API、React 前端、共享类型和平台适配层共同构成了今天的架构。

## S3 始终是数据平面

应用服务器负责鉴权并签发预签名 URL，客户端随后把文件直接传到 S3 兼容存储。这样既适合 Workers，也避免大文件占用服务端带宽，同时让计算平台与存储选择保持独立。

## 两个主要运行时，同一个产品

Cloudflare Workers + D1 成为首选目标，Node.js + SQLite 的 Docker 部署仍是一等公民。文件管理、预览、后台管理与国际化能力在两个运行时保持一致。

这层清晰的边界，也为后续新增更多部署目标打下基础。认证、团队、分享、图床和后台任务都能在同一架构上逐步演进。

从[快速开始](/zh-cn/docs/getting-started/quick-start/)运行当前版本。
