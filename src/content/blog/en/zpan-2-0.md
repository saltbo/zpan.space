---
title: "ZPan 2.0: the TypeScript rewrite that started V2"
description: "A detailed look at ZPan 2.0: the Hono and React rewrite, Workers and Docker targets, direct object-storage uploads, the new file manager, and responsive UI."
publishedAt: 2026-04-12
locale: en
tags: [Releases, v2.0]
---

ZPan 2.0 is the foundation of the current V2 product line. The application was rewritten from Go to TypeScript, with a Hono API and a React interface. The same codebase can run on Cloudflare Workers or through Node.js and Docker.

This was an architectural release rather than a collection of isolated features. It established where ZPan runs, how browsers transfer files, and how the file-management experience would develop in later releases.

## One application, two runtime models

V2 builds its HTTP application around web-standard interfaces. Cloudflare Workers provides a serverless deployment path, while Docker remains available for servers, NAS devices, and private networks.

The follow-up v2.0.1 release made the Workers path practical with a one-click deployment button. It also corrected authentication and deployment details, including `baseURL` and trusted-origin inference, and enabled `nodejs_compat_v2`.

Moving the application does not turn it into a file relay. ZPan handles identity, permissions, directories, and upload sessions. The browser receives presigned instructions and transfers file content directly to an S3-compatible object store.

## A rebuilt file manager

The release introduced a custom file manager with a directory tree, search, and a recycle bin. Images, PDFs, code, audio, and video can be previewed without first downloading them.

The administration area includes user, storage, and quota management, including storage quotas per organization. English and Chinese interfaces shipped as part of the rewrite.

The initial release also corrected global server-side search and media-preview rendering. Search is submitted to the server when the user presses Enter, and the media fixes addressed content that previously failed to render correctly.

## Responsive UI in v2.0.2

The third release in the 2.0 line added responsive layouts for desktop, tablet, and mobile. Mobile preview uses an adaptive bottom drawer suited to each file type instead of squeezing the desktop presentation into a narrow viewport.

The complete 2.0 line therefore consists of:

- **v2.0.0** — TypeScript rewrite, dual runtime targets, direct uploads, file management, previews, administration, and localization.
- **v2.0.1** — one-click Cloudflare Workers deployment and authentication configuration fixes.
- **v2.0.2** — responsive layouts and adaptive mobile preview.

## Upgrade notes

ZPan 2.0 is not an in-place patch for V1. Preserve the existing database and object storage before migration, then follow the V2 deployment and storage model. After deployment, verify sign-in, upload, download, and preview through the production hostname.

Source releases:

- [v2.0.0](https://github.com/saltbo/zpan/releases/tag/v2.0.0)
- [v2.0.1](https://github.com/saltbo/zpan/releases/tag/v2.0.1)
- [v2.0.2](https://github.com/saltbo/zpan/releases/tag/v2.0.2)
