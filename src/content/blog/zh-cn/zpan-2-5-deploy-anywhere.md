---
title: "ZPan 2.5：同一个 ZPan，七种部署方式"
description: "Cloudflare Workers、Docker、AWS、Vercel、Netlify、Azure 与 Google Cloud 共享同一套产品能力。"
publishedAt: 2026-04-23
locale: zh-cn
tags: [发布, v2.5]
---

自托管软件经常把“可以部署”理解为提供一个 Docker 镜像。但真实团队的约束并不一样：有人不想维护服务器，有人必须运行在内网，有人已经把权限、账单和监控全部放在某个云平台。

ZPan 2.5 把部署支持扩展到七个目标：Cloudflare Workers、Docker、AWS Lambda、Vercel、Netlify、Azure Functions 与 Google Cloud Run。它们不是七个产品分支，而是同一个 Hono 应用的七个运行时入口。

## 业务逻辑不跟平台一起分叉

ZPan 的路由、用例和 S3 文件模型保持共享。平台适配层只负责回答三个问题：数据库从哪里取得、环境变量和 Binding 如何读取、HTTP 请求怎样进入应用。

因此新增部署目标不会复制一遍分享、配额或权限逻辑。用户在不同平台上看到的仍然是同一个 ZPan，升级路径与数据模型也保持一致。

## Workers 与 Docker 仍然是两条主线

Cloudflare Workers 是首选目标。它适合希望少运维的个人和小团队：Workers 运行控制平面，D1 保存元数据，Queues 处理后台任务，用户文件直接进入 S3。

Docker 是通用自托管目标。它适合 VPS、NAS、Homelab 和内网环境，默认使用持久化 SQLite，也可以连接 Turso。远程下载器可以与主站一起启动。

如果没有既有平台约束，从这两个目标中选择即可。更多选项不是为了让第一次部署变复杂，而是让已经使用 AWS、Vercel、Netlify、Azure 或 GCP 的团队不必额外引入一套基础设施。

## Serverless 目标为什么需要 Turso

Lambda、Vercel Function 等运行环境的本地文件系统不能作为持久数据库。2.5 使用 libSQL/Turso 让这些目标继续共享 SQLite 家族的数据模型，同时获得远程连接能力。

对象存储与运行平台仍然彼此独立。在 Vercel 上运行 ZPan，不代表文件必须进入 Vercel；在 Cloud Run 上运行，也不代表必须使用 GCS。ZPan 需要的是 S3 兼容 API，计算与文件位置可以自由组合。

## 部署完成后的步骤完全相同

无论选择哪个平台，首次上线都要完成相同的产品初始化：注册第一个管理员、设置 Public URL、添加对象存储、配置 CORS、测试浏览器直传，然后再配置邮件、OAuth 与注册策略。

不同平台真正不同的是数据库、密钥保存和定时任务。Docker 有常驻进程执行周期任务；部分 Serverless 目标需要外部 Scheduler 调用授权刷新与流量同步端点。

## 怎样选择

如果你不想维护服务器，选择 Cloudflare Workers。如果你已经有一台稳定主机或需要内网部署，选择 Docker。只有当组织已经在某个云平台建立权限和运维体系时，才优先考虑相应的 Serverless 目标。

部署不是平台名称越多越好，而是选择一条你能够长期升级、备份和排错的路径。先完成[部署前准备](/zh-cn/docs/getting-started/prerequisites/)，再进入目标平台的独立部署文档。
