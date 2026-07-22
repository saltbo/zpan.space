---
title: Quick start
description: Run ZPan and a local S3-compatible store with Docker, then verify the complete file path.
---

This guide runs ZPan, RustFS, and a downloader on one machine with Docker Compose. It is intended for local evaluation: you can create the first administrator, connect storage, and upload a real file without first opening cloud accounts.

For a public or long-running instance, use the dedicated guide under **Deploy ZPan** instead of exposing this example unchanged.

## Requirements

Install Docker Engine or Docker Desktop with the Compose plugin. The following local ports must be available:

| Address | Purpose |
| --- | --- |
| `http://localhost:8222` | ZPan |
| `http://localhost:9000` | S3-compatible API |
| `http://localhost:9001` | RustFS console |

## 1. Download the Compose file

Create an empty working directory and download the official ZPan + RustFS Compose file:

```sh
mkdir zpan-quickstart
cd zpan-quickstart
curl -o docker-compose.yml https://raw.githubusercontent.com/saltbo/zpan/main/deploy/docker-compose.rustfs.yml
```

Generate an authentication secret:

```sh
openssl rand -base64 32
```

Create a `.env` file in this directory and store the generated value:

```dotenv
BETTER_AUTH_SECRET=replace-with-the-generated-value
BETTER_AUTH_URL=http://localhost:8222
```

Keep this file for future restarts. Changing the secret signs users out.

## 2. Start the services

```sh
docker compose up -d
docker compose ps
```

Wait until the `zpan` service is healthy, then open `http://localhost:8222`.

If startup fails, inspect the application log:

```sh
docker compose logs -f zpan
```

## 3. Create the first administrator

Register the first account. On a new database, ZPan assigns that account the administrator role. Open the account menu and enter **Admin Console** to confirm that the role was created.

This rule is safe for a local environment. On a public deployment, register the administrator immediately and then configure the intended registration policy.

## 4. Create a local bucket

Open the RustFS console at `http://localhost:9001` and sign in with the credentials included by the local Compose example:

```text
Username: admin
Password: admin123
```

Create a bucket named `zpan`. These credentials are deliberately simple for local evaluation and must not be used for an internet-facing service.

## 5. Add the storage to ZPan

Open **Admin Console → Object storage**, add a storage backend, and enter:

| Field | Value |
| --- | --- |
| Endpoint | `http://localhost:9000` |
| Bucket | `zpan` |
| Region | `us-east-1` |
| Access key | `admin` |
| Secret key | `admin123` |

Use the storage connection test. If the browser phase reports a CORS failure, apply the CORS configuration shown by ZPan to the `zpan` bucket and run the test again.

Do not replace the endpoint with the Docker service name `rustfs`. Presigned uploads are opened by your browser, so the endpoint must be reachable from the browser itself.

## 6. Verify the complete path

Return to **Files** and complete one real workflow:

1. Create a folder.
2. Upload a small file.
3. Refresh the page and download the file.
4. Move it to trash and restore it.
5. Create a share and open it in a private browser window.

When all five steps work, authentication, database persistence, presigned upload, object storage, download, and sharing are connected correctly.

## Stop or remove the local environment

Stop the containers while retaining data:

```sh
docker compose down
```

Start them again with `docker compose up -d`. The named volumes retain the ZPan database, RustFS objects, and downloader state.

After evaluating the product, choose a production target under **Deploy ZPan**. Do not expose the local RustFS credentials or plain-HTTP endpoints to the internet.
