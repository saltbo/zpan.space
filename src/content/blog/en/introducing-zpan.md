---
title: "Meet ZPan: turn your S3 into a usable file platform"
description: "What ZPan solves, who it serves, and why it deliberately avoids becoming another all-purpose cloud drive."
publishedAt: 2026-07-22
locale: en
tags: [Product, Open source]
---

Object storage is durable, inexpensive, and effectively unlimited, but a bucket console is not how people want to manage files. Bucket names, object keys, and access keys are infrastructure concepts.

ZPan adds the missing control plane: file trees, users and teams, image hosting, controlled sharing, WebDAV, and remote downloads on top of any S3-compatible storage.

## A deliberate S3-only boundary

ZPan does not aggregate consumer drive accounts and does not treat a server directory as the primary file root. R2, S3, B2, Tigris, MinIO, and RustFS share a durable object API, allowing the product to focus on file workflows rather than chasing third-party login and provider changes.

Use a collaboration suite when you need online document editing, mail, and calendar; use a directory browser for local server files; use a provider aggregator when many consumer drives are the core requirement. ZPan is for an S3-backed file service.

## Direct transfer, focused control

ZPan creates an upload session and presigned instructions, then the browser sends bytes directly to S3. Downloads use object storage whenever possible. The application owns identity, permission, directory metadata, quota, and sharing without becoming the bandwidth relay.

That architecture makes Cloudflare Workers a practical primary runtime. Docker provides the same product for private networks and existing hosts.

## Four core workflows

- **S3 web drive:** folders, search, preview, trash, and team spaces.
- **Image hosting:** dedicated API keys and integrations for common capture tools.
- **Controlled sharing:** landing pages, direct links, password, expiration, limits, and folder browsing.
- **External access:** WebDAV clients and independent remote-download nodes.

Community keeps the core AGPL-3.0 self-hosted product. Pro adds operator controls such as branding, open registration, and audit; Business adds commercial quota and credit capabilities. The official [ZPan Drive](https://drive.zpan.space) is a managed delivery option, not a fourth edition.

For a first installation, complete one path before enabling everything: deploy Workers or Docker, create the administrator, set Public URL, add a bucket, pass the browser upload test, and create a share. Review the [deployment prerequisites](/docs/getting-started/prerequisites/) or inspect the project on [GitHub](https://github.com/saltbo/zpan).
