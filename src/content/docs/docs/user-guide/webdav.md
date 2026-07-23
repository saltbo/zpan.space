---
title: "Use WebDAV"
description: Connect Finder, Windows, Cyberduck, or RaiDrive to ZPan and troubleshoot authentication and write failures.
---

WebDAV connects supported desktop and mobile file clients to the personal and team spaces available to your ZPan account.

![WebDAV connection settings in the English ZPan interface](/images/docs/webdav.png)

Find the WebDAV address in ZPan and use the final HTTPS domain configured by the administrator. Create a dedicated application credential when the UI offers one; do not store your main password in an untrusted client. On shared computers, disable credential persistence.

Add the address in Finder, Windows or a client such as Cyberduck or RaiDrive, then verify directory listing, a small upload, rename, download, and delete. Client support varies for large files, locking, Unicode names, and conflict handling, so test the exact client before relying on it for bulk synchronization.

WebDAV operations consume the same space quota and follow the same roles as the web interface. A read-only team member cannot gain write access through WebDAV. Moving a large directory can involve many remote operations and should not be interrupted.

If authentication loops, confirm the WebDAV URL, HTTPS certificate, credential type, and server public URL. If browsing works but writes fail, check space role, quota, and storage logs. WebDAV is remote access, not an offline backup or full synchronization protocol.
