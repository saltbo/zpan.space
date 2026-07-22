---
title: 文档
description: 部署 ZPan、连接 S3 存储，并构建自己的文件工作流。
---

# ZPan 文档

ZPan 是一个开源、S3 原生的文件平台，为对象存储提供现代文件管理、图床、安全分享、WebDAV、远程下载、团队空间和后台任务。

文件通过预签名 URL 从客户端直接上传到 S3 兼容存储。ZPan 负责身份、元数据、权限与签名，不会让文件流量绕行应用服务器。

## 从这里开始

1. 按照[快速开始](/zh-cn/docs/getting-started/quick-start/)在本地运行 ZPan。
2. 在生产环境选择 [Cloudflare Workers](/zh-cn/docs/deployment/cloudflare/) 或 Docker。
3. 在初始化过程中连接任意 S3 兼容存储。
4. 根据工作流设置图床或安全分享。

## 选择部署方式

Cloudflare Workers + D1 是首选部署目标，不需要维护服务器。希望部署在自己的主机或网络时，可使用 Node.js + SQLite 的 Docker 版本。

ZPan 同时支持 AWS、Vercel、Netlify、Azure 与 Google Cloud。应用保持一致，变化的只是平台适配器与数据库配置。

## 不想自行部署？

打开[官方 ZPan Drive](https://drive.zpan.space)即可直接使用。Pro 与 Business 许可证可在 [ZPan Cloud](https://cloud.zpan.space) 购买和管理。
