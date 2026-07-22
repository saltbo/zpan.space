---
title: Authentication, OAuth, and email
description: Configure password login, OAuth, custom OIDC, verification email, and password recovery.
sidebar:
  order: 3
---

ZPan supports email or username with password by default. Teams and public installations can add built-in OAuth providers or a custom OIDC identity system.

![OAuth provider management](/images/docs/admin-oauth.png)

Set the production domain before creating OAuth applications. Built-in providers use `/api/auth/callback/<provider-id>`; custom OIDC uses `/api/auth/oauth2/callback/<provider-id>`.

The callback shown by the console uses `BETTER_AUTH_URL` when that variable is configured, otherwise it uses the current request origin. Keep `BETTER_AUTH_URL`, Public URL, and the user-facing hostname aligned, and copy the exact callback shown by the console.

For OIDC, provide a unique provider ID, discovery URL, client ID, client secret, and scopes. Scopes need `openid` and commonly include `profile` and `email`. Test first login, repeat login, and sign-out with a new account before inviting users.

Configure Cloudflare Email, SMTP, or an HTTP mail provider under **Admin Console → Settings → Email**. Send a test message and validate SPF/DKIM delivery before requiring email verification.

When sign-in fails, check callback equality, HTTPS/Public URL consistency, secret validity, discovery reachability, and required claims in that order.
