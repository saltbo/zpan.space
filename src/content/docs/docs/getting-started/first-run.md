---
title: First-run setup
description: Initialize a new ZPan deployment and verify one real sign-in, storage, upload, and sharing path.
sidebar:
  order: 2
---

The finish line is not merely seeing the ZPan home page. Complete one browser upload into your own S3 bucket and open a protected share from a private browser window.

1. Choose [Cloudflare Workers](/docs/deployment/cloudflare/) for minimal server maintenance or [Docker](/docs/deployment/docker/) for a host, NAS, or private network.
2. Open the deployment and register immediately. The first account on a new database becomes administrator.
3. Set the final HTTPS Public URL under **Admin Console → Settings → Site identity**.
4. Add a bucket under **Admin Console → Storages**, configure [browser CORS](/docs/site-management/storage/object-storage/), and run the full create/upload/cleanup test.
5. From Files, create a folder, upload a small file, refresh, download it, move it through trash, and restore it.
6. Create a password-protected landing share with a short expiration and download it from a private window.

Only after this path succeeds should you add email, OAuth, teams, WebDAV, image hosting, or downloaders. Enable one capability at a time and keep a normal test account for validating the user-visible result.
