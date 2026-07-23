---
title: "对象存储权限"
description: 为 ZPan 配置完成文件读写、删除和分片上传所需的最小对象存储权限。
---

每个 ZPan 存储后端都应使用独立凭据，权限只覆盖该实例使用的 Bucket 和 Prefix。

ZPan 需要以下能力：

- 列举 Bucket 或指定 Prefix；
- 读取对象元数据和内容；
- 创建、覆盖和删除对象；
- 创建、上传、完成和中止分片上传；
- 为上述操作生成签名请求。

不同服务商名称不同，对应的 S3 Action 通常包括 `ListBucket`、`GetObject`、`HeadObject`、`PutObject`、`DeleteObject`、`DeleteObjects`、`CreateMultipartUpload`、`UploadPart`、`CompleteMultipartUpload` 和 `AbortMultipartUpload`。

不要授予 Bucket 策略管理、账号管理或其他 Bucket 的访问权，也不要使用 Root Key。服务商支持条件限制时，可进一步约束 Bucket、Prefix、来源网络和强制 TLS。

浏览器通过预签名 URL 直传，不会获得 Secret Key，但 URL 在过期前可以临时执行一次对象操作，因此日志中的预签名 URL 也应视为敏感信息。

应用策略后，运行存储连接测试，并验证上传、下载、复制或重命名、删除、回收站恢复和分片上传。只有 `PutObject` 的策略可能看似上传成功，却在确认、清理或后续文件操作时失败。
