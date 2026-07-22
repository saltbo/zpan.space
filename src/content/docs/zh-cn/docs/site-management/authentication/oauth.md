---
title: OAuth 登录
description: 配置 ZPan 内置的 OAuth 登录提供商。
sidebar:
  order: 3
---

ZPan 默认支持邮箱或用户名加密码登录。对于私人站点，这已经足够；团队或公开站点则可以接入 GitHub、Google、Microsoft 等 OAuth 提供商，或者连接自建的 OIDC 身份系统。

![OAuth 提供商管理页面](/images/docs/admin-oauth.png)

## 在配置 OAuth 之前

先完成正式域名与 Public URL 配置。OAuth 提供商会严格校验 Callback URL，临时域名和正式域名不能混用。

进入 **管理控制台 → OAuth → 添加提供商**。内置提供商会使用：

```text
https://files.example.com/api/auth/callback/<provider-id>
```

自定义 OIDC 使用：

```text
https://files.example.com/api/auth/oauth2/callback/<provider-id>
```

后台展示的地址以认证服务实际使用的 Origin 为准：配置了 `BETTER_AUTH_URL` 时使用该值，否则使用当前请求域名。最稳妥的做法是让 `BETTER_AUTH_URL`、Public URL 和用户访问域名保持一致，并始终复制后台展示的 Callback，不要凭记忆手写。

## 内置 OAuth 提供商

在身份提供商控制台创建 Web Application，把 Callback URL 加入允许列表，再将 Client ID 与 Client Secret 保存到 ZPan。建议先保持邮箱密码登录可用，确认 OAuth 完整走通后再调整其他登录策略。

Community 可配置少量登录提供商，足够覆盖个人与小团队。每个提供商应使用独立 Secret，泄露后可在上游控制台撤销并重新生成。

## 自定义 OIDC

选择 OIDC 后填写唯一的 Provider ID、Discovery URL、Client ID、Client Secret 与 Scopes。Discovery URL 通常以 `/.well-known/openid-configuration` 结尾，Scopes 至少需要 `openid`，通常还包括 `profile` 与 `email`。

如果上游没有返回稳定邮箱或用户名，ZPan 可能无法完成账号创建。上线前请使用一个全新测试账号验证首次登录、重复登录与退出。

## 邮件与邮箱验证

进入 **管理控制台 → 设置 → 邮件配置**，选择 Cloudflare Email、SMTP 或 HTTP Provider。先发送测试邮件，确认发件域名的 SPF、DKIM 和 DMARC 正常，再启用“要求邮箱验证”。

启用验证后，收不到邮件的用户可能无法完成注册或找回密码。生产上线前至少测试 Gmail、Outlook 和你主要用户使用的企业邮箱。

## 排错顺序

1. Callback URL 是否与后台展示值逐字一致。
2. Public URL 与浏览器地址是否都是 HTTPS 且域名一致。
3. Client Secret 是否复制完整、是否已过期。
4. OIDC Discovery 是否可以从 ZPan 运行环境访问。
5. 上游是否返回 `email`、`sub` 等必需 Claims。
