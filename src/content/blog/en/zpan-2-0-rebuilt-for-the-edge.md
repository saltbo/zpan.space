---
title: "ZPan 2.0: rebuilt to keep running"
description: "The TypeScript rewrite was a means, not the goal: move the control plane to Serverless while files continue to travel directly to S3."
publishedAt: 2026-04-12
locale: en
tags: [Releases, v2.0]
---

ZPan V1 proved that object storage could back a personal drive. The application managed users, directories, and shares while presigned URLs sent transfers directly to OSS, COS, S3, or MinIO.

Being deployable, however, is not the same as being easy to keep online. A traditional installation still asks its operator to maintain a VPS, proxy, certificates, database, and process. ZPan 2.0 rebuilt the runtime so the control plane could live on Cloudflare Workers while Docker remained a universal self-hosted path.

## S3 is the data plane

For an upload, ZPan creates a draft object and upload session, checks permission and quota, then returns presigned instructions. The browser transfers bytes directly to S3 and calls ZPan again to complete the object.

This two-phase flow prevents a partially uploaded object from appearing as a finished file. It also keeps application bandwidth out of the transfer path. The storage provider handles delivery; ZPan decides who may transfer what and records the result.

## One application across Workers and Node

Hono provides a web-standard HTTP application, React provides the client, and Drizzle supports the SQLite family through D1, local SQLite, and later libSQL. Workers uses platform bindings and D1; Docker uses Node.js and durable SQLite.

Platform differences stay in entry points and adapters. File, permission, sharing, and quota logic do not fork with the runtime. That boundary later made AWS, Vercel, Netlify, Azure, and Cloud Run targets possible.

## The unglamorous file details

Version 2.0 rebuilt upload, folders, rename, move, copy, search, trash, preview, batch actions, progress, and name-conflict handling. These details rarely lead a release announcement, but they determine whether a file tool works every day.

Deletion enters trash, uploads have draft and completion states, batch actions can report partial failure, and replacement behavior is explicit. The database and object store now have a more understandable relationship.

Choose Workers with D1 for the least infrastructure maintenance. Choose Docker for a private network, existing server, or local SQLite. Both still require an S3-compatible bucket and browser CORS; a successful application deploy is not complete until a real browser upload and download succeeds.

Start with the [deployment decision guide](/docs/getting-started/choose-deployment/) and follow one primary deployment path end to end.
