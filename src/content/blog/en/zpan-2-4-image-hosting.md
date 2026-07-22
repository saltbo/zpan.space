---
title: "ZPan 2.4: image hosting is more than an upload endpoint"
description: "API keys, path templates, custom domains, and desktop integrations turn an S3 bucket into a maintainable publishing workflow."
publishedAt: 2026-04-22
locale: en
tags: [Releases, v2.4]
---

Developers and writers rarely lack a bucket capable of storing an image. The missing part is a dependable publishing path: capture, upload immediately, organize objects, copy a stable URL, and revoke one device without rotating an account password.

ZPan 2.4 made image hosting a first-class workflow. It reuses the existing users, spaces, direct-to-S3 path, and permissions while adding image configuration, gallery management, API keys, custom domains, and tool integrations.

PicGo, PicList, uPic, ShareX, Flameshot, and custom scripts can each use a separate key. Plaintext is shown once and the server stores a hash. The integration page generates the required headers, form fields, and response mapping without persisting the pasted key.

Path templates keep a long-lived library maintainable. Organize blog assets by article or date and screenshots under their own prefix. A template change affects new objects only; it should not silently rename old objects and break published URLs.

Custom domains separate public identity from the storage provider and make future backend changes easier. Operators still need to validate DNS, HTTPS, caching, content type, and migration of old links. Referer and MIME rules reduce casual misuse but do not make a public image private.

Start only after the underlying storage and CORS test passes. Enable image hosting, choose storage and a path template, create a dedicated key, and upload one test image from the intended client. Verify the returned URL, content type, cache behavior, and revocation before moving a daily workflow. See the [image hosting guide](/docs/guides/image-hosting/).
