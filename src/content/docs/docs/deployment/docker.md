---
title: Docker
description: Run ZPan with SQLite or Turso behind your own HTTPS reverse proxy.
sidebar:
  order: 2
---

Docker is the most direct self-hosted option when you already operate a server, NAS, or homelab. ZPan ships as one application image and uses SQLite by default. The downloader is a separate optional service.

## Prepare the host

Use a Linux host with Docker Engine and the Compose plugin. Production also needs a domain name and an HTTPS reverse proxy such as Caddy, Traefik, or Nginx.

Create a working directory and download the official Compose file:

```sh
mkdir zpan && cd zpan
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.yml
```

Create a `.env` file containing a stable secret and the final public URL:

```dotenv
BETTER_AUTH_SECRET=replace-with-output-from-openssl
BETTER_AUTH_URL=https://files.example.com
```

Generate the secret with `openssl rand -base64 32`. Do not commit `.env`, and keep the value during upgrades.

## Start ZPan

```sh
docker compose up -d
docker compose ps
docker compose logs -f zpan
```

The application listens on port `8222`. Open it directly for the first local check, then complete production setup through HTTPS. The first registered account becomes the administrator.

The Compose volume `zpan-data` contains `/data/zpan.db`. The volume—not the container—is the durable database. Removing it removes users, metadata, shares, and settings, although objects may still remain in S3.

## Add HTTPS

A minimal Caddy configuration is:

```txt
files.example.com {
  reverse_proxy 127.0.0.1:8222
}
```

After HTTPS works, set the same origin under **Admin Console → Settings → Site identity**. Preserve the original `Host`, `X-Forwarded-Proto`, and WebSocket-related headers when using another proxy.

## Configure storage

Add your bucket under **Admin Console → Storages**. Because uploads go directly from the user's browser to S3, the endpoint must be reachable from that browser and the bucket must allow the final ZPan origin through CORS.

For an entirely local stack, use the provided RustFS example:

```sh
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.rustfs.yml
docker compose -f docker-compose.rustfs.yml up -d
```

The bundled credentials are development defaults. Change them before exposing RustFS to a network.

## SQLite or Turso

Keep SQLite for one ZPan container. Do not run multiple replicas against the same SQLite volume over a network filesystem.

Use Turso when the database must be remote or shared:

```yaml
environment:
  TURSO_DATABASE_URL: libsql://your-db.turso.io
  TURSO_AUTH_TOKEN: your-token
```

When `TURSO_DATABASE_URL` is present, `DATABASE_URL` is ignored. Migrations run automatically at container startup in both modes.

## Downloader

The official Compose file includes the optional downloader. On first start, inspect its logs:

```sh
docker compose logs -f downloader
```

Open the displayed device-authorization URL as an administrator and approve the node. Its token, active downloads, and retained seed files live in the `downloader-data` volume.

## Upgrade and back up

Back up the database before upgrading:

```sh
docker compose stop zpan
docker run --rm -v zpan_zpan-data:/data -v "$PWD":/backup alpine \
  cp /data/zpan.db /backup/zpan.db.backup
docker compose start zpan
```

Then update:

```sh
docker compose pull
docker compose up -d
docker compose logs --tail=100 zpan
```

For predictable production changes, pin a release tag instead of `latest`.

## Troubleshooting

- **The container exits immediately:** confirm `BETTER_AUTH_SECRET` is set.
- **Uploads fail but admin pages work:** check the browser console and bucket CORS; the failure is usually between the browser and S3.
- **OAuth returns to the wrong address:** make `BETTER_AUTH_URL`, Public URL, the proxy hostname, and provider callback agree.
- **Data disappeared after recreation:** verify the named volume still exists and is mounted at `/data`.
