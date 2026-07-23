---
title: "ZPan 2.5：从 Workers 与 Docker 扩展到更多平台"
description: "详细介绍 ZPan 2.5 新增的 AWS Lambda、Vercel、Netlify、Azure Functions、Google Cloud Run 与 Turso 数据库适配。"
publishedAt: 2026-04-23
locale: zh-cn
tags: [发布, v2.5]
---

ZPan 2.5 扩展了 V2 的部署范围。除了已有的 Cloudflare Workers 和 Docker，项目开始为更多 Serverless 与容器平台提供独立部署目标。

## 五个新部署平台

本次版本新增：

- AWS Lambda
- Vercel
- Netlify
- Azure Functions
- Google Cloud Run

这些平台的构建、运行时和持久化条件不同，因此 ZPan 为它们提供对应的入口与部署配置，而不是把同一份 Docker 说明直接套到所有环境。

## libSQL 与 Turso

Serverless 平台通常不能把 SQLite 文件永久保存在本地磁盘。2.5 新增 libSQL 数据库适配器，并以 Turso 作为远程数据库方案，让账号、目录和文件记录能够独立于函数实例保存。

Docker 也可以选择 Turso，但这不是强制迁移。本地单实例仍可继续使用 SQLite。

## 头像与图片存储

用户可以在“设置 → 个人资料”上传头像。在 Cloudflare 环境中，图片上传会优先使用 R2 Binding；没有 Binding 时则回退到 S3 兼容存储。

设置页面的视觉设计在本次版本中统一，头像相关的国际化文本也得到补充。

## 升级说明

升级到 2.5 不会自动把已有实例迁移到新平台。跨平台迁移仍需单独处理数据库、环境变量、域名和对象存储配置。

真实版本记录见 [ZPan v2.5.0 Release](https://github.com/saltbo/zpan/releases/tag/v2.5.0)。
