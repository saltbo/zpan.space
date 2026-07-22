---
title: Choose a deployment
description: Decide between Cloudflare Workers, Docker, and the other supported runtimes.
sidebar:
  order: 3
---

ZPan separates the control plane from file storage. The application can run on Workers, a container, or a serverless function while files remain in any S3-compatible bucket. Choose the runtime based on how much infrastructure you want to operate—not where your files live.

| Deployment | Database | Best for | Operational work |
| --- | --- | --- | --- |
| Cloudflare Workers | D1 | Most personal and small-team installations | Lowest |
| Docker | SQLite or Turso | A server, NAS, homelab, or private network | You manage the host and proxy |
| AWS Lambda | Turso | Existing AWS environments | IAM and scheduled jobs |
| Vercel / Netlify | Turso | Teams already using either platform | Platform limits and scheduled jobs |
| Azure Functions | Turso | Existing Azure environments | Service principal and scheduled jobs |
| Google Cloud Run | Turso | Container-based GCP environments | GCP IAM and cold starts |

## The default recommendation

Choose **Cloudflare Workers** when you want the least maintenance. ZPan's primary runtime uses Workers for compute, D1 for metadata, Queues for archive tasks, and a small R2 bucket for avatars. Your actual files may still live in R2, S3, B2, Tigris, MinIO, or another S3-compatible service.

Choose **Docker** when the application must run inside your own network, you already operate a server, or you want local SQLite. Docker is also the easiest way to run ZPan and the downloader together.

The other serverless targets are useful when your organization already has accounts, policy, and monitoring on those platforms. They require Turso because their local filesystems are not durable.

## What every deployment needs

Before starting, prepare:

1. A public HTTPS address for ZPan.
2. A stable authentication secret.
3. A database supported by the selected runtime.
4. An S3-compatible bucket and credentials with object read/write/delete permissions.
5. Browser CORS rules for the final ZPan origin.

The last point is easy to miss. ZPan uploads directly from the browser to object storage, so a bucket that the server can reach is not automatically usable by users' browsers.

## Continue

- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare/)
- [Deploy with Docker](/docs/deployment/docker/)
- [Configure object storage](/docs/configuration/storage/)
