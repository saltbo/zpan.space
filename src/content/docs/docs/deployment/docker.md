---
title: Docker
description: Run ZPan as a container with SQLite or Turso.
---

ZPan publishes production images to `ghcr.io/saltbo/zpan`. The default configuration uses an embedded SQLite database.

## Start with Compose

```sh
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.yml
docker compose up -d
```

Open `http://localhost:8222`. The first registered user receives the administrator role.

## Persist your data

The provided Compose file mounts a named volume for the database and runtime state. Keep this volume when replacing or upgrading the container.

For a custom Compose setup, configure at least:

```yaml
services:
  zpan:
    image: ghcr.io/saltbo/zpan:latest
    ports:
      - "8222:8222"
    environment:
      PORT: 8222
      BETTER_AUTH_SECRET: your-random-secret
      BETTER_AUTH_URL: https://files.example.com
      DATABASE_URL: /data/zpan.db
    volumes:
      - zpan-data:/data
```

Generate `BETTER_AUTH_SECRET` with `openssl rand -base64 32`. Do not commit it to source control.

## Upgrade

Pull the latest production image and recreate the service:

```sh
docker compose pull
docker compose up -d
```

Database migrations run automatically when the container starts.
