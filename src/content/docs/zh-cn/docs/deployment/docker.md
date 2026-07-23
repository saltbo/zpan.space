---
title: Docker
description: 使用 SQLite 或 Turso 在自己的服务器、NAS 或 Homelab 中运行 ZPan。
sidebar:
  order: 2
---

如果你已经在维护一台服务器、NAS 或 Homelab，Docker 是最直接的自托管方案。ZPan 主程序只有一个镜像，默认使用 SQLite；远程下载器是一个独立的可选服务。

## 准备主机

生产环境建议使用安装了 Docker Engine 与 Compose 插件的 Linux 主机，并准备域名和 Caddy、Traefik 或 Nginx 等 HTTPS 反向代理。

创建目录并下载官方 Compose 文件：

```sh
mkdir zpan && cd zpan
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.yml
```

创建 `.env`，写入稳定的认证密钥和最终访问地址：

```dotenv
BETTER_AUTH_SECRET=替换为-openssl-生成的内容
BETTER_AUTH_URL=https://files.example.com
```

使用 `openssl rand -base64 32` 生成密钥。不要提交 `.env`，升级时也不要随意更换该值，否则现有登录会话会全部失效。

## 启动 ZPan

```sh
docker compose up -d
docker compose ps
docker compose logs -f zpan
```

ZPan 监听 `8222` 端口。你可以先直接访问它确认服务启动，再通过 HTTPS 完成生产配置。新数据库中注册的第一个账号会自动成为站长管理员。

Compose 中的 `zpan-data` Volume 保存 `/data/zpan.db`。真正需要保护的是 Volume，而不是容器。删除它会丢失用户、目录元数据、分享和站点设置；S3 中的对象文件则可能仍然存在。Compose 默认以「项目名_卷名」命名卷，项目名取自当前目录名（部署目录通常就叫 `zpan`），因此该卷在主机上实际名为 `zpan_zpan-data`，后续备份命令中会使用这个完整名称。

## 配置 HTTPS

最小 Caddy 配置如下：

```txt
files.example.com {
  reverse_proxy 127.0.0.1:8222
}
```

HTTPS 可用后，进入 **管理控制台 → 设置 → 站点标识**，把 Public URL 设置为同一个地址。使用其他代理时，要正确传递原始 `Host` 与 `X-Forwarded-Proto`。

## 配置对象存储

进入 **管理控制台 → 存储** 添加 Bucket。ZPan 的上传流量从用户浏览器直接进入 S3，所以 Endpoint 必须能被浏览器访问，Bucket 的 CORS 也必须允许 ZPan 的最终域名。

如果你希望连对象存储也放在本机，可以使用 RustFS 示例：

```sh
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.rustfs.yml
docker compose -f docker-compose.rustfs.yml up -d
```

示例中的 RustFS 账号密码只适合本地体验。把服务暴露到网络之前必须修改。

## SQLite 还是 Turso

单实例运行时直接使用 SQLite 即可。不要让多个 ZPan 容器通过网络文件系统同时读写同一个 SQLite 文件。

需要远程或共享数据库时，配置 Turso：

```yaml
environment:
  TURSO_DATABASE_URL: libsql://your-db.turso.io
  TURSO_AUTH_TOKEN: your-token
```

存在 `TURSO_DATABASE_URL` 时，`DATABASE_URL` 会被忽略。两种模式都会在容器启动时自动执行迁移。

## 远程下载器

官方 Compose 文件包含可选下载器。首次启动后查看日志：

```sh
docker compose logs -f downloader
```

使用管理员账号打开日志中的设备授权地址并批准节点。下载器 Token、运行状态、下载文件和保种缓存都保存在 `downloader-data` Volume 中。

## 备份与升级

升级前先备份数据库：

```sh
docker compose stop zpan
docker run --rm -v zpan_zpan-data:/data -v "$PWD":/backup alpine \
  cp /data/zpan.db /backup/zpan.db.backup
docker compose start zpan
```

然后拉取并重新创建容器：

```sh
docker compose pull
docker compose up -d
docker compose logs --tail=100 zpan
```

生产环境建议固定到具体 Release Tag，而不是长期使用 `latest`。

## 常见问题

- **容器启动后立即退出**：检查 `BETTER_AUTH_SECRET` 是否已经设置。
- **后台正常，但上传失败**：查看浏览器控制台并检查 Bucket CORS，问题通常发生在浏览器与 S3 之间。
- **OAuth 回调到了错误地址**：确认 `BETTER_AUTH_URL`、Public URL、代理域名与 OAuth Callback 完全一致。
- **重建容器后数据消失**：确认原有 Volume 仍然存在，并挂载到了 `/data`。
