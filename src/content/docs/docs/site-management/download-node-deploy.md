---
title: Downloaders
description: Deploy, authorize, monitor, and retire ZPan remote-download nodes.
---

Downloaders move long-running network and temporary-disk work out of the ZPan web process. ZPan schedules tasks; an authorized node fetches content, reports progress, and imports completed files into object storage.

![Download node management in the admin console](/images/docs/admin-downloaders.png)

## Deploy a standalone node

The official Docker Compose includes a downloader. A node can also run on another host:

```sh
mkdir zpan-downloader && cd zpan-downloader
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.downloader.yml
ZPAN_SERVER_URL=https://files.example.com docker compose up -d
docker compose logs -f downloader
```

`ZPAN_SERVER_URL` must be the HTTPS main-site address reachable from the node. Save it in the deployment's `.env`. The node token, tasks, temporary downloads, and retained seed cache live in its persistent data volume.

`ZPAN_DOWNLOADER_SEED_CACHE_LIMIT` controls cleanable retained seed data rather than imposing a hard disk quota. Monitor host storage independently and expose the configured TCP/UDP ports when effective BitTorrent connectivity matters.

## Device authorization

On first start, open the verification URL displayed in the node log, sign in as a site administrator, compare the device code and node details, then approve only the node being installed. The code expires quickly; start a new flow rather than reusing an old page.

Each node must have its own identity and data volume. Never bake an authorized token into an image or clone one node's volume to create another.

## Monitor nodes and tasks

Under **Admin Console → Downloaders**, review heartbeat, version, capabilities, load, and the most recent error. A healthy node also needs sufficient temporary disk, memory, outbound network access, and destination quota.

If tasks remain queued, confirm that an authorized node is online, supports the source type, and has capacity. Read both the task error and node log before retrying. Users manage their own tasks; administrators manage node availability and limits.

## Retire or revoke a node

Stop new assignments, finish or cancel active work according to policy, and preserve any required seed data before revocation. Then revoke the node in the admin console and remove its old volume and secrets from the host.

Revocation prevents future polling but does not clean a lost host. Keep downloader versions compatible with the main ZPan release and upgrade them when release notes require it.
