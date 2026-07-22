---
title: "Meet ZPan: file hosting that starts with your storage"
description: "Why we are building a focused, open-source file platform on top of S3—and what makes it different from another cloud drive."
publishedAt: 2026-07-22
locale: en
tags: [Product, Open source]
---

Most file platforms begin by asking you to move your data into somebody else's system. ZPan begins with a different question: **what if the storage is already yours?**

ZPan is an open-source, S3-native file hosting platform. Connect an S3-compatible bucket, deploy the application, and get a modern interface for uploading, organizing, serving, and sharing files.

## Focused by design

We are not trying to build another all-purpose cloud drive. ZPan focuses on three workflows where simple, reliable file infrastructure matters:

- **Image hosting** for developers, bloggers, and screenshot workflows.
- **File sharing** with polished links, passwords, expiration, and limits.
- **Automation** through APIs, WebDAV, and agent-friendly tooling.

That focus lets the architecture stay small enough to understand and operate yourself.

## The direct route to S3

When you upload a file, ZPan authorizes the request and creates a presigned URL. Your browser then uploads directly to object storage. The application server never becomes a bandwidth bottleneck.

This architecture is particularly effective on Cloudflare Workers, but it is not tied to Cloudflare. Docker deployments and a broad range of S3-compatible providers remain first-class options.

## Open from the first commit

ZPan is released under AGPL-3.0. You can inspect it, deploy it, modify it, and help shape what comes next. Your storage credentials stay in your deployment, your files stay in your bucket, and your domain stays under your control.

Start with the [quick-start guide](/docs/getting-started/quick-start/) or explore the project on [GitHub](https://github.com/saltbo/zpan).
