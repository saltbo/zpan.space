---
title: Basic settings
description: Configure the ZPan public URL, branding, registration, quotas, CAPTCHA, and WebDAV domain.
sidebar:
  order: 2
---

Complete the site settings before inviting users. The values on this page affect authentication, public links, new-account capacity, abuse protection, email, and WebDAV.

![Site settings in the ZPan admin console](/images/docs/admin-settings.png)

## Recommended first-run order

1. Set the final Public URL and `BETTER_AUTH_URL`.
2. Configure the site name and branding.
3. Add object storage and complete a browser upload.
4. Configure email and the login methods described in [Login and email](/docs/site-management/oauth/).
5. Choose a registration policy, default quotas, and CAPTCHA.
6. Test sign-in, sharing, and WebDAV from outside the administrator session.

## Public URL and domains

Under **Admin Console → Settings → Site identity**, enter the final HTTPS origin, such as `https://files.example.com`. Use only the scheme and hostname, plus a non-default port if required; do not include a path, query, or fragment.

Public URL is used for share links, image URLs, WebDAV discovery, and other public addresses. Authentication callbacks prefer `BETTER_AUTH_URL` when it is configured. Keep both values aligned with the hostname users actually open.

After changing the domain, update OAuth and OIDC callback URLs, bucket CORS origins, DNS, reverse-proxy rules, and email links. Then test in a private browser window so an existing administrator session does not hide a broken callback.

## Site name and branding

Use a short site name that remains readable in navigation, browser titles, sign-in pages, and email. Prefer a square SVG or high-resolution transparent PNG logo and verify it in light, dark, desktop, and narrow layouts.

Brand assets must be publicly reachable. Browsers and CDNs can retain an old logo, so verify a saved change while signed out. Custom branding is license-dependent; the installed [Licensing](/docs/site-management/licensing/) page shows whether it is available.

## Registration and invitations

The first account created against a new database becomes the site administrator. After initialization, choose one policy:

- **Private site:** keep open registration disabled and invite users explicitly.
- **Invitation-only:** issue separate, expiring codes for different groups so each can be revoked and audited.
- **Public registration:** enable email verification, CAPTCHA, conservative defaults, monitoring, and an abuse-report process before publishing the form.

Test the signed-out registration flow and confirm that the API—not only the visible form—enforces the selected policy. Never publish a reusable administrative invitation code.

## Default quotas

Default personal and team quotas apply when a space is created. Changing them does not resize existing spaces; adjust those through **User management** or **Team management**.

Leave storage headroom for multipart uploads, migrations, trash, and recovery. Personal and team spaces are independent. Application quotas also do not replace provider-side capacity and billing alerts.

## CAPTCHA and abuse prevention

ZPan supports Cloudflare Turnstile, Google reCAPTCHA, hCaptcha, and CaptchaFox. Register the exact production hostname with the provider, then enter its site key and secret under **Settings → CAPTCHA**. Configure a score threshold only when the selected provider supports one.

The site key is public; the secret key is not. Test sign-up and sign-in in a private window before ending the administrator session. CAPTCHA complements registration policy, rate limits, email verification, and monitoring rather than replacing them.

## WebDAV address and domain

The dependable WebDAV endpoint is `https://files.example.com/dav/`. Users should create one app password per device instead of giving a client their normal account password.

ZPan can also derive a dedicated address such as `https://dav.files.example.com/` from Public URL. The proxy must internally prefix requests with `/dav` while preserving WebDAV methods, bodies, and headers including `Destination`, `Depth`, `If`, `Overwrite`, and `Lock-Token`.

Cloudflare deployment can configure the transform when its token has **Transform Rules: Edit**. Other deployments configure DNS and proxying manually, then run **Settings → WebDAV → Verify domain**. Keep using `/dav/` until verification succeeds.

## Final verification

Open the production domain in a private window, complete sign-in and sign-out, check the intended registration state, create a share, receive a real email, upload and download a file, and connect one WebDAV client. Every generated URL should use the final HTTPS hostname.
