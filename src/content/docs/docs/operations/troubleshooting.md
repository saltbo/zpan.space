---
title: "Troubleshooting"
description: Trace sign-in, upload, storage, email, and downloader failures from the browser to platform logs.
---

Troubleshoot one layer at a time: browser, ZPan API, database, object storage, then optional services such as email or downloaders.

## Fast diagnosis

1. Open `/api/health` and check the deployment logs at the same UTC time as the failure.
2. Reproduce in a private browser window to rule out stale sessions and extensions.
3. Inspect the browser Network panel. Note the first failed request, status code, and response body.
4. Confirm the deployed version and any configuration change made immediately before the problem.

| Symptom | Likely area | First check |
| --- | --- | --- |
| Redirect loop after sign-in | Public URL or proxy | `BETTER_AUTH_URL`, HTTPS, forwarded headers |
| Storage test passes but upload fails | Browser-to-bucket path | Bucket CORS and public endpoint |
| Upload finishes but file is absent | Confirmation or database | API logs and database errors |
| Downloads return 403 | Presigned URL or clock | Storage policy, region, server time |
| OAuth callback rejected | Provider client | Exact callback URL and client secret |
| Email never arrives | SMTP | Sender policy, TLS mode, provider logs |
| Remote task never starts | Downloader | Node online status and device authorization |

Do not repeatedly retry destructive operations while the cause is unknown. Preserve logs and take a database backup before manual data repair. When requesting help, include a minimal reproduction, deployment target, ZPan version, redacted configuration, browser error, and relevant server log lines.

## Logs and runtime health

Use the health endpoint and platform logs together. `GET /api/health` proves that the application process can answer a request; it does not prove that browser uploads, email delivery, scheduled jobs, or every storage backend works.

- Monitor `/api/health` from outside the hosting platform and alert on repeated non-2xx responses or high latency.
- Retain application, reverse-proxy, database, and object-storage logs for a defined period.
- Alert on restart loops, database errors, authentication failures, signing errors, failed scheduled jobs, and unusual 4xx/5xx rates.
- Run a small upload and download probe after deployments or infrastructure changes.

For Docker, begin with `docker compose ps` and `docker compose logs --tail=200 zpan`. For Cloudflare, use Workers observability and the D1/R2 dashboards. Other targets expose function or container logs in their own console.

Record the UTC time, request path, user or space, deployment version, and request identifier when investigating. Never publish session cookies, authorization headers, OAuth secrets, storage credentials, or presigned URLs.
