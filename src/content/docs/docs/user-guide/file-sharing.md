---
title: File sharing
description: Publish files and folders with landing pages, direct links, passwords, expiration, and download limits.
---

Sharing grants controlled access to an existing file; it does not copy the object or expose bucket credentials.

![Share management in the English ZPan interface](/images/docs/shares.png)

Use a **landing share** for people. It presents file information and supports password, expiration, download limits, folder browsing, and save-to-drive. Use a **direct share** for scripts, release artifacts, and embeds where an immediate object response is required.

## Create and test a share

1. Select a file or folder and choose **Share**.
2. Prefer a landing page unless the consumer explicitly needs a direct URL.
3. Add a password for non-public material.
4. Set the shortest practical expiration and a download limit when delivery has a known audience.
5. Copy the link and test it from a private window where your ZPan session is absent.

Folder shares preserve ZPan's folder model rather than publishing raw object keys. Test nested navigation and at least one download.

## Understand revocation

Revoking a share stops future authorization but does not recall a file already downloaded or a direct response cached elsewhere. Treat direct links as easier to automate and harder to contain.

Review active links under Shares, remove expired delivery links, and investigate unexpected view or download activity. Revoking a share never deletes the source file.
