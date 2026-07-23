---
title: 下载器
description: 部署、授权、监控和退役 ZPan 远程下载节点。
---

下载器把长时间网络任务和临时磁盘工作移出 ZPan Web 进程。ZPan 调度任务，已授权节点获取内容、上报进度，并把完成文件导入对象存储。

![ZPan 英文版下载节点管理页面](/images/docs/admin-downloaders.png)

## 部署独立节点

官方 Docker Compose 已包含下载器，也可以在其他主机运行独立节点：

```sh
mkdir zpan-downloader && cd zpan-downloader
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.downloader.yml
ZPAN_SERVER_URL=https://files.example.com docker compose up -d
docker compose logs -f downloader
```

`ZPAN_SERVER_URL` 必须是节点能够访问的主站 HTTPS 地址，并应保存到部署目录的 `.env`。节点 Token、任务、临时下载和保种缓存位于持久化数据卷。

`ZPAN_DOWNLOADER_SEED_CACHE_LIMIT` 控制可清理的保种数据，不是硬磁盘配额。应独立监控主机存储；需要有效 BitTorrent 连通性时开放配置的 TCP/UDP 端口。

## 设备授权

首次启动时，打开节点日志显示的验证地址，以站点管理员登录，对照 Device Code 和节点信息，只批准正在安装的节点。Code 很快过期，过期后重新开始流程。

每台节点必须有独立身份和数据卷。不要把授权 Token 写进镜像，也不要复制一台节点的数据卷来创建另一台。

## 监控节点与任务

在 **管理控制台 → 下载器** 查看心跳、版本、能力、负载和最近错误。健康节点还需要足够的临时磁盘、内存、出站网络和目标空间配额。

任务长期排队时，确认有已授权、在线、支持该来源且有空闲能力的节点。重试前同时阅读任务错误和节点日志。用户管理自己的任务，管理员管理节点可用性和容量。

## 退役与撤销

撤销前先停止新任务，按策略完成或取消现有任务，并保留需要的 Seed 数据。随后在管理控制台撤销节点，再从旧主机删除数据卷和 Secret。

撤销只能阻止未来轮询，无法清理丢失的主机。下载节点应与主站版本兼容，发布说明要求时一并升级。
