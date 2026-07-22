---
title: WebDAV
description: Create an app password, connect through /dav, and configure a dedicated DAV hostname.
sidebar:
  order: 4
---

WebDAV exposes ZPan files to file managers, media players, and sync tools without giving clients S3 credentials. Users create a dedicated WebDAV app password and connect to `https://files.example.com/dav/` with their username or email.

Create one password per device so a lost client can be revoked independently. Do not use the normal account password.

ZPan can derive `https://dav.files.example.com/` from the configured Public URL. The reverse proxy must internally prefix requests with `/dav` while preserving methods, bodies, and WebDAV headers including `Destination`, `Depth`, `If`, `Overwrite`, and `Lock-Token`.

The Cloudflare workflow can configure this when its token has `Transform Rules: Edit`. Other deployments configure DNS and proxying manually, then run **Admin Console → Settings → WebDAV → Verify domain**. Until verification succeeds, clients continue to receive the dependable `/dav/` endpoint.
