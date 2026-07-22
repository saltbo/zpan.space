---
title: "ZPan 2.4: your own image hosting workflow"
description: "Custom domains, galleries, API keys, and uploader integrations turn an S3 bucket into a practical image host."
publishedAt: 2026-04-22
locale: en
tags: [Releases, v2.4]
---

Image hosting is often the first reason developers and writers reach for object storage. ZPan 2.4 made that workflow a first-class part of the product instead of a side effect of file uploads.

## Upload from the tools you already use

The release added API-key authentication and integrations for tools such as PicGo, PicList, uPic, ShareX, and Flameshot. A screenshot can move from the desktop to your S3 bucket and clipboard without opening a browser.

## Publish on your own domain

Custom-domain support lets image URLs carry your identity instead of a vendor's. The image gallery provides a focused place to browse and manage uploaded assets while the underlying objects remain in storage you control.

## One storage layer, multiple workflows

Image hosting uses the same authentication, direct-upload architecture, metadata, and storage configuration as the rest of ZPan. There is no second service to operate and no separate copy of the file.

See the [image hosting guide](/docs/guides/image-hosting/) to connect a client.
