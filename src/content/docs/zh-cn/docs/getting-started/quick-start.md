---
title: 快速开始
description: 选择 Cloudflare Workers 或 Docker，部署第一个 ZPan 实例。
---

对于大多数个人部署，建议从 **Cloudflare Workers** 开始。如果你已经有服务器，或者希望所有组件都运行在自己的网络中，可以选择 **Docker**。

## Cloudflare Workers

1. [Fork ZPan 仓库](https://github.com/saltbo/zpan/fork)。
2. 在 Fork 中打开 **Settings → Secrets and variables → Actions**。
3. 添加 `CLOUDFLARE_ACCOUNT_ID`。
4. 添加具有 Workers Scripts、D1 和 R2 编辑权限的 `CLOUDFLARE_API_TOKEN`。
5. 打开 **Actions → Deploy to Cloudflare Workers** 并运行工作流。

工作流会创建所需的 Worker 和数据库资源。部署完成后打开访问地址并注册，第一个账号会自动成为管理员。

## Docker

```sh
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.yml
docker compose up -d
```

打开 `http://localhost:8222` 并注册第一个账号。

## 连接存储

登录管理员账号后：

1. 打开 **管理后台 → 存储**。
2. 填写 S3 Endpoint、Bucket、Region、Access Key 和 Secret Key。
3. 测试连接并保存。
4. 在文件页面上传一个小文件进行验证。

:::caution[Endpoint 必须能被浏览器访问]
文件从用户浏览器直接上传到 S3。`minio:9000` 这样的 Docker 内部地址无法被浏览器访问；本地测试请使用 `localhost`，生产环境请使用公开域名。
:::
