---
title: Cloudflare Workers
description: 通过 GitHub Actions 将 ZPan 部署到 Cloudflare Workers。
---

Cloudflare Workers 是 ZPan 推荐的部署方式。应用运行在 Workers，关系数据保存在 D1，文件保存在你选择的 S3 兼容存储中。

准备好 Cloudflare 账号并 Fork [ZPan 仓库](https://github.com/saltbo/zpan)，然后创建具有 Workers Scripts、D1 与 R2 编辑权限的 API Token。

把 Token 保存为 GitHub Actions Secret `CLOUDFLARE_API_TOKEN`，把账户 ID 保存为 `CLOUDFLARE_ACCOUNT_ID`。随后运行 **Deploy to Cloudflare Workers** 工作流即可。
