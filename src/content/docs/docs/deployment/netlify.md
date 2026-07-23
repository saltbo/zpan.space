---
title: Netlify
description: Deploy ZPan with Netlify Functions, Turso, and browser-direct S3 transfers.
sidebar:
  order: 5
---

Netlify is a practical target for teams that already use its CDN, deployment previews, and Functions. ZPan's static interface is served from the CDN and its API runs in a Netlify Function. Turso persists application metadata, while an independent S3-compatible bucket stores files.

## Prepare Netlify and Turso

Fork [saltbo/zpan](https://github.com/saltbo/zpan), create a Netlify site, and create a Turso database. Copy the site ID from **Site configuration → General** and create a personal access token for the deployment workflow.

The official `netlify.toml` redirects API traffic to the ZPan Function and includes migration files in its bundle. Use the repository configuration rather than recreating the routes in the dashboard.

## Configure GitHub Secrets

Add these repository secrets:

| Secret | Required | Purpose |
| --- | --- | --- |
| `NETLIFY_AUTH_TOKEN` | Yes | Authorizes deployment |
| `NETLIFY_SITE_ID` | Yes | Selects the Netlify site |
| `TURSO_DATABASE_URL` | Yes | Persistent libSQL database URL |
| `TURSO_AUTH_TOKEN` | Yes | Database authentication |
| `BETTER_AUTH_SECRET` | No | Stable session-signing secret |

The workflow creates and preserves `BETTER_AUTH_SECRET` when it is omitted. Keep this value stable during upgrades.

Runtime variables must include the **Functions** scope. Netlify notes that values declared in `netlify.toml` are not automatically available to Functions, so store secrets through the dashboard or CLI instead. See [Netlify environment variables](https://docs.netlify.com/build/functions/environment-variables/).

## Deploy

Open **Actions → Deploy to Netlify → Run workflow**. The workflow resolves a stable release, writes the required environment variables to Netlify, applies Turso migrations, builds, and publishes the site.

Verify the deployment URL:

```sh
curl https://your-site.netlify.app/api/health
```

The first account registered in a new database becomes the administrator.

## Configure the production origin

Add a custom domain in **Domain management**. Then add or update these Netlify environment variables with the Functions scope:

```dotenv
BETTER_AUTH_URL=https://files.example.com
TRUSTED_ORIGINS=https://files.example.com
REFRESH_CRON_SECRET=replace-with-a-random-secret
```

Trigger a new deployment after changing them. Set the same URL under **Admin Console → Settings → Site identity**, and update OAuth callback URLs.

## Add S3-compatible storage

Netlify's deployment storage is not ZPan object storage. Add your bucket under **Admin Console → Storages**. Its endpoint must be reachable by the browser and its CORS rules must allow the final production origin.

File bytes travel directly between browser and S3 via presigned URLs, rather than through the Netlify Function. Follow [Object storage](/docs/site-management/storage/) and run the storage connection test after changing domains.

## Schedule maintenance jobs

Use an external scheduler or an additional Netlify Scheduled Function to send authenticated `POST` requests:

| Interval | Endpoint |
| --- | --- |
| Every 6 hours | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| Every 10 minutes | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

The request secret must match `REFRESH_CRON_SECRET`. Keep scheduler URLs and logs private.

## Upgrade and troubleshoot

Run the workflow again to upgrade. Back up Turso before migrations, and verify authentication, upload, sharing, and both scheduled calls after the deploy.

- If the page loads but API calls fail, check that environment variables include the Functions scope.
- If authentication returns to the Netlify subdomain, align `BETTER_AUTH_URL`, Public URL, and OAuth callbacks.
- If only uploads fail, inspect the S3 endpoint and CORS policy.
