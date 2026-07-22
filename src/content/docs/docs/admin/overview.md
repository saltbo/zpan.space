---
title: Admin console overview
description: Understand the administrator surfaces and the recommended first-run order.
sidebar:
  order: 1
---

Only users with the `admin` role can enter the console. The first account on a new database is promoted automatically; manage later accounts explicitly through the console.

![ZPan admin overview](/images/docs/admin-overview.png)

## Recommended first-run order

1. Confirm Public URL and registration policy.
2. Add object storage and complete the browser upload test.
3. Configure email before requiring verification.
4. Add OAuth or OIDC providers when needed.
5. Create a normal test user and verify quota, upload, sharing, and trash.
6. Enable announcements, WebDAV, downloaders, or paid features afterward.

Overview and Analytics expose trends; they are not configuration pages. When a metric looks wrong, use Users, Teams, Storages, Downloaders, or Audit Logs to find the responsible resource and event.
