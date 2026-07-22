---
title: WebDAV
description: 创建应用密码，通过 /dav 连接客户端，并配置独立 dav 子域名。
sidebar:
  order: 4
---

WebDAV 让系统文件管理器、播放器和同步工具通过 ZPan 的权限模型访问文件。不要把 S3 Access Key 交给 WebDAV 客户端；用户应在自己的 ZPan 设置中创建独立的 WebDAV 应用密码。

## 基础地址

所有部署都可以使用：

```text
https://files.example.com/dav/
```

用户名使用 ZPan 用户名或邮箱，密码使用专门创建的应用密码，而不是账号登录密码。每台设备最好创建单独密码，设备丢失后可以只撤销对应凭证。

## 独立 WebDAV 域名

Public URL 为 `https://files.example.com` 时，ZPan 会推导 `https://dav.files.example.com/`。独立域名需要代理在内部把请求路径前缀改写为 `/dav`，同时保留 HTTP Method、Body、`Destination`、`Depth`、`If`、`Overwrite` 和 `Lock-Token` 等 WebDAV Header。

Cloudflare Workers 部署工作流可以在 Token 具备 `Transform Rules: Edit` 时自动配置。Docker 和其他平台需要自行配置 DNS 与反代，然后在 **管理控制台 → 设置 → WebDAV → 验证域名** 中执行验证。

验证未完成前，ZPan 会继续向客户端展示可靠的 `/dav/` 地址，不会提前发布不可用的子域名。

## 常见问题

- 返回 401：检查用户名与应用密码，不要使用普通登录密码。
- 可以列目录但无法写入：检查工作空间权限与客户端是否支持当前操作。
- 独立域名 404：代理没有在内部添加 `/dav` 前缀。
- 移动或重命名失败：代理可能丢失 `Destination`、`Overwrite` 或 `Lock-Token`。
