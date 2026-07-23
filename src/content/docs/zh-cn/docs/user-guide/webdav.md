---
title: "使用 WebDAV"
description: 将 Finder、Windows、Cyberduck 或 RaiDrive 连接到 ZPan，并排查认证与写入故障。
---

WebDAV 可让桌面和移动客户端访问当前账号拥有权限的个人与团队空间。

![ZPan 英文版 WebDAV 连接设置](/images/docs/webdav.png)

在 ZPan 中找到 WebDAV 地址，使用管理员配置的最终 HTTPS 域名。界面支持时创建专用应用凭据，不要把主密码保存在不可信客户端；共享电脑应关闭凭据持久化。

在 Finder、Windows 或 Cyberduck、RaiDrive 等客户端添加地址，然后测试目录列举、小文件上传、重命名、下载和删除。不同客户端对大文件、Lock、Unicode 文件名和冲突处理差异很大，批量使用前必须验证实际客户端版本。

WebDAV 与 Web 界面使用同一空间配额和角色。团队只读成员不能通过 WebDAV 获得写权限。移动大型目录可能产生大量远程操作，不应中途打断。

认证循环时检查 WebDAV URL、HTTPS 证书、凭据类型和服务端公开地址。能浏览但无法写入时检查空间角色、配额和存储日志。WebDAV 是远程访问方式，不是离线备份或完整同步协议。
