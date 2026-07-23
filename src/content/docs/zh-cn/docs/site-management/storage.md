---
title: 对象存储
description: 添加、保护、测试、扩展并排查 ZPan 的 S3 兼容对象存储。
sidebar:
  order: 4
---

ZPan 把目录和权限元数据保存在数据库，文件内容保存在 S3 兼容对象存储。至少需要一个可用后端，用户才能上传文件。

![ZPan 英文版存储后端列表](/images/docs/admin-storages.png)

## 添加存储后端

创建专用 Bucket 和凭据，不要使用账号 Root Key。进入 **管理后台 → 存储 → 添加存储**，配置：

| 字段 | 含义 |
| --- | --- |
| Provider | 填充常见默认值，连接仍然使用 S3 API |
| Bucket | 已存在且专用于或限制给此实例的 Bucket |
| Endpoint | ZPan 服务端与用户浏览器都能访问的 S3 API Origin |
| Region | Bucket 的准确 Region；部分兼容服务使用 `auto` 等固定值 |
| Access Key / Secret Key | 独立的签名凭据 |
| Custom host | 可选的公开分发域名 |
| Force Path Style | MinIO、RustFS 和私有 S3 服务经常需要 |

管理控制台地址不是 S3 Endpoint。`http://minio:9000` 之类 Docker 主机名可能在 ZPan 容器里可用，但所有用户浏览器都无法访问。

## 所需权限

把凭据限制到目标 Bucket 和 Prefix。ZPan 需要列举 Bucket、读取/写入/删除对象、读取元数据，以及创建、上传、完成和中止分片上传；不需要账号管理或其他 Bucket 的权限。

## 常见服务商

| 类型 | 常见要求 |
| --- | --- |
| Amazon S3 | 准确 Region 和最小权限 IAM Policy |
| Cloudflare R2 | 账号 S3 Endpoint，Region 通常为 `auto` |
| Backblaze B2 | Bucket 所在 Region 的 S3 兼容 Endpoint |
| Tigris | 项目 Endpoint 和受限凭据 |
| MinIO / RustFS | 浏览器可访问的 S3 端口，通常还要 Force Path Style |
| 其他兼容服务 | 验证预签名、分片上传、ETag 与 CORS |

“S3 兼容”不保证所有行为一致，必须测试生产使用的具体服务商和寻址方式。

## Bucket CORS

浏览器使用预签名 URL 直传存储。站点为 `https://files.example.com` 时，典型策略为：

```json
[
  {
    "AllowedOrigins": ["https://files.example.com"],
    "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

不同服务商语法可能不同。必须暴露 `ETag`，因为分片完成需要它。加入真实的生产与测试 Origin，生产环境不要使用 `*`。

## 验证真实链路

先运行内置连接测试，再从浏览器上传一个小文件和一个分片大文件。对测试对象执行下载、复制或重命名、移入回收站、恢复和删除。服务端能列举 Bucket，或通用 S3 客户端成功，都不能证明浏览器 CORS 正常。

## 多存储与容量

使用 `Toronto R2`、`Archive MinIO` 等清晰名称，每个后端使用独立凭据。新增存储只会按当前规则影响后续分配，不会迁移已有对象；删除配置也不会搬走文件。

退役前先盘点对象，通过受控流程复制、校验 Checksum 与下载，再使用受支持方式更新元数据。服务商容量、请求量和出口成本需要与 ZPan 空间配额分别监控。

## 排错

| 错误或现象 | 首先检查 |
| --- | --- |
| `SignatureDoesNotMatch` | Endpoint、Region、Path Style 和系统时钟 |
| `AccessDenied` | Bucket 范围以及缺失的对象或分片权限 |
| 管理测试成功但浏览器上传失败 | CORS Origin、Method、Header 和暴露的 `ETag` |
| 浏览器 DNS 或连接错误 | Endpoint 的公网可达性和 TLS |
| 上传正常但删除或回收站失败 | 删除权限 |

在浏览器开发者工具中检查第一个失败的 `OPTIONS`、`PUT` 或 API 请求。每次只修改一个设置，保留原配置，不要公开 Secret Key 或有效预签名 URL。
