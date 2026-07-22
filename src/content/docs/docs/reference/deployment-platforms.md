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
