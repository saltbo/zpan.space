---
title: "ZPan 2.7: files beyond the browser"
description: "WebDAV, remote downloaders, background jobs, and server-side archives connect ZPan to existing clients without compromising its S3-native architecture."
publishedAt: 2026-06-09
locale: en
tags: [Releases, v2.7]
---

A file platform cannot stop at “open a browser and upload.” Desktop file managers need a mountable protocol, media clients need a stable read path, remote URLs should be saved without relaying them through a laptop, and archive jobs should not occupy one long HTTP request.

ZPan 2.7 addresses those paths. It keeps S3 as the data plane while adding protocol endpoints and independent workers around the control plane.

## WebDAV without exposing S3 credentials

Users can create dedicated app passwords and connect personal or team spaces to file managers, sync tools, and media players. Requests still pass through ZPan's identity, workspace, and permission model; clients never receive the bucket access key.

Every deployment exposes `/dav/`. Operators may also configure a derived `dav.` hostname. The Cloudflare workflow can reconcile its Custom Domain and Transform Rule, while Docker and other targets implement the same internal path prefix through their reverse proxy.

One password per device makes revocation practical. Losing a client no longer means rotating storage credentials or interrupting every other integration.

## Download work belongs on a download node

Long downloads are a poor fit for a Serverless request. Execution limits, temporary disk, and source-network conditions all vary. ZPan therefore treats the downloader as an independent node: the main application owns tasks, authorization, and status; the node fetches data and imports completed files into object storage.

Nodes register through device authorization instead of receiving an administrator session. Heartbeats report capability, throughput, load, and progress so operators can distinguish an offline node from a failed source or upload.

This also decouples infrastructure choices. The ZPan application can remain on Cloudflare Workers while a downloader runs on a VPS, NAS, or home server with suitable disk and network access. No shared filesystem is required.

## A complete fetch-to-consume workflow

WebDAV and remote downloads become more useful together:

1. A user creates a remote-download task.
2. A node fetches the source and uploads the result to S3.
3. ZPan updates the file tree and job state.
4. A media player or file client reads the same object through WebDAV.

There is one durable copy in object storage, while producers and consumers use the interfaces that suit them.

## Background work with durable state

Folder uploads, server-side archives, and extraction now use explicit background jobs with queued, running, completed, and failed states. A page refresh no longer erases progress, and failures carry an actionable stage and message.

Cloudflare uses Queues for archive execution; Node and Docker use their own worker environment. The job model presented to users remains consistent.

## Upgrade and get started

After upgrading, verify scheduled and background work before enabling additional entry points. Use one WebDAV password per device. Persist downloader configuration and task data, expose its configured BitTorrent port when needed, and monitor host disk capacity.

The official Docker Compose already includes the downloader service. Follow the [remote downloader guide](/docs/site-management/downloaders/) and [WebDAV configuration](/docs/site-management/webdav-domain/) to connect the first clients.
