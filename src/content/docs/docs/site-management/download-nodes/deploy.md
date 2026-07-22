---
title: Deploy a download node
description: Deploy an independent downloader and connect it to ZPan.
---

The downloader moves long-running network and temporary-disk work out of the ZPan application. ZPan schedules tasks; the node fetches data, reports progress, and imports results into object storage.

The official Docker Compose includes a downloader. Run `docker compose logs -f downloader`, open the device-authorization URL as an administrator, and approve it. The token, task state, downloads, and retained seed cache live in the `downloader-data` volume.

`ZPAN_DOWNLOADER_SEED_CACHE_LIMIT` controls cleanable retained seed data, not a hard disk quota. Monitor host capacity and expose the configured TCP/UDP listen port for effective BitTorrent connectivity.

## Run a standalone node

Place a downloader on another host with the standalone Compose file:

```sh
mkdir zpan-downloader && cd zpan-downloader
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.downloader.yml
ZPAN_SERVER_URL=https://files.example.com docker compose up -d
docker compose logs -f downloader
```

`ZPAN_SERVER_URL` must be the HTTPS main-site address reachable from the node. Store it in the directory's `.env` for later restarts; keep the authorized node token inside its volume.

Review heartbeat, capability, load, and last error under **Admin Console → Downloaders**, and revoke nodes that are permanently retired.
