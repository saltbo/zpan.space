---
title: Deployment platform comparison
description: Compare ZPan deployment targets and their runtime requirements.
sidebar:
  order: 3
---

ZPan provides official build targets and GitHub Actions workflows for AWS Lambda, Vercel, Netlify, Azure Functions, and Google Cloud Run. Use them when your team already operates the corresponding IAM, billing, and monitoring environment.

All require remote Turso/libSQL and external S3-compatible storage. Function or container filesystems are not durable databases or user-file storage.

Common secrets are `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` for remote databases, a stable `BETTER_AUTH_SECRET`, the final `BETTER_AUTH_URL`, and platform deployment credentials. Configure bucket credentials later in the ZPan admin console rather than GitHub Actions.

| Platform | Entry | Main additional setup |
| --- | --- | --- |
| AWS Lambda | Function URL | AWS IAM and SAM artifact bucket |
| Vercel | Node.js Function | Org ID, Project ID, and token |
| Netlify | Functions v2 | Site ID and personal access token |
| Azure Functions | Node.js v4 | Service principal and resource group |
| Google Cloud Run | Docker container | GCP service account and Secret Manager |

Vercel uses the Node.js runtime, not Edge Runtime. Google Cloud Storage is not the file backend; ZPan requires an S3-compatible API.

Platforms without a persistent process need an external scheduler for entitlement refresh and traffic sync. Protect the endpoints with `REFRESH_CRON_SECRET`; see the [platform-specific source documentation](https://github.com/saltbo/zpan/tree/main/docs/deploy) for exact workflow inputs and schedules.

Validate health, first administrator, Public URL, migrations, bucket CORS and direct upload, shares, and scheduled work. A successful platform deployment does not prove the file path works.

## Database and persistence

The database stores accounts, settings, folder structure, permissions, quotas, shares, tasks, and object references. File bytes remain in configured object storage.

- Node and Docker use SQLite at `./zpan.db` by default. Set `DATABASE_URL` to an explicit persistent path and mount it as a durable volume.
- Node can use Turso/libSQL through `TURSO_DATABASE_URL` and, for a remote database, `TURSO_AUTH_TOKEN`.
- Serverless targets other than the Cloudflare-native build use remote Turso/libSQL because their local filesystems are ephemeral.
- Cloudflare deployments use the configured D1 binding.

Do not place SQLite on an object-store mount or unreliable network share, and do not scale independent writers against one SQLite file. Back up the database and object storage from a consistent point in time; neither one can reconstruct the other.

## Version and client compatibility

Keep the ZPan frontend, API, database schema, and downloader from compatible releases. Use the same release artifact for frontend and backend, and upgrade download nodes when release notes announce protocol or authorization changes.

Current Chrome, Edge, Firefox, and Safari are the primary browser targets. WebDAV clients vary in locking, filename, and large-file behavior, so test the exact client and operating-system version your users depend on.

Before upgrading, read release notes for minimum Node, database, platform, and downloader versions. When reporting a compatibility problem, include the ZPan version, deployment target, browser or client version, and storage provider without exposing credentials.
