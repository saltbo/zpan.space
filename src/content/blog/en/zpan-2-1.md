---
title: "ZPan 2.1: authentication, registration, and onboarding"
description: "A detailed introduction to ZPan 2.1, including dynamic OAuth, verified email sign-in, registration modes, invite codes, mail drivers, and admin settings."
publishedAt: 2026-04-14
locale: en
tags: [Releases, v2.1]
---

ZPan 2.1 turned authentication and registration from deployment-time assumptions into settings that an administrator can manage.

A personal installation may need only one account. A site serving a family or team needs a clear answer for who may register, how an address is verified, and which identity providers are accepted. Version 2.1 addresses that complete path.

## Dynamic OAuth providers

Administrators can configure OAuth providers without modifying application code. A site can enable the providers it needs and manage their client details and callback configuration.

Email-and-password authentication now supports email verification. Creating an account and proving control of its email address are separate steps.

## Registration policies and invite codes

Registration is configurable instead of being limited to a global on/off switch. Administrators can use invite codes to restrict who is allowed to create an account.

The release also fixes invite-code validation, covering cases where an invalid code could be accepted or a valid one rejected.

## Mail as a dedicated service

Verification requires dependable email delivery, so ZPan 2.1 introduced a mail-service abstraction with SMTP and HTTP API drivers. Deployments can select an existing mail provider without binding the rest of the authentication system to one vendor.

The sign-in and sign-up interfaces were redesigned, and the administration area gained an authentication settings page that gathers these controls in one place.

## Additional fix

Version 2.1 also corrected dark-mode rendering in the sidebar.

After upgrading, test outbound mail, verification links, OAuth callbacks, invite codes, and the selected registration mode before opening registration to users. The source record is available in the [ZPan v2.1.0 release](https://github.com/saltbo/zpan/releases/tag/v2.1.0).
