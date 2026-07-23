---
title: "Environment variables"
description: Reference the authentication, database, port, and scheduled-task variables used by each ZPan runtime.
---

ZPan keeps runtime and platform secrets in environment variables. Product settings such as branding, registration, CAPTCHA, email, and object-storage connections are configured in the admin console.

| Variable | Required | Purpose |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Yes | Stable secret used by authentication and derived credentials |
| `BETTER_AUTH_URL` | Production | Canonical public origin, for example `https://drive.example.com` |
| `PORT` | Node optional | HTTP listen port; the Node default is platform dependent |
| `DATABASE_URL` | Node optional | SQLite path; defaults to `./zpan.db` |
| `TURSO_DATABASE_URL` | Turso targets | libSQL/Turso database URL |
| `TURSO_AUTH_TOKEN` | Remote Turso | Token for the remote database |
| `REFRESH_CRON_SECRET` | External cron | Protects scheduled maintenance endpoints |

Cloudflare bindings such as D1 or R2 are defined in the Worker configuration rather than represented by the Node variables above. Individual deployment guides list the additional platform credentials used by CI.

Use secret storage supplied by the hosting platform. Do not prefix server secrets with frontend-public conventions, commit `.env` files, or paste values into screenshots. Keep `BETTER_AUTH_SECRET` unchanged during routine deployments; changing it can invalidate sessions and device authorization.

After changing `BETTER_AUTH_URL`, also update OAuth/OIDC callback URLs, storage CORS origins, WebDAV URLs, and any reverse-proxy configuration. Restart or redeploy the application and verify `/api/health` plus a complete sign-in flow.
