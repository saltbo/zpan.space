---
title: Add object storage
description: Add and verify an S3-compatible storage backend.
sidebar:
  order: 1
---

ZPan stores directory and permission metadata in its database, while file bytes live in S3-compatible object storage. At least one active storage backend is required before users can upload.

![The storage list in the ZPan admin console](/images/docs/admin-storages.png)

## Create scoped credentials

Create a dedicated access key for ZPan instead of using an account root key. Scope it to the target bucket with object read, write, delete, list, and multipart-upload permissions.

Under **Admin Console → Storages → Add storage**, provide:

| Field | Meaning |
| --- | --- |
| Provider | Fills common endpoint defaults; storage still uses the S3 protocol |
| Bucket | An existing bucket name |
| Endpoint | The S3 API origin, reachable from users' browsers |
| Region | The bucket region; services such as R2 commonly use `auto` |
| Access Key / Secret Key | Dedicated signing credentials |
| Custom host | Optional public delivery domain |
| Force Path Style | Commonly required by MinIO, RustFS, and private S3 services |

The endpoint is the S3 API address, not the provider console. For example, RustFS uses port `9000` for S3 and `9001` for its management console.

## Configure CORS

Uploads use presigned URLs and travel directly from the browser to storage. The bucket must therefore accept cross-origin `PUT` requests from the exact ZPan Public URL.

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

Avoid a wildcard production origin. Restrict browser access to the origins that actually host ZPan.

## Run the connection test

The admin test creates a temporary upload record, uploads a small file from the current browser through a presigned URL, and cleans it up. It validates the real data path rather than only checking whether the server can list a bucket.

If the upload step reports CORS, inspect the preflight request in browser developer tools and confirm that the configured origin exactly matches the address bar.

## Use a browser-reachable endpoint

A Docker hostname such as `http://minio:9000` may work from the ZPan container but cannot resolve in a user's browser. Use a LAN address for private deployments or an HTTPS storage hostname for public deployments.

Deleting a storage configuration does not migrate existing objects. Move and verify data before removing a backend that has been used.
