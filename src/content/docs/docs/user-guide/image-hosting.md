---
title: Image hosting
description: Configure durable image URLs and connect PicGo, PicList, uPic, ShareX, Flameshot, or custom clients.
---

Image hosting uses the same S3 backend as ZPan while adding path templates, public delivery settings, gallery management, and tool-specific API keys.

![Image hosting settings in the English ZPan interface](/images/docs/image-hosting.png)

## Before connecting a client

1. Confirm the administrator's storage connection test passes.
2. Choose the storage backend and a stable path template.
3. Configure a public or custom delivery domain when required.
4. Create one API key per tool or device and copy it immediately; plaintext is shown once.

Open the Tool Integration panel to generate configuration for PicGo/PicList, uPic, ShareX, or Flameshot. The pasted key is used in the browser to generate output and is not persisted by the panel.

Upload one disposable image and verify the returned URL, `Content-Type`, caching, gallery entry, and deletion. Path-template changes affect new uploads only, so settle the naming strategy before publishing many links.

Referer allowlists reduce casual hotlinking but are not authentication. Do not publish private images through a public image-hosting URL. Revoke individual keys when a device is lost or an integration is retired.
