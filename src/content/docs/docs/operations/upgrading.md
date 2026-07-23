---
title: "Upgrade ZPan"
description: Back up, upgrade, verify, and if necessary roll back ZPan without mixing incompatible application versions.
---

Upgrade deliberately: read the release notes, back up the database and object storage, and verify the current installation before changing it.

## Upgrade procedure

1. Record the current ZPan version, deployment configuration, and image or artifact identifier.
2. Create a database backup and confirm that object-storage protection is current.
3. Review release notes for migrations, renamed variables, runtime requirements, and breaking changes.
4. Test the target version against a restored copy when the instance is important.
5. Put the site into a maintenance window if the release changes the database.
6. Deploy the exact target version and allow its supported migration process to finish.
7. Check `/api/health`, logs, sign-in, admin access, uploads, downloads, shares, WebDAV, email, and scheduled jobs.

For Docker, pin an image tag rather than relying on `latest`, pull it, and recreate the service while retaining the database volume. For serverless platforms, deploy the tagged source or release artifact through the documented workflow.

Do not run old and new application versions against the same database unless the release explicitly permits rolling upgrades. If verification fails, stop writes first. Restore the previous application and database together; rolling back only the binary after an incompatible migration may make the situation worse.
