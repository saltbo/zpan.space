---
title: "Manage teams"
description: Create team spaces, assign member roles, set capacity, and transfer ownership without losing shared files.
---

Teams provide shared spaces with their own members, roles, files, and quota. They are not folders inside an administrator's personal space.

![Team management in the admin console](/images/docs/admin-teams.png)

Create a team for a durable group or project, assign a clear name, and keep at least one active Owner. Owners manage membership and team settings, Editors manage files, and Viewers receive read-only access according to the current permission model. Grant the lowest role that supports the work.

Adding a user to a team does not consume or merge their personal-space quota. Set the team's capacity separately and review it against actual usage. Do not use a shared user account as a substitute for membership; individual accounts preserve revocation and auditability.

Before removing the last Owner or deleting a team, transfer ownership and decide how retained files should be handled. Team deletion is not an archival strategy. Back up or migrate required content first and confirm external shares, API integrations, and WebDAV clients that depend on the team space.

Review membership when staff or collaborators leave, and use audit logs for sensitive changes.
