---
title: User management
description: Manage ZPan accounts, access, quotas, and resource entitlements.
sidebar:
  order: 5
---

Files belong to personal or team spaces rather than directly to user records. Confirm which space is affected before changing access or capacity.

![The user list in the admin console](/images/docs/admin-users.png)

## Accounts and access

Use individual accounts rather than shared credentials. Disabling an account blocks sign-in without immediately deleting its files, which is appropriate while investigating access or arranging a handover.

Deletion is irreversible. Before deleting a user, resolve team ownership, retained personal-space data, active shares, API keys, WebDAV clients, and any operational or legal retention requirement. Keep at least one active site administrator.

## Quotas and entitlements

Defaults apply only when a personal or team space is created. To adjust an existing space, grant an explicit storage or traffic entitlement from the user or team detail view. Include a source, note, and expiration for trial, promotional, support, or paid capacity.

Do not edit quota tables directly. The application workflow updates entitlement, usage, edition, and audit state together. Reducing a quota below current usage should be tested on the installed version; existing files should not disappear silently, but new uploads may be blocked.

Personal and team spaces are measured independently. Free capacity in one space does not resolve a full quota in another. Application quotas are also distinct from the object-storage provider's capacity and billing limits.

Review disabled users, administrators, manual grants, expired entitlements, and unusual usage regularly. Use [Audit logs](/docs/site-management/audit-logs/) to investigate sensitive changes.
