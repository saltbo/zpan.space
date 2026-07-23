---
title: "Files and folders"
description: Organize, upload, download, move, recover, and permanently delete files across ZPan spaces.
---

The Files page is the main workspace for browsing and organizing content in your current personal or team space.

![The ZPan file browser](/images/docs/files.png)

Use **New folder** to establish a durable structure before large imports. Names appear as folders in ZPan, while the underlying object store may represent them as object-key prefixes. You do not need bucket credentials and should not rename raw objects outside ZPan.

Select an item to download, share, move, rename, copy, or send it to trash according to your permission. Folder operations can involve many objects, so keep the page open until completion and check the destination before repeating an action.

Switch spaces from the space selector rather than creating duplicate top-level folders for teams. The breadcrumb always shows the active location. If an expected file is missing, confirm the current space, search term, and trash before asking an administrator to inspect storage.

Avoid simultaneous conflicting edits from multiple browser tabs or WebDAV clients. For important bulk changes, work in smaller batches and verify a sample download afterward.

## Uploads and downloads

Transfers normally move directly between the browser and object storage through short-lived signed URLs. Keep the ZPan tab open until an upload is confirmed, especially for multipart files.

If an upload fails, read the first error before retrying. A network interruption can be retried; quota, permission, CORS, or storage failures need correction first. When progress reaches 100% but confirmation fails, refresh the folder before uploading another copy.

Downloads may open or save according to file type and browser settings. A signed storage URL expires, so begin the download from ZPan again instead of bookmarking that URL.

## Trash and permanent deletion

Deleting supported items sends them to Trash. Trash is a recovery window, not a backup. Restore an item to an available location; a name conflict may require another folder or name.

Permanent deletion removes the ZPan record and requests deletion from object storage. It cannot be undone through the UI. Before emptying Trash, verify the active space and selected items. Administrators may enforce cleanup policies, so restore important content promptly.
