---
title: Object storage
description: Add, secure, test, scale, and troubleshoot S3-compatible storage for ZPan.
sidebar:
  order: 4
---

ZPan stores directory and permission metadata in its database while file bytes live in S3-compatible object storage. At least one active backend is required before users can upload.

![Configured storage backends](/images/docs/admin-storages.png)

## Add a storage backend

Create a dedicated bucket and credential instead of using an account root key. Under **Admin Console → Storages → Add storage**, configure:

| Field | Meaning |
| --- | --- |
| Provider | Fills common defaults; the connection still uses S3 APIs |
| Bucket | An existing bucket dedicated or scoped to this instance |
| Endpoint | S3 API origin reachable by both ZPan and users' browsers |
| Region | Exact bucket region; compatible services may use a fixed value such as `auto` |
| Access Key / Secret Key | Dedicated signing credentials |
| Custom host | Optional public delivery hostname |
| Force Path Style | Commonly required by MinIO, RustFS, and private S3 services |

The management console URL is not the S3 endpoint. A Docker hostname such as `http://minio:9000` can work from ZPan but fail in every user's browser.

## Required permissions

Scope the credential to the target bucket and prefix. ZPan needs bucket listing, object read/write/delete, metadata reads, and multipart create/upload/complete/abort actions. It does not need account administration or access to unrelated buckets.

## Provider notes

| Provider type | Typical requirement |
| --- | --- |
| Amazon S3 | Exact region and least-privilege IAM policy |
| Cloudflare R2 | Account S3 endpoint; region commonly `auto` |
| Backblaze B2 | S3-compatible endpoint for the bucket region |
| Tigris | Project endpoint and scoped credentials |
| MinIO / RustFS | Browser-reachable S3 port and often Force Path Style |
| Other compatible services | Verify presigning, multipart upload, ETag, and CORS |

An “S3-compatible” label does not guarantee identical behavior. Test the exact provider and addressing mode used in production.

## Bucket CORS

Uploads travel directly from the browser to storage using presigned URLs. For a site at `https://files.example.com`, a typical policy is:

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

Provider syntax varies. Keep `ETag` exposed because multipart completion needs it. Include every real production or staging origin, but avoid `*` in production.

## Test the real data path

Run the built-in connection test, then upload a small file and a multipart file from a browser. Download, copy or rename, move to trash, restore, and delete a disposable object. A server-side list operation or success in a generic S3 client does not prove browser CORS works.

## Multiple storages and capacity

Use descriptive names such as `Toronto R2` or `Archive MinIO`, with separate credentials for each backend. Adding a storage affects new assignments according to current selection rules; it does not migrate existing objects. Deleting a configuration does not move its files either.

Before retiring a backend, inventory affected objects, copy them through a controlled migration, verify checksums and downloads, then update metadata with a supported process. Monitor provider capacity, requests, and egress cost separately from ZPan space quotas.

## Troubleshooting

| Error or symptom | First check |
| --- | --- |
| `SignatureDoesNotMatch` | Endpoint, region, path style, and system clock |
| `AccessDenied` | Bucket scope and missing object or multipart action |
| Admin test passes, browser upload fails | CORS origin, methods, headers, and exposed `ETag` |
| Browser DNS or connection error | Public reachability and TLS of the endpoint |
| Upload works, delete or trash fails | Delete permissions |

Inspect the first failed `OPTIONS`, `PUT`, or API request in browser developer tools. Change one setting at a time, preserve the original configuration, and never publish secret keys or live presigned URLs.
