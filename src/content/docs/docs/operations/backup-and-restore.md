---
title: "Backup and restore"
description: Back up ZPan metadata and object storage together, then verify a complete recovery on a separate instance.
---

Back up ZPan as two coordinated data sets: the database contains accounts, permissions, file metadata, shares, settings, and object keys; object storage contains the file bytes. A usable recovery needs both.

## What to back up

- **SQLite deployments:** copy `zpan.db` using SQLite's online backup command, or stop ZPan before copying the file. Do not copy a live database with a generic file-copy command.
- **Turso/libSQL:** use the provider's snapshot or database dump facility and record the database URL separately.
- **Cloudflare:** retain D1 backups and the buckets used by ZPan.
- **Object storage:** enable bucket versioning or provider snapshots where available. Export the ZPan storage configuration, but store secret keys in a password manager rather than in the backup archive.
- Preserve `BETTER_AUTH_SECRET`, the public URL, deployment configuration, license information, and external OAuth/OIDC client settings.

Choose a retention period and test restores on a separate hostname. A backup that has never been restored is only an assumption.

## Restore safely

1. Stop writes to the old instance.
2. Restore the database and buckets from the same recovery point.
3. Deploy the same ZPan version and restore its secrets.
4. Start ZPan, then check `/api/health`.
5. Verify sign-in, folder listings, a direct upload and download, a share link, and scheduled tasks.
6. Upgrade only after the restored version is working.

Do not point two active ZPan instances at one database during recovery. If only the database was restored, metadata may reference missing objects; if only a bucket was restored, unreferenced objects will not automatically reappear in the file list.
