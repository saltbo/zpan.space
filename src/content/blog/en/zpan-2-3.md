---
title: "ZPan 2.3: complete file and folder sharing"
description: "A detailed introduction to ZPan 2.3, including public share pages, direct mode, passwords, folder browsing, Save to Drive, notifications, and share management."
publishedAt: 2026-04-21
locale: en
tags: [Releases, v2.3]
---

ZPan 2.3 introduced a complete sharing workflow for files and folders. A share is no longer only a download URL: it has a presentation mode, optional password, folder navigation, a save operation, and a management record.

## Share pages and direct mode

Public shares use `/s/:token`. The creator can use a landing page that presents the item or a direct mode suited to immediate access.

Passwords can be generated for a share. Folder shares let recipients browse the folder contents instead of receiving only a single file or archive.

## Save to Drive

Signed-in users can copy shared files into their own workspace. ZPan checks the target quota and resolves naming conflicts as part of the operation.

This avoids the unnecessary download-and-upload cycle that would otherwise be required to keep a shared item.

## Share management and notifications

The release added a dedicated Shares dashboard where users can review and manage the links they created. In-app notifications also arrived in this version, with the notification bell moving to the page header.

The interface received a Google-inspired color refresh across the new sharing and notification surfaces.

## Fixes

Name conflicts use Finder-style resolution. An incorrect share password now produces the correct 403 response, and public view counts are deduplicated.

The source record is available in the [ZPan v2.3.0 release](https://github.com/saltbo/zpan/releases/tag/v2.3.0).
