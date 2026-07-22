---
title: "ZPan 2.6: controls for running a file service"
description: "Licensing, branding, audit, announcements, and quota entitlements give operators the controls a public ZPan instance needs."
publishedAt: 2026-05-10
locale: en
tags: [Releases, v2.6]
---

A personal installation can rely on the operator's memory. Once family, a team, or public users depend on it, registration policy, exceptional quota, branding changes, and administrative actions need explicit records.

ZPan 2.6 is the release that made an instance governable. It established the Community, Pro, and Business entitlement model and added branding, audit, announcements, quotas, and Cloud-managed licensing.

## Community remains a complete self-hosted product

Community includes the everyday file manager, image hosting, sharing, WebDAV, personal space, and team space. The edition boundary follows operational complexity rather than withholding the basic file experience.

Individuals rarely need open registration, white label, comprehensive audit, or a quota storefront. Public operators cannot responsibly run without those controls. Pro and Business fund continued product work while the core remains open source.

## Pro is for deliberate operations

Pro adds site identity and branding, open-registration controls, audit logs, and higher resource limits. A coherent brand involves more than a logo: domain, Public URL, mail sender, OAuth callback, and share pages need to agree. Managing this in the product avoids an unmaintainable source-code fork.

Audit logs answer who changed a user, team, setting, storage backend, or protected resource and when. They provide the first evidence trail for investigating mistakes and access problems.

## Business adds a commercial entitlement model

Business builds quota products, gift cards, credits, announcements, and operational capabilities on top of Pro. Storage and traffic become entitlements with sources, periods, grants, and consumption instead of one unexplained number on a user record.

Personal and team spaces can receive different entitlements. Operators can explain how total capacity was calculated, and users can see what they received.

## Cloud licensing does not move self-hosted data

ZPan Cloud sells and binds Pro or Business licenses and refreshes signed entitlement certificates. It does not receive the files in a self-hosted bucket. The application, database, and S3 credentials remain in the operator's chosen infrastructure.

After upgrading, verify the current edition on About, then review Public URL, registration, default quotas, and email before opening the site to users. Follow the [administrator guide](/docs/site-management/overview/) and [site settings guide](/docs/site-management/general/site-settings/) for the recommended order.
