---
title: 文档
description: 部署 ZPan、连接 S3 存储，并构建自己的文件工作流。
---

# ZPan 文档

ZPan 是一个开源、S3 原生的文件平台，为对象存储提供现代文件管理、图床、安全分享、WebDAV、远程下载、团队空间和后台任务。

文件通过预签名 URL 从客户端直接上传到 S3 兼容存储。ZPan 负责身份、元数据、权限与签名，不会让文件流量绕行应用服务器。

## 从这里开始

1. 先[选择部署方式](/zh-cn/docs/getting-started/choose-deployment/)。
2. 按照 [Cloudflare Workers](/zh-cn/docs/deployment/cloudflare/) 或 [Docker](/zh-cn/docs/deployment/docker/) 文档完成部署。
3. 进行[部署后的首次初始化](/zh-cn/docs/getting-started/first-run/)，连接 S3 兼容存储并验证上传。
4. 根据工作流设置[图床](/zh-cn/docs/user-guide/image-hosting/)或[文件分享](/zh-cn/docs/user-guide/file-sharing/)。

## 选择部署方式

Cloudflare Workers + D1 是首选部署目标，不需要维护服务器。希望部署在自己的主机或网络时，可使用 Node.js + SQLite 的 Docker 版本。

ZPan 同时支持 AWS、Vercel、Netlify、Azure 与 Google Cloud。应用保持一致，变化的只是平台适配器与数据库配置。

## 不想自行部署？

打开[官方 ZPan Drive](https://drive.zpan.space)即可直接使用。Pro 与 Business 许可证可在 [ZPan Cloud](https://cloud.zpan.space) 购买和管理。
