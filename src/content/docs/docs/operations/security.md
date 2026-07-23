---
title: "Security hardening"
description: Harden a public ZPan instance with stable secrets, HTTPS, least-privilege storage, and controlled registration.
---

Treat a ZPan deployment as an internet-facing application with access to user files. Start with least privilege, stable secrets, HTTPS, and a documented update process.

## Deployment baseline

- Generate a long, random `BETTER_AUTH_SECRET`; keep it stable across restarts and out of source control.
- Serve the public URL over HTTPS and configure the reverse proxy to pass the original host and scheme.
- Run ZPan and its database as non-root services where the platform permits it.
- Restrict database, storage console, and downloader management ports to private networks.
- Give ZPan a dedicated bucket credential limited to the required bucket and object actions.
- Configure bucket CORS for the exact ZPan origins instead of `*` in production.
- Disable open registration when it is not needed, and enable CAPTCHA when registration is public.
- Require trusted email or OIDC providers and remove unused login methods.

Review administrators, team owners, API keys, OAuth clients, manual quota grants, and active download nodes regularly. Audit logs are useful for investigation, but they do not replace alerts or backups.

## Incident response

If a secret is exposed, rotate it at the issuing service, update ZPan, and verify access before revoking the old value. Rotating `BETTER_AUTH_SECRET` can invalidate sessions and derived credentials, so schedule it deliberately. For a compromised storage key, inspect provider access logs and bucket changes as well as ZPan audit activity.

Keep ZPan, the reverse proxy, database, and downloader images current. Test upgrades against a restored backup before applying them to a critical instance.
