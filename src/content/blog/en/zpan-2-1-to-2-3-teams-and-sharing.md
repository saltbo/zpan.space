---
title: "ZPan 2.1–2.3: identity, spaces, and controlled sharing"
description: "Authentication, team workspaces, invitations, and public sharing connect the V2 file foundation into a collaboration path."
publishedAt: 2026-04-21
locale: en
tags: [Releases, v2.1–v2.3]
---

Upload and folders do not make a file manager collaborative. Collaboration needs to answer who enters the site, which space owns a file, and how somebody outside the site receives it safely.

ZPan 2.1 through 2.3 addressed those layers in order.

Version 2.1 completed identity and onboarding: first-administrator setup, password authentication, OAuth, custom OIDC, invitations, email verification, and recovery. Public URL, callback origins, and mail delivery became operator configuration rather than source changes.

Version 2.2 introduced personal and team spaces. Files belong to an organization space, while Viewer, Editor, and Owner roles grant access. Team data no longer depends on one member's private directory, and teams receive independent membership, activity, and quota.

Version 2.3 made sharing controlled publication instead of bucket exposure. Landing pages and direct links can carry passwords, expiration, and download limits. Folder shares preserve browsing, recipients may save content into their own drive, and revoking a share leaves the source object intact.

Landing pages are the default for people; direct links suit scripts, releases, and embeds but are harder to contain once cached. Sensitive delivery should favor short-lived landing shares with passwords.

Together, the releases form one path: operators configure entry, users work in the appropriate space, and controlled links deliver outside it. After upgrading, verify registration and mail, test team roles, then exercise share password, expiration, and revocation from a private browser window. Continue with [site settings](/docs/site-management/basic/public-url/), [users and teams](/docs/site-management/people/users/), and [file sharing](/docs/user-guide/file-sharing/).
