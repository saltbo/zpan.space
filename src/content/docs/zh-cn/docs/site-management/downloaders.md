---
title: 远程下载器
description: 部署独立下载节点，通过设备授权接入 ZPan，并管理任务与缓存。
---

远程下载器把需要网络连接、临时磁盘和较长执行时间的工作从 ZPan 主站中分离出来。ZPan 负责创建和分配任务，下载器负责获取文件、上报进度并把结果导入对象存储。

Docker Compose 已包含下载器。启动后运行：

```sh
docker compose logs -f downloader
```

首次运行会输出设备授权地址。使用管理员账号打开并批准后，节点 Token 保存到 `downloader-data` Volume 中，以后重启无需重复授权。

下载文件、运行状态和保种缓存也在这个 Volume 中。`ZPAN_DOWNLOADER_SEED_CACHE_LIMIT` 控制可清理的保种缓存上限；它不是磁盘硬配额，仍应从主机层监控剩余空间。BT 场景还需要开放配置的 TCP/UDP 监听端口。

## 部署独立节点

需要把下载器放到另一台机器时，下载独立 Compose 文件并指定主站地址：

```sh
mkdir zpan-downloader && cd zpan-downloader
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.downloader.yml
ZPAN_SERVER_URL=https://files.example.com docker compose up -d
docker compose logs -f downloader
```

`ZPAN_SERVER_URL` 必须是下载节点能够访问的主站 HTTPS 地址。把它写入该目录的 `.env` 可以避免每次启动时重复输入；不要把授权后生成的节点 Token 从 Volume 中复制出来。

站长应在 **管理控制台 → 下载器**检查心跳、能力、任务负载与最后错误；长期离线的节点应撤销并清理 Token。
