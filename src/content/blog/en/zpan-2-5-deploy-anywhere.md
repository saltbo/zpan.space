---
title: "ZPan 2.5: one product, seven deployment targets"
description: "Cloudflare Workers, Docker, AWS, Vercel, Netlify, Azure, and Google Cloud share the same ZPan application and data model."
publishedAt: 2026-04-23
locale: en
tags: [Releases, v2.5]
---

“Self-hostable” often means a Docker image, but infrastructure constraints differ. Some operators want no server, some require a private network, and others already have identity, billing, and monitoring on a specific cloud.

ZPan 2.5 added seven targets: Cloudflare Workers, Docker, AWS Lambda, Vercel, Netlify, Azure Functions, and Google Cloud Run. They are runtime adapters around one Hono application, not seven product forks.

Routes, use cases, permissions, sharing, and the S3 file model remain shared. Platform code only supplies the database, environment and bindings, and an HTTP entry point. Users see the same product and migrations across targets.

## Two primary paths

Cloudflare Workers remains the recommendation for low-maintenance personal and small-team use. Workers runs the control plane, D1 stores metadata, Queues handles background jobs, and user files move directly to S3.

Docker is the universal self-hosted path for servers, NAS devices, homelabs, and private networks. It uses durable SQLite by default, may opt into Turso, and can run the downloader alongside the application.

The additional targets serve organizations that already operate their corresponding platforms. They are not required complexity for a first installation.

## Why Serverless targets use Turso

Function filesystems are not durable databases. libSQL/Turso preserves ZPan's SQLite-family model while supporting remote connections. Compute and file storage remain independent: a Vercel or Cloud Run application may use R2, S3, B2, Tigris, or another S3-compatible provider.

Every target follows the same first-run product path: create the administrator, set Public URL, add storage, configure CORS, test direct upload, then add mail, OAuth, and registration policy. Database provisioning, secret storage, and scheduled jobs are the platform-specific parts.

Choose Workers when you want the least maintenance and Docker when you control a host or network. Prefer another target when your organization already knows how to secure, monitor, back up, and troubleshoot it. Start with the [deployment decision guide](/docs/getting-started/choose-deployment/).
