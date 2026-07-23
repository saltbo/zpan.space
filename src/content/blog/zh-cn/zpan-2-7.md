---
title: "ZPan 2.7：远程下载、WebDAV、后台任务与版本管理"
description: "详细介绍 ZPan 2.7 的远程下载器、WebDAV、服务端打包、文件夹上传、Cloud Credits、验证码、API Key，以及 2.7.1–2.7.4 修复。"
publishedAt: 2026-06-06
locale: zh-cn
tags: [发布, v2.7]
---

ZPan 2.7 把文件操作扩展到浏览器之外。远程下载节点可以替用户获取 HTTP 或 Torrent 内容，WebDAV 让文件管理器和其他客户端连接 ZPan，耗时的打包任务则进入后台队列。

这一主版本随后发布四个补丁，继续完善下载器、Docker、授权、版本信息、会话性能和上传兼容性。

## 远程下载管理器

管理员可以部署独立下载节点，将 HTTP 与 Torrent 下载交给远程机器执行。任务详情会展示下载状态、Peer 区域和进度；BT 任务支持保留做种，下载完成后可以保持原文件夹结构上传回网盘。

`zpan` CLI 提供下载器的一条命令设备登录，并允许配置服务器地址。节点通过授权加入实例，不需要保存管理员网页登录会话。

## WebDAV 与 API Key

用户可以为 WebDAV 创建独立应用密码，并把个人或团队空间挂载到支持 WebDAV 的客户端。实现兼容 RFC 4918 Class 2。

API Key 管理在本次版本中统一，程序或客户端可以使用专门凭证，不必共用账号密码。

## 文件夹上传与后台任务

Web 界面支持文件夹上传。服务端打包使用流式 ZIP 任务，并进入队列执行；用户可以在新的后台任务页面查看进度和结果。

这种方式避免把较长的归档操作绑定在一次浏览器请求上。

## Cloud Credits 与安全配置

2.7 加入 Cloud Credits，用于计量存储出口流量，并提供 Credits 商店。登录和注册可以启用验证码保护。

## 破坏性变更

REST API 路由变得更严格，公开下载链接从 `/dl/:token` 改为 `/r/:token`。外部脚本、书签和集成需要更新旧路径。

## v2.7.1：下载节点修复

管理员可以在界面中重命名下载节点。节点分配和传输速度上报更加可靠；Docker 部署会暴露 Torrent 监听端口，并使用宿主机主机名注册下载器。

## v2.7.2：品牌与 Docker 数据卷

ZPan 更新 Logo 和品牌形象。远程下载器的数据卷权限得到修复，Docker 中的下载器可以正常写入持久化数据。

## v2.7.3：关于页面、商业授权与权益

管理后台新增“关于”页面，显示实例、Edition 和版本信息，内置更新日志抽屉，并从 GitHub Releases 检查最新版本。

商业授权独立管理，后台加入版本角标和按能力分组的 Edition 对照。管理员可以编辑或撤销已经发放的配额权益。实例还可以选择匿名上报部署信息和 GeoIP 区域。

该补丁同时增强远程下载用量计费，修复 Docker 镜像启动，改用宿主机主机名注册下载器；管理端配额查询改为分块批量执行，每月重置移动到定时任务。应用版本改为从 `package.json` 解析并在构建时注入。

## v2.7.4：认证性能、配对与上传兼容

服务器会自动信任回环地址与局域网来源，不必为这些地址额外配置 `TRUSTED_ORIGINS`。Cloud 配对流程补齐环境变量检查、明确错误提示和确认握手，商店结账加入优惠券入口。

修复包括：D1 查询失败时记录完整原因链；重复结账时自动取消待处理套餐订单；非 ASCII 文件名生成 Latin-1 安全的 `Content-Disposition`；会话初始化不再因跨请求共享等待状态而挂起；默认配额输入按数字处理。

会话读取还加入客户端缓存并改善 Worker 性能。授权确认请求改用 `PATCH`。

真实版本记录：

- [v2.7.0](https://github.com/saltbo/zpan/releases/tag/v2.7.0)
- [v2.7.1](https://github.com/saltbo/zpan/releases/tag/v2.7.1)
- [v2.7.2](https://github.com/saltbo/zpan/releases/tag/v2.7.2)
- [v2.7.3](https://github.com/saltbo/zpan/releases/tag/v2.7.3)
- [v2.7.4](https://github.com/saltbo/zpan/releases/tag/v2.7.4)
