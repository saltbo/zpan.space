---
title: 图床
description: 配置稳定图片地址，并接入 PicGo、PicList、uPic、ShareX、Flameshot 或自定义客户端。
---

图床复用 ZPan 的 S3 存储，在其上增加路径模板、公开访问、图库管理和面向工具的 API Key。

![ZPan 英文版图床设置页面](/images/docs/image-hosting.png)

## 接入工具前

1. 确认站长的存储连接测试已经通过。
2. 选择存储后端和准备长期使用的路径模板。
3. 按需配置公开地址或自定义域名。
4. 为每个工具或设备创建独立 API Key，并立即保存；明文只显示一次。

在“工具集成”中可以生成 PicGo/PicList、uPic、ShareX 与 Flameshot 配置。粘贴的 Key 只在浏览器中用于生成配置，不会被该面板持久化。

先上传一张可删除的测试图，检查返回 URL、`Content-Type`、缓存、图库记录和删除行为。路径模板只影响新文件，大量发布链接前应先确定命名策略。

Referer 白名单只能减少普通盗链，不是身份认证。私密图片不应通过公开图床 URL 发布。设备丢失或工具停用时，撤销对应 Key 即可。
