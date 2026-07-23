---
title: "Audit logs"
description: Filter administrative events by actor, action, resource, and time, then correlate them with platform logs.
---

Audit logs record important administrative and security-relevant actions performed through ZPan. They help answer who changed a resource, what kind of action occurred, and when.

![Audit logs in the admin console](/images/docs/admin-audit.png)

Open **Admin Console → Audit Logs** and narrow the time range before filtering by actor, action, or resource. Investigate related entries as a sequence: for example, a quota grant may follow a user change and precede unusual storage growth.

Record a reason in workflows that support one, especially for manual entitlements, account restrictions, storage changes, and node revocation. Use individual administrator accounts rather than shared credentials so the actor remains meaningful.

Audit logs cover actions known to the application. They do not include a bucket policy edited in a cloud console, a reverse-proxy change, direct database access, or a host administrator reading a volume. Correlate ZPan entries with identity-provider, platform, database, object-storage, and proxy logs during an incident.

Access to audit data is license-dependent. Define retention and export procedures that match your organization's obligations, restrict who may view the logs, and protect exported copies because metadata can contain user and resource identifiers.
