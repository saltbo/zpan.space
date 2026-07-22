---
title: "ZPan 2.5: one application, seven deployment targets"
description: "ZPan expanded beyond Workers and Docker while keeping one product and one S3-native architecture."
publishedAt: 2026-04-23
locale: en
tags: [Releases, v2.5]
---

Infrastructure preferences vary. Some teams want a zero-operations edge deployment; others need an existing cloud account, a conventional server, or a specific database. ZPan 2.5 made those choices deployment details rather than product forks.

## Seven supported targets

The same application can run on Cloudflare Workers, Docker, AWS, Vercel, Netlify, Azure, and Google Cloud. Cloudflare remains the primary target and Docker the universal self-hosted path, while the additional adapters fit established platforms.

## Storage and compute stay independent

Deployment choice does not determine storage choice. ZPan continues to speak S3-compatible APIs, so an application running on one platform can use object storage from another. Turso support also provides a portable database option where a local SQLite file or D1 is not the right fit.

## Portability without a lowest common denominator

The shared Hono application keeps behavior consistent. Narrow bootstrap and persistence adapters handle platform differences, allowing each target to use its native runtime without duplicating the product.

Start with [Cloudflare Workers](/docs/deployment/cloudflare/) or [Docker](/docs/deployment/docker/).
