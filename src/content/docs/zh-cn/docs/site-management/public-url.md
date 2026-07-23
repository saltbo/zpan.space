---
title: 基础配置
description: 配置 ZPan 的正式域名、品牌、注册、默认配额、验证码和 WebDAV 域名。
sidebar:
  order: 2
---

邀请用户之前，应先完成站点基础设置。这些配置会影响登录、公开链接、新账号容量、反滥用、邮件和 WebDAV。

![ZPan 英文版管理控制台的站点设置](/images/docs/admin-settings.png)

## 推荐的首次配置顺序

1. 设置正式 Public URL 和 `BETTER_AUTH_URL`。
2. 配置站点名称和品牌。
3. 添加对象存储并完成一次浏览器上传。
4. 按[登录与邮件](/zh-cn/docs/site-management/oauth/)配置邮件和登录方式。
5. 选择注册策略、默认配额和验证码。
6. 在管理员会话之外测试登录、分享和 WebDAV。

## 正式域名与 Public URL

进入 **管理控制台 → 设置 → 站点标识**，填写最终 HTTPS Origin，例如 `https://files.example.com`。只填写 Scheme、Host，以及确有需要的非默认端口，不要包含路径、Query 或 Fragment。

Public URL 用于分享链接、图床地址、WebDAV Discovery 等公开地址。认证 Callback 在配置 `BETTER_AUTH_URL` 时优先使用该值。两者都应与用户真正访问的域名一致。

更换域名后，同步更新 OAuth/OIDC Callback、Bucket CORS Origin、DNS、反向代理规则和邮件链接。然后在无痕窗口测试，避免现有管理员会话掩盖 Callback 错误。

## 站点名称与品牌

站点名称应简短，并能适应导航、浏览器标题、登录页和邮件。Logo 建议使用方形 SVG 或高分辨率透明 PNG，同时检查浅色、深色、桌面和窄屏布局。

品牌资源必须能从公网访问。浏览器和 CDN 可能保留旧图，保存后应退出登录检查。自定义品牌取决于许可证，当前版本是否可用以[授权管理](/zh-cn/docs/site-management/licensing/)为准。

## 注册与邀请

新数据库创建的首个账号会成为站点管理员。初始化后选择一种策略：

- **私人站点：**关闭开放注册，由管理员明确邀请用户。
- **仅邀请：**不同群体使用不同且会过期的邀请码，便于撤销和审计。
- **公开注册：**发布入口前先启用邮件验证、验证码、保守的默认配额、监控和滥用投诉流程。

在退出登录状态测试完整注册流程，并确认限制由 API 执行，而不只是隐藏页面表单。不要公开可重复使用的管理邀请码。

## 默认配额

默认个人和团队配额只在创建空间时应用。修改默认值不会调整已有空间；已有用户或团队应从对应管理页单独修改。

为分片上传、迁移、回收站和恢复保留容量余量。个人空间和团队空间独立计量，ZPan 配额也不能代替对象存储服务商的容量与账单告警。

## 验证码与反滥用

ZPan 支持 Cloudflare Turnstile、Google reCAPTCHA、hCaptcha 和 CaptchaFox。先在服务商处登记准确的正式域名，再在 **设置 → 验证码** 中填写 Site Key 与 Secret Key。只有服务商支持时才配置评分阈值。

Site Key 可以公开，Secret Key 不可以。结束管理员会话前，先在无痕窗口测试注册和登录。验证码需要与注册策略、限流、邮件验证和监控一起使用。

## WebDAV 地址与独立域名

稳定可用的 WebDAV 地址是 `https://files.example.com/dav/`。用户应为每台设备创建独立 App Password，不要把主账号密码交给客户端。

ZPan 也可以从 Public URL 推导 `https://dav.files.example.com/` 形式的独立地址。代理需要在内部添加 `/dav` 前缀，并保留 WebDAV Method、Body 以及 `Destination`、`Depth`、`If`、`Overwrite`、`Lock-Token` 等 Header。

Cloudflare 部署在 Token 具备 **Transform Rules: Edit** 时可以自动配置；其他平台手动设置 DNS 和代理，然后执行 **设置 → WebDAV → 验证域名**。验证成功前继续使用 `/dav/` 地址。

## 最终检查

用无痕窗口打开正式域名，完成登录和退出，确认注册状态，创建分享，接收真实邮件，上传并下载文件，再连接一个 WebDAV 客户端。所有生成地址都应使用最终 HTTPS 域名。
