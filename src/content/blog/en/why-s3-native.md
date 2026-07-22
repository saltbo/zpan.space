---
title: "Why S3-native is more than a storage checkbox"
description: "Direct uploads, portable data, and a clean control plane make object storage a powerful foundation for self-hosted file workflows."
publishedAt: 2026-07-15
locale: en
tags: [Engineering, S3]
---

Calling a product “S3 compatible” often means it can copy files to a bucket. For ZPan, S3 shapes the entire architecture.

## Separate control from data

ZPan is the control plane: identities, permissions, metadata, sharing rules, and presigned requests. Object storage is the data plane: the actual bytes and the work of transferring them.

Keeping those responsibilities separate has practical benefits:

- Large uploads do not consume application server bandwidth.
- Storage can scale independently from the web application.
- Operators can choose providers based on region, price, or policy.
- Moving away from ZPan does not require exporting proprietary blobs.

## Bring the storage that fits

Amazon S3, Cloudflare R2, Backblaze B2, Tigris, MinIO, and many other products expose the same fundamental API. Their details differ, but ZPan does not need a custom storage implementation for every cloud.

That portability is the point: the application should make your storage useful without making your data less yours.
