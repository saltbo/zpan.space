---
title: Cloudflare Workers
description: Deploy ZPan to Cloudflare Workers with GitHub Actions.
---

Cloudflare Workers is the recommended deployment target for ZPan. It uses Workers for the application, D1 for relational data, and your chosen S3-compatible provider for files.

## Before you begin

You need a Cloudflare account and a fork of the [ZPan repository](https://github.com/saltbo/zpan).

Create an API token with these permissions:

- Workers Scripts: Edit
- D1: Edit
- R2 Storage: Edit

Add the token as `CLOUDFLARE_API_TOKEN` and your account identifier as `CLOUDFLARE_ACCOUNT_ID` under your fork's GitHub Actions secrets.

## Deploy

Run the **Deploy to Cloudflare Workers** workflow from the Actions tab. Future releases can be deployed by syncing your fork and running the workflow again.

## Custom domain

After the first deployment, attach a Custom Domain to the Worker from the Cloudflare dashboard. Then update ZPan's **Public URL** from the administration settings so share links, authentication callbacks, and WebDAV discovery use the correct origin.
