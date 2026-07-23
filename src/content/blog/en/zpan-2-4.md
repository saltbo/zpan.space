---
title: "ZPan 2.4: image hosting, API keys, and uploader integrations"
description: "A detailed introduction to ZPan 2.4: the image-hosting gallery, two-stage and stream-proxy uploads, custom domains, API keys, PicGo, uPic, and ShareX."
publishedAt: 2026-04-22
locale: en
tags: [Releases, v2.4]
---

ZPan 2.4 added a dedicated image-hosting workflow alongside the private drive. Images can be managed in a purpose-built gallery, published through stable URLs, and uploaded from common screenshot and image tools.

## A dedicated gallery and upload paths

Image hosting has its own gallery and settings instead of placing every image inside the ordinary file browser.

Uploads support two-stage and stream-proxy paths. Deployments can use the path appropriate to their storage and network configuration, while draft records are handled correctly when an upload finishes.

## Custom image domains

Administrators can configure a custom domain for hosted images, including domain onboarding through Cloudflare for SaaS. The public image hostname may therefore be managed separately from the main ZPan application hostname.

The release also unified public file URLs under `/r/:token`. Integrations and pages that relied on an older public-link path need to update their generated URLs.

## PicGo, uPic, and ShareX

ZPan 2.4 generates configuration for PicGo, uPic, and ShareX, allowing images to move directly from capture or editing tools into ZPan.

Programmatic uploads use API-key authentication, so an external uploader does not need the user's interactive browser session.

The main release corrected tool configurations, draft-image filtering, and failures affecting large and multipart uploads.

## v2.4.1 Docker fix

The v2.4.1 patch fixed a 404 returned by the Docker image on port `8222` and simplified the image build. Docker installations running v2.4.0 should include that patch.

Source releases:

- [v2.4.0](https://github.com/saltbo/zpan/releases/tag/v2.4.0)
- [v2.4.1](https://github.com/saltbo/zpan/releases/tag/v2.4.1)
