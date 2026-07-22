---
title: Cloudflare Workers
description: Deploy ZPan with GitHub Actions and provision D1, Queues, and R2 automatically.
sidebar:
  order: 1
---

Cloudflare Workers is ZPan's primary deployment target. The application runs on Workers, metadata lives in D1, archive jobs use Queues, and a small R2 bucket stores avatars. User files remain separate and can use any S3-compatible storage configured in the admin console.

## Prepare Cloudflare and GitHub

1. Fork [saltbo/zpan](https://github.com/saltbo/zpan).
2. Copy the **Account ID** from the Cloudflare dashboard.
3. Create a scoped API token with `Workers Scripts: Edit`, `D1: Edit`, and `R2 Storage: Edit`.
4. Add `Transform Rules: Edit` for the target zone only if the workflow should configure a dedicated WebDAV hostname.

Use a scoped token instead of the Global API Key so deployment access can be audited and revoked independently.

In the fork, open **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `CLOUDFLARE_API_TOKEN` | The scoped token |
| `BETTER_AUTH_SECRET` | Optional; generated on first deploy when omitted |

Keep `BETTER_AUTH_SECRET` stable. Rotating it invalidates existing sessions.

## Run the workflow

Open **Actions → Deploy to Cloudflare Workers → Run workflow**. With no version selected, the workflow resolves the latest stable ZPan release rather than deploying upstream `main`.

The first run creates or reuses the `zpan-db` D1 database, the archive queue, and the `zpan-public-images` avatar bucket. It then sets the authentication secret, applies migrations, builds the application, and deploys the Worker.

Open the URL in the workflow summary. The first account registered on a new database becomes the administrator.

## Add the production domain

Attach a Custom Domain such as `files.example.com` under the Worker's **Settings → Domains & Routes**. Then open **Admin Console → Settings → Site identity** and set Public URL to the exact HTTPS origin.

Public URL drives share links, image-hosting URLs, and WebDAV discovery. OAuth callbacks use the authentication origin serving the request. When the domain changes, update callback URLs in every OAuth provider too.

## Add file storage

The deployment workflow provisions infrastructure for ZPan itself; it does not choose where user files belong. Add R2, S3, B2, Tigris, or another S3-compatible bucket under **Admin Console → Storages**, then configure browser CORS as described in [Object storage](/docs/site-management/storage/add-storage/).

The automatically created `zpan-public-images` bucket stores avatars only. It is not the default user-file bucket.

## Update safely

Run the workflow again to deploy a newer stable release. Resources are reused and migrations run before deployment. After updating, verify sign-in, direct upload, sharing, and background jobs.

Cloudflare can roll back Worker code, but a code rollback does not undo D1 migrations. Keep D1 backups and read release notes before production upgrades.

## Post-deploy checklist

- The first account has administrator access.
- Public URL matches the final HTTPS origin.
- The storage connection test completes create, direct upload, and cleanup.
- Share links use the production domain.
- Worker logs do not show recurring errors.
