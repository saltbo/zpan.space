---
title: "Why S3-native means more than another storage driver"
description: "Presigned transfer, metadata boundaries, backup, and portability explain how S3 shapes ZPan's product architecture."
publishedAt: 2026-07-15
locale: en
tags: [Engineering, S3]
---

For many products, “S3 support” means copying local files into a bucket for backup. In ZPan, S3 is the file data plane. That distinction determines the transfer path, database responsibility, deployment cost, and migration model.

The database stores users, spaces, directory metadata, shares, quotas, and jobs. The bucket stores file bytes. For an upload, ZPan verifies permission, creates a session, and returns presigned instructions. The browser transfers directly to S3 and then completes the object with ZPan.

Application bandwidth therefore does not scale with file size. Object storage handles transfer and multipart behavior while the control plane remains focused.

## Two parts of one consistent system

S3-native does not mean operators should rename or delete objects directly in the provider console. Object keys are implementation details; names, folders, permissions, and trash state live in the database. Out-of-band bucket changes break that relationship.

Backups need both sides. Database backups protect structure and authorization; bucket versioning or replication protects content. Neither alone is a complete site recovery.

## CORS belongs to the data path

Direct browser uploads require the bucket to allow the production ZPan origin to send `PUT`, `POST`, `GET`, and `HEAD` and read `ETag`. This is not an optional optimization.

The common failure is an admin console that works while uploads fail: browser preflight is rejected, or the configured endpoint only resolves inside Docker. ZPan's storage test uploads a temporary object from the current browser and cleans it up, validating signing, browser networking, CORS, and bucket permission together.

## Compatibility still has edges

AWS S3, R2, B2, Tigris, MinIO, and RustFS share core APIs but differ in region, endpoint, path style, public delivery, and some multipart behavior. Templates reduce setup work while options such as Force Path Style preserve necessary differences.

Portability comes from knowing each boundary, not from pretending migration is automatic. The application runtime can change, SQLite-family databases can move deliberately, bucket objects can be copied, and a stable public domain can remain in front. S3-native means object storage owns files while ZPan makes them manageable, shareable, and operable.
