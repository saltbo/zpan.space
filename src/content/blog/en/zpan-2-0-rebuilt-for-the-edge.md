---
title: "ZPan 2.0: rebuilt for the edge"
description: "How the TypeScript rewrite turned ZPan into a portable, S3-native application for Cloudflare Workers and Docker."
publishedAt: 2026-04-12
locale: en
tags: [Releases, v2.0]
---

ZPan 2.0 was more than a new interface. It was a full TypeScript rewrite that established the architecture the project uses today: a Hono API, a React application, shared types, and platform adapters for both Cloudflare Workers and Node.js.

## S3 remains the data plane

The application server authorizes each upload and issues a presigned URL. The client then sends file bytes directly to S3-compatible storage. This keeps Workers fast, avoids routing large transfers through the server, and makes storage choice independent from the application runtime.

## One application, two primary runtimes

Cloudflare Workers with D1 became the primary target. Docker remained a first-class option through Node.js and SQLite. Both runtimes share the same product surface: file management, previews, administration, and internationalization.

That separation—shared product logic with narrow platform adapters—made later deployment targets possible without fragmenting ZPan into separate editions.

## A foundation for the V2 roadmap

The 2.0 release shipped the base file platform. Authentication, teams, advanced sharing, image hosting, licensing, and background transfers could then arrive as focused releases on top of the same architecture.

Read the [quick-start guide](/docs/getting-started/quick-start/) to run the current release.
