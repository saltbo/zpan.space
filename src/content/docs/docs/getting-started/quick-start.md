---
title: Quick start
description: Choose Cloudflare Workers or Docker and deploy your first ZPan instance.
---

ZPan supports several runtimes. For most personal deployments, start with **Cloudflare Workers**. Choose **Docker** when you already operate a server or want everything on your own network.

## Cloudflare Workers

1. [Fork the ZPan repository](https://github.com/saltbo/zpan/fork).
2. Open **Settings → Secrets and variables → Actions** in your fork.
3. Add `CLOUDFLARE_ACCOUNT_ID`.
4. Add a `CLOUDFLARE_API_TOKEN` with Workers Scripts, D1, and R2 edit permissions.
5. Open **Actions → Deploy to Cloudflare Workers** and run the workflow.

The workflow creates the required Worker and database resources. Once it finishes, open the deployment URL and register the first user. The first account becomes the administrator.

## Docker

Download the maintained Compose file and start it:

```sh
curl -O https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.yml
docker compose up -d
```

Then open `http://localhost:8222` and register the first account.

## Connect storage

After signing in as an administrator:

1. Open **Admin → Storage**.
2. Add your S3 endpoint, bucket, region, access key, and secret key.
3. Test the connection and save it.
4. Upload a small file from the Files page.

:::caution[The endpoint must be browser-accessible]
Uploads go directly from the user's browser to S3. A Docker-only hostname such as `minio:9000` will not work in a browser; use a public hostname or `localhost` during local development.
:::

## Next steps

- [Set up image hosting](/docs/guides/image-hosting/)
- [Create your first share](/docs/guides/file-sharing/)
- [Review Docker deployment](/docs/deployment/docker/)
