---
title: 快速开始
description: 使用 Docker 运行 ZPan 和本地 S3 兼容存储，并验证完整文件链路。
---

本页使用 Docker Compose 在同一台机器上运行 ZPan、RustFS 和下载器。它面向本地体验：无需先注册云平台账号，就可以创建管理员、连接对象存储并实际上传一个文件。

如果准备公开访问或长期运行，请使用“部署 ZPan”中的独立平台文档，不要原样暴露这套本地示例。

## 环境要求

安装带有 Compose 插件的 Docker Engine 或 Docker Desktop，并确认以下本地端口未被占用：

| 地址 | 用途 |
| --- | --- |
| `http://localhost:8222` | ZPan |
| `http://localhost:9000` | S3 兼容 API |
| `http://localhost:9001` | RustFS 控制台 |

## 1. 下载 Compose 文件

创建一个空目录，并下载官方的 ZPan + RustFS Compose 文件：

```sh
mkdir zpan-quickstart
cd zpan-quickstart
curl -o docker-compose.yml https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.rustfs.yml
```

生成认证密钥：

```sh
openssl rand -base64 32
```

在当前目录创建 `.env` 文件，保存刚刚生成的值：

```dotenv
BETTER_AUTH_SECRET=替换为刚刚生成的随机值
BETTER_AUTH_URL=http://localhost:8222
```

以后重启仍需保留这个文件。更换认证密钥会使现有用户会话失效。

## 2. 启动服务

```sh
docker compose up -d
docker compose ps
```

等待 `zpan` 服务进入 Healthy 状态，然后打开 `http://localhost:8222`。

如果启动失败，可以查看应用日志：

```sh
docker compose logs -f zpan
```

## 3. 创建第一个管理员

注册第一个账号。对于全新的数据库，ZPan 会自动把第一个账号设为管理员。打开账号菜单，确认可以进入**管理控制台**。

这个规则在本地环境中没有风险。部署到公网时，应在上线后立即注册管理员，并随后配置所需的注册策略。

## 4. 创建本地 Bucket

打开 `http://localhost:9001` 进入 RustFS 控制台，使用本地 Compose 示例内置的账号登录：

```text
用户名：admin
密码：admin123
```

创建一个名为 `zpan` 的 Bucket。这组凭证为了方便本地体验而特意保持简单，绝对不能用于互联网环境。

## 5. 把存储添加到 ZPan

进入**管理控制台 → 对象存储**，添加一个存储后端并填写：

| 字段 | 值 |
| --- | --- |
| Endpoint | `http://localhost:9000` |
| Bucket | `zpan` |
| Region | `us-east-1` |
| Access Key | `admin` |
| Secret Key | `admin123` |

运行存储连接测试。如果浏览器测试阶段提示 CORS 错误，按照 ZPan 显示的 CORS 配置修改 `zpan` Bucket，然后重新测试。

不要把 Endpoint 改成 Docker 内部服务名 `rustfs`。预签名上传地址最终由浏览器打开，因此这个地址必须能从浏览器本身访问。

## 6. 验证完整链路

回到**文件**页面，完成一次真实操作：

1. 创建一个文件夹。
2. 上传一个小文件。
3. 刷新页面并下载该文件。
4. 把文件移入回收站，再将其恢复。
5. 创建一个分享，并从无痕窗口打开。

这五步全部成功，说明登录、数据库持久化、预签名上传、对象存储、下载和分享已经正确连接。

## 停止或保留本地环境

停止容器但保留数据：

```sh
docker compose down
```

以后执行 `docker compose up -d` 即可重新启动。命名 Volume 会保留 ZPan 数据库、RustFS 对象和下载器状态。

体验完成后，从“部署 ZPan”中选择一个生产平台。不要把本地 RustFS 凭证或明文 HTTP Endpoint 暴露到互联网。
