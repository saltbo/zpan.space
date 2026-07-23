---
title: 登录与邮件
description: 配置 ZPan 密码登录、OAuth、自定义 OIDC、SMTP 和邮箱验证。
sidebar:
  order: 3
---

ZPan 支持邮箱或用户名加密码、内置 OAuth，以及自定义 OpenID Connect。在强制邮箱验证或依赖找回密码之前，应先确保邮件服务可靠。

![ZPan 英文版 OAuth 与 OIDC 管理页面](/images/docs/admin-oauth.png)

## 添加服务商之前

先设置最终 Public URL 和 `BETTER_AUTH_URL`。测试新服务商时，至少保留一种已经验证可用的管理员登录方式。

内置 OAuth Callback 形式为：

```text
https://files.example.com/api/auth/callback/<provider-id>
```

自定义 OIDC 使用：

```text
https://files.example.com/api/auth/oauth2/callback/<provider-id>
```

始终复制管理后台展示的完整 Callback。Scheme、域名、端口、路径和 Provider ID 必须与上游应用逐字一致。

## 内置 OAuth

在身份服务商处创建 Confidential Web Application，添加后台展示的 Callback，再把 Client ID 和 Client Secret 保存到 **管理后台 → OAuth**。不同环境应使用独立的上游应用和 Secret。

使用全新测试账号验证首次登录、重复登录、退出，以及上游账号被禁用后的表现。不再使用的服务商应删除；Secret 出现在仓库、日志或聊天后立即轮换。

## 自定义 OIDC

自定义 OIDC 可连接 Keycloak、Authentik、Authelia、Okta 和企业身份服务。填写稳定的 Provider ID、显示名称、Issuer 或 Discovery URL、Client ID、Client Secret 和 Scopes。

Scope 至少需要 `openid`，通常还包括 `profile` 和 `email`。Issuer 必须与 Discovery 文档和 Token 的 `iss` 一致。ZPan 需要稳定 Subject 和可用 Email Claim 才能创建并重新关联账号。

Discovery 失败通常表示 Issuer 错误或 ZPan 运行环境无法访问；Token 校验失败还可能来自服务器时间错误，或代理改变了公开 Scheme。

## 邮件服务

进入 **管理后台 → 设置 → 邮件**，配置服务商、SMTP Host 与端口、凭据、发件人名称和地址。使用专门为 ZPan 创建的凭据。

SMTP 加密模式以服务商文档为准：465 通常使用隐式 TLS，587 通常使用 STARTTLS。发件地址必须得到服务商授权，域名应配置 SPF、DKIM，最好同时配置 DMARC。

向不止一家邮箱服务商发送测试邮件。SMTP 接受只代表服务商收到请求，不代表邮件一定进入收件箱。修改公开域名后，重新发送邀请或找回密码邮件并检查链接。

## 排错顺序

1. 对照上游登记值逐字检查完整 Callback。
2. 确认 Public URL、`BETTER_AUTH_URL` 和浏览器 Origin 使用同一个 HTTPS 域名。
3. 核对 Client Secret、Issuer 和必需 OIDC Claim。
4. 确认 ZPan 环境能访问 Discovery、Token 和邮件 Endpoint。
5. 对照同一 UTC 时间的服务商活动与 ZPan 日志。

从退出登录的无痕窗口验证替代方案之前，不要关闭最后一种可用的管理员登录方式。
