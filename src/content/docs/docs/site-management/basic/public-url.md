---
title: Public URL and domains
description: Configure the production URL used by a ZPan instance.
sidebar:
  order: 2
---

A successful deployment only means the application is running. Complete the site-level settings before inviting users so authentication, sharing, image hosting, and WebDAV all use the production origin.

![Site settings in the ZPan admin console](/images/docs/admin-settings.png)

## Set Public URL first

Under **Admin Console → Settings → Site identity**, enter the final HTTPS origin, such as `https://files.example.com`. Do not include a path, query, or fragment.

Public URL drives share links, image URLs, and WebDAV discovery. OAuth callbacks prefer `BETTER_AUTH_URL` when configured and otherwise use the current request origin. Keep both origins aligned with the user-facing hostname; if that hostname changes, update every OAuth callback too.

## Choose how users join

The first user on a new database becomes administrator. After initialization:

- Keep registration closed for private installations and invite users explicitly.
- Public services should combine Pro open registration with captcha, email verification, and quotas.
- Do not open registration without anti-abuse controls; anonymous accounts can consume storage and egress.

Default personal and team quotas apply to newly created spaces. Changing defaults does not rewrite existing entitlements; adjust an existing user or team from its admin detail page.

## Captcha and email

ZPan supports Cloudflare Turnstile, Google reCAPTCHA, hCaptcha, and CaptchaFox. Register the final domain with the provider before saving its site and secret keys.

Email may use Cloudflare Email, SMTP, or a compatible HTTP service. Send a test message and verify SPF/DKIM delivery before requiring email verification.

## Administrator checklist

1. Open the production domain in a private window.
2. Confirm registration is exposed or hidden as intended.
3. Complete sign-in and sign-out.
4. Create a share and verify its domain.
5. Run the storage connection test.
6. Receive a real test email when email is enabled.
