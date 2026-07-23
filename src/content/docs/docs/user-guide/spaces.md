---
title: "Personal and team spaces"
description: Understand how personal and team spaces separate file ownership, permissions, membership, and quotas.
---

A space is the ownership and quota boundary for files. Every user has a personal space and may also belong to team spaces.

![The space selector in the English ZPan file browser](/images/docs/files.png)

Your personal space is for content you own directly. A team space belongs to the team, has separate members and roles, and remains independent of any one member's personal folders. Moving or copying between spaces can therefore require additional permission and capacity.

Use the space selector before uploading or creating a folder. Check the breadcrumb and space name when a quota or permission error appears; being an Editor in one team does not grant access to another, and a full team quota is not fixed by free capacity in your personal space.

Shares grant outside access to selected content but do not create another space. WebDAV exposes the spaces available to your account, while API integrations should be configured for the intended space rather than relying on whichever one was last open in the browser.

When leaving a team, move only content you are authorized to retain. Team Owners should transfer responsibility and review active shares before removing the final owner or deleting the team.
