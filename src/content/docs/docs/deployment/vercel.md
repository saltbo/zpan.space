---
title: Vercel
description: Deploy ZPan as a Node.js Vercel Function with Turso and external S3 storage.
sidebar:
  order: 4
---

Vercel is useful when your team already ships web applications there and wants ZPan in the same deployment workflow. The static interface is served through Vercel's CDN and the API runs in a Node.js 22 Function. Turso provides persistent metadata storage; user files remain in your S3-compatible bucket.

## Prepare the project

Fork [saltbo/zpan](https://github.com/saltbo/zpan), create a Turso database, and create or select a Vercel project. ZPan uses the Node.js runtime, not the Edge runtime.

Link the fork from a local checkout once:

```sh
cp deploy/vercel/vercel.json vercel.json
pnpm exec vercel link
```

The generated `.vercel/project.json` contains the organization and project IDs used by GitHub Actions. Do not commit the `.vercel` directory.

## Configure GitHub Secrets

Add these under **Settings → Secrets and variables → Actions**:

| Secret | Required | Purpose |
| --- | --- | --- |
| `VERCEL_TOKEN` | Yes | Authorizes Vercel CLI deployment |
| `VERCEL_ORG_ID` | Yes | Identifies the account or team |
| `VERCEL_PROJECT_ID` | Yes | Identifies the linked project |
| `TURSO_DATABASE_URL` | Yes | Persistent libSQL database URL |
| `TURSO_AUTH_TOKEN` | Yes | Database authentication |
| `BETTER_AUTH_SECRET` | No | Stable session-signing secret |
| `BETTER_AUTH_URL` | No | Final HTTPS origin |
| `TRUSTED_ORIGINS` | No | Additional allowed origins when required |

If `BETTER_AUTH_SECRET` is omitted, the workflow generates and preserves one. Do not rotate it during normal upgrades.

## Deploy

Open **Actions → Deploy to Vercel → Run workflow**. With no version selected, the workflow resolves the latest stable ZPan release, applies Turso migrations, builds the application, and creates a production deployment.

The included configuration routes `/api/*` and `/health` to one Node.js Function and all other requests to the single-page application. Verify the URL from the workflow summary:

```sh
curl https://your-project.vercel.app/api/health
```

Register the first administrator only after you have confirmed that the deployment points to the intended Turso database.

## Use a custom domain

Add the domain in **Project → Settings → Domains** or follow Vercel's [custom-domain guide](https://vercel.com/docs/domains/set-up-custom-domain). Then set `BETTER_AUTH_URL` to the exact HTTPS origin, update `TRUSTED_ORIGINS` if used, and redeploy.

Set the same origin under **Admin Console → Settings → Site identity** and update OAuth provider callbacks. Environment-variable changes require a new deployment before Functions receive them.

## Add file storage

Vercel hosts ZPan's interface and API; it does not become the user-file store. Add an S3-compatible bucket under **Admin Console → Storages** and configure its CORS policy for the final Vercel or custom-domain origin.

The browser uploads directly with a presigned URL, so Vercel Function request-size and duration limits do not define the maximum object size. The storage provider's limits and CORS policy still apply. See [Object storage](/docs/site-management/storage/).

## Schedule maintenance jobs

Set a random `REFRESH_CRON_SECRET` in the Vercel project, then use a private scheduler to make these `POST` requests:

| Interval | Endpoint |
| --- | --- |
| Every 6 hours | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| Every 10 minutes | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

Vercel also supports [Cron Jobs](https://vercel.com/docs/cron-jobs), but cron paths are stored in project configuration. Do not commit a secret in `vercel.json`; use a protected wrapper endpoint or a scheduler whose request configuration remains private.

## Upgrade and troubleshoot

Run the workflow again for upgrades. Back up Turso before migrations and keep the previous Vercel deployment available for code rollback.

- A `500` on every API route usually indicates missing Turso or authentication environment variables.
- An OAuth redirect to `*.vercel.app` means `BETTER_AUTH_URL` was not updated after adding the domain.
- An upload CORS error belongs to the browser-to-S3 request, not the Vercel deployment.
