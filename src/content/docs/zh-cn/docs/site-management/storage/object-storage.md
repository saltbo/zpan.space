---
title: 配置对象存储
description: 添加 S3 兼容 Bucket，理解 Endpoint、访问域名、Path Style 与浏览器 CORS。
sidebar:
  order: 1
---

ZPan 不把文件保存在应用服务器上。数据库只记录目录、权限和对象元数据，真正的文件进入你配置的 S3 兼容 Bucket。一个站点至少要有一个可用存储，用户才能上传文件。

![ZPan 管理后台的存储列表](/images/docs/admin-storages.png)

## 创建最小权限凭证

建议为 ZPan 单独创建 Access Key，不要使用云账号的主密钥。凭证至少需要对目标 Bucket 执行对象读取、写入、删除、列举和分片上传相关操作。权限范围尽量限制到单个 Bucket。

## 表单字段怎么填写

进入 **管理控制台 → 存储 → 添加存储**：

| 字段 | 说明 |
| --- | --- |
| 提供商 | 用于自动填充常见服务的 Endpoint；不影响底层 S3 协议 |
| Bucket | 已经创建好的存储桶名称 |
| Endpoint | S3 API 地址，必须是浏览器可以访问的 HTTP(S) 地址 |
| Region | Bucket 所在区域；R2 等服务通常使用 `auto` |
| Access Key / Secret Key | ZPan 用于签名请求的专用凭证 |
| 自定义访问域名 | 可选，用于生成下载或图床公开地址 |
| Force Path Style | MinIO、RustFS 和部分私有 S3 实现通常需要开启 |

Endpoint 填的是 API 地址，不是控制台地址，也不一定是公开文件域名。例如 RustFS 的 `:9000` 是 S3 API，`:9001` 是管理控制台，两者不能互换。

## CORS 为什么是必需的

ZPan 只负责生成预签名 URL，文件由浏览器直接上传到对象存储。于是浏览器会发起一个跨域 `PUT` 请求；Bucket 没有允许 ZPan 的域名时，应用后台仍然能正常打开，但上传会被浏览器拦截。

推荐规则如下，把域名替换为你的 Public URL：

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

生产环境不要为了省事写 `*` Origin。否则任何网站都可以尝试让用户浏览器向你的 Bucket 发起请求。

## 使用连接测试

保存存储后运行连接测试。测试会依次：

1. 在数据库中创建一个临时上传对象。
2. 使用预签名 URL 从当前浏览器直传测试文件。
3. 清理临时对象与上传会话。

因此它比“服务端列一下 Bucket”更接近真实用户路径。测试如果在第二步失败并提示 CORS，先检查浏览器 Network 面板中的预检请求，再检查 Bucket 规则中的 Origin 是否与地址栏完全一致。

## Endpoint 必须从用户网络可达

Docker 用户经常会把 Endpoint 写成 `http://rustfs:9000` 或 `http://minio:9000`。这个地址只有 Docker 网络内部能解析，用户浏览器无法访问。局域网部署应填写局域网地址，公网部署则应给对象存储配置 HTTPS 域名。

## 多存储与容量

Community 适合使用一个主要存储。启用更多存储或运营配额前，先明确每个 Bucket 的用途、容量和流量成本。删除后台中的存储配置不会自动替你迁移已有文件；有数据的存储应先完成迁移和验证，再移除配置。
