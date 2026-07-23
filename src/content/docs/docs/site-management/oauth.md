---
title: Login and email
description: Configure password login, OAuth, custom OIDC, SMTP, and email verification in ZPan.
sidebar:
  order: 3
---

ZPan supports email or username with password, built-in OAuth providers, and custom OpenID Connect. Configure reliable email before requiring address verification or depending on password recovery.

![OAuth and OIDC provider management](/images/docs/admin-oauth.png)

## Before adding a provider

Set the final Public URL and `BETTER_AUTH_URL` first. Keep at least one proven administrator login method available while testing another provider.

Built-in OAuth providers use a callback shaped like:

```text
https://files.example.com/api/auth/callback/<provider-id>
```

Custom OIDC uses:

```text
https://files.example.com/api/auth/oauth2/callback/<provider-id>
```

Always copy the exact callback shown in the admin console. Scheme, hostname, port, path, and provider ID must match the upstream application character for character.

## Built-in OAuth

Create a confidential web application at the identity provider, add the displayed callback, then save its Client ID and Client Secret under **Admin Console → OAuth**. Use a separate upstream application and secret for each environment.

Test first sign-in, repeat sign-in, sign-out, and the behavior of a disabled upstream account with a new test user. Remove unused providers and rotate a secret immediately if it appears in source control, logs, or chat.

## Custom OIDC

Custom OIDC works with services such as Keycloak, Authentik, Authelia, Okta, and enterprise identity providers. Configure a stable provider ID, display name, issuer or discovery URL, Client ID, Client Secret, and scopes.

Scopes require `openid` and normally include `profile` and `email`. The issuer must match the discovery document and token `iss` claim. ZPan needs a stable subject identifier and a usable email claim to create and reconnect an account.

Discovery failures commonly mean the issuer is wrong or cannot be reached from the ZPan runtime. Token validation failures also occur when server time is wrong or a proxy changes the public scheme.

## Email service

Under **Admin Console → Settings → Email**, configure the provider, SMTP host and port where applicable, credentials, sender name, and sender address. Use a credential created specifically for ZPan.

For SMTP, follow the provider's documented TLS mode: port 465 commonly uses implicit TLS and 587 commonly uses STARTTLS. The sender must be authorized, and its domain should have valid SPF, DKIM, and preferably DMARC records.

Send test messages to more than one mailbox provider. An accepted SMTP request proves only that the provider received the message, not that it reached the inbox. After changing the public domain, send a new invitation or password-reset message and inspect its link.

## Troubleshooting order

1. Compare the complete callback with the value registered upstream.
2. Confirm Public URL, `BETTER_AUTH_URL`, and the browser origin use the same HTTPS hostname.
3. Verify the Client Secret, issuer, and required OIDC claims.
4. Confirm the ZPan runtime can reach discovery, token, and email endpoints.
5. Inspect provider activity and ZPan logs at the same UTC time.

Do not disable the last working administrator login until the replacement has been tested from a signed-out private window.
