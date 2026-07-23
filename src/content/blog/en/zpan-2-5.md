---
title: "ZPan 2.5: expanding beyond Workers and Docker"
description: "A detailed introduction to ZPan 2.5 and its AWS Lambda, Vercel, Netlify, Azure Functions, Google Cloud Run, and Turso deployment support."
publishedAt: 2026-04-23
locale: en
tags: [Releases, v2.5]
---

ZPan 2.5 expanded the V2 deployment model. In addition to Cloudflare Workers and Docker, the project gained targets for several serverless and container platforms.

## Five new deployment targets

The release added support for:

- AWS Lambda
- Vercel
- Netlify
- Azure Functions
- Google Cloud Run

These environments have different build systems, runtimes, and persistence constraints. ZPan provides platform-specific entries and deployment configuration instead of treating every target as a variation of the Docker setup.

## libSQL and Turso

Serverless functions cannot persist a local SQLite file between instances. Version 2.5 introduced a libSQL database adapter, with Turso as the remote database option for application records such as accounts, directories, and file metadata.

Docker installations may opt into Turso as well, but they are not required to migrate. A single local Docker instance can continue to use SQLite.

## Profile images and storage behavior

Users can upload an avatar from Settings → Profile. In a Cloudflare environment, image uploads prefer an available R2 binding and fall back to the S3-compatible path when the binding is absent.

The settings tabs received a unified visual treatment, and missing avatar translations were added.

## Upgrade notes

Installing 2.5 does not move an existing instance to a new provider. A platform migration still requires deliberate handling of the database, environment variables, hostname, and object-storage configuration.

The source record is available in the [ZPan v2.5.0 release](https://github.com/saltbo/zpan/releases/tag/v2.5.0).
