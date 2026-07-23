---
title: "ZPan 2.6: Pro licensing, white label, quota store, and site governance"
description: "A detailed introduction to ZPan 2.6: Cloud pairing, signed entitlements, white-label branding, quota products, audit logs, announcements, registration, and preview updates."
publishedAt: 2026-05-10
locale: en
tags: [Releases, v2.6]
---

ZPan 2.6 focused on operating and governing an instance. It added licensing, branding, quota, and administrative capabilities while user files remained in the object storage configured by the self-hosted deployment.

## Pro licensing and Cloud pairing

An instance can pair with ZPan Cloud through a QR code and pairing dialog. Entitlements are verified with Ed25519 signatures and refreshed by background work. Features that require an entitlement are enabled according to the current license state.

Cloud pairing manages authorization status; it does not move the self-hosted database, storage credentials, or user files into ZPan Cloud.

## White-label branding

Administrators can replace the logo, favicon, and wordmark and can hide the standard footer. A site can present its own brand without maintaining a source-code fork solely for visual assets.

## Quota store

Version 2.6 introduced redemption codes, monthly traffic quotas, subscription packages, fixed-quota packages, metered pricing, and traffic overage handling. Capacity and traffic can therefore be tied to an order or entitlement rather than existing only as an unexplained number on a user record.

The application synchronizes Cloud traffic usage in the background and enforces monthly traffic allowances on download links.

## Administration and governance

Audit logs cover state-changing administrative actions. Site announcements provide a channel for maintenance or service notices, and registration can be limited to invitations.

The settings and overview dashboards were redesigned. Billing moved into the admin area, with related adjustments to quota units, user quotas, and avatars.

## File preview and upload progress

The preview system gained a Microsoft Office viewer and a music player. Multi-file uploads now appear in a progress queue so each transfer can be followed independently.

## Follow-up fixes

v2.6.1 corrected the checkout redirect flow and the storage-quota display in the sidebar.

v2.6.2 added a Cloud order-details drawer for administrators and fixed the storage-plan table, gift-card masking, checkout dialog, and order-history dialog.

Source releases:

- [v2.6.0](https://github.com/saltbo/zpan/releases/tag/v2.6.0)
- [v2.6.1](https://github.com/saltbo/zpan/releases/tag/v2.6.1)
- [v2.6.2](https://github.com/saltbo/zpan/releases/tag/v2.6.2)
