---
title: ZPan 是什么
description: 一个用于托管、管理和分享文件的开源文件平台。
---

ZPan 是一个开源文件托管平台。你可以像使用网盘一样管理、分享和访问文件，而真正的文件内容保存在自己选择的对象存储中。ZPan 负责账号、目录、权限、配额与分享，文件上传和下载则尽可能由浏览器直接连接对象存储完成。

## ZPan 解决什么问题

- **S3 网盘**：在自己的对象存储之上管理文件、文件夹、预览、回收站、配额和团队空间。
- **图床**：通过 PicGo、PicList、uPic、ShareX、Flameshot 或 API 上传图片，立即获得可用于 Markdown、博客和论坛的稳定 URL。
- **文件分享**：创建带密码、有效期、下载次数限制、直链和转存能力的分享。
- **个人主页**：为每个用户提供公开的 `/u/username` 页面，用于展示公开文件和目录。
- **WebDAV**：通过 Finder、Windows 文件资源管理器、Cyberduck 等兼容客户端，把个人空间和团队空间当作远程磁盘访问。
- **远程下载**：把 HTTP、磁力链接和种子等长时间下载任务交给独立下载器执行，完成后自动导入 ZPan。

## ZPan 坚持的原则

**只围绕 S3 兼容接口构建存储层。** ZPan 不追逐每一个消费级网盘服务商，也不构建云盘套云盘的挂载层。一套公开、简单且长期稳定的存储接口，比不断增加专用驱动更重要。

**让文件流量绕过应用服务器。** ZPan 签发短时有效的预签名 URL，由浏览器直接与对象存储传输文件。应用服务器专注于认证、元数据、权限、配额、分享和任务调度，不成为带宽瓶颈。

**Cloudflare Workers 优先，但不绑定单一平台。** ZPan 围绕 Workers、D1、Hono 和 Web 标准 API 构建，同时使用同一套代码支持 Docker、AWS Lambda、Vercel、Netlify、Azure Functions 与 Google Cloud Run。

**先做好完整工作流，再扩展功能边界。** 文件管理、分享、图床、WebDAV、团队空间和远程下载共同组成一个文件产品。需要网络、磁盘和运行时间的远程下载任务可以交给独立下载器，不必挤在主实例中执行。

## 产品边界

ZPan 适合希望拥有以下能力的用户：

- 使用自己的 Bucket 搭建 Web 网盘、图床或文件分享服务。
- 不维护 VPS 或 NAS，直接在 Cloudflare Workers 上运行。
- 让浏览器与对象存储直接传输文件，降低服务器带宽压力。
- 通过 WebDAV、图床工具和 API 接入现有工作流。

ZPan 并不打算成为实时文档协作套件、通用云盘聚合器，也不直接把服务器本地目录包装成网页文件管理器。

## 与其他项目对比

不同项目解决的问题并不相同。下面的表格用于说明各自的产品出发点，而不是给出笼统的优劣排名。

| 能力 | **ZPan** | [Cloudreve](https://docs.cloudreve.org/en/) | [AList](https://alist-repo.github.io/docs/guide/drivers/) | [Nextcloud](https://nextcloud.com/files/) | [Seafile](https://www.seafile.com/en/features/) | [File Browser](https://github.com/filebrowser/filebrowser) |
| --- | --- | --- | --- | --- | --- | --- |
| 专注 S3 后端的产品定位 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| S3 兼容存储后端 | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| 浏览器到对象存储的直传路径 | ✅ | ⚠️ | ⚠️ | ❌ | ❌ | ❌ |
| Cloudflare Workers 部署 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 无需 VPS/NAS | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| PicGo/ShareX 图床工作流 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 每用户公开文件主页 | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ |
| 远程下载工作流 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 可独立部署的下载节点 | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| 多网盘聚合 | ❌ | ❌ | ✅ | ⚠️ | ❌ | ❌ |
| 服务器本地目录作为主文件根 | ❌ | ⚠️ | ⚠️ | ⚠️ | ❌ | ✅ |
| 实时文档协同编辑 | ❌ | ❌ | ❌ | ✅ | ⚠️ | ❌ |
| 专用同步客户端 | 计划中 | ❌ | ❌ | ✅ | ✅ | ❌ |
| 团队/工作区模型 | ✅ | ⚠️ | ❌ | ✅ | ✅ | ❌ |
| WebDAV 访问 | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| 分享链接 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Docker 部署 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

图例：✅ 表示一等支持或核心能力；⚠️ 表示部分支持、取决于版本，或不是该项目的主要方向；❌ 表示不是核心能力。

## 开始使用

不想维护基础设施，可以直接打开[官方托管版 ZPan Drive](https://drive.zpan.space)。希望自己掌控域名、数据和配置，可以将 ZPan 部署到七个受支持的平台之一；自托管实例所需的 Pro 与 Business 授权可以在 [ZPan Cloud](https://cloud.zpan.space) 购买和管理。

第一次接触对象存储时，建议先阅读[核心概念](/zh-cn/docs/getting-started/core-concepts/)。准备正式部署时，依次完成[部署前准备](/zh-cn/docs/getting-started/prerequisites/)和对应平台的部署文档；只想本地体验，可以直接使用[快速开始](/zh-cn/docs/getting-started/quick-start/)。
