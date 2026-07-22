---
title: "ZPan 2.7: WebDAV, remote downloads, and background tasks"
description: "The latest V2 release connects ZPan to existing clients and moves long-running transfers out of the request path."
publishedAt: 2026-06-09
locale: en
tags: [Releases, v2.7]
---

ZPan 2.7 broadened how files enter and leave the platform. Browser uploads remain the simplest path, but they are no longer the only one.

## Mount ZPan with WebDAV

WebDAV makes ZPan available to desktop and mobile clients that already understand the protocol. Users can work with their storage from familiar file tools while ZPan continues to enforce identity and permissions.

## Let the server fetch remote files

Remote downloads save a URL directly into configured storage. The transfer runs as a background task, so the browser does not need to stay open and the user's local connection does not relay the file.

## Background work you can see

The release added background-task visibility alongside server-side archives and folder uploads. Long-running operations have explicit progress and outcomes instead of disappearing behind a request timeout.

Patch releases completed Business licensing, entitlements, and operational telemetry. Together, the 2.7 line turns ZPan into a more capable bridge between web, desktop, and automated file workflows.
