---
title: Image hosting
description: Configure stable image URLs and connect screenshot and publishing tools.
---

ZPan can receive images from compatible tools and return a stable URL on a domain you control.

## Create an API key

1. Sign in to ZPan.
2. Open **Settings → API Keys**.
3. Create a key for the tool you want to connect.
4. Copy the value immediately and keep it secret.

## Configure image hosting

Open the Image Hosting settings and choose a storage backend, path prefix, and optional custom domain. You can also configure MIME restrictions, upload size, and referer rules.

## Supported workflows

ZPan is designed to work with:

- PicGo and PicList
- uPic
- ShareX
- Flameshot
- Custom scripts using the upload API

Create a separate API key for each tool so individual integrations can be revoked without affecting the others.
