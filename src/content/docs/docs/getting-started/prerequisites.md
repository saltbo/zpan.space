---
title: Before you deploy
description: Prepare the domain, database, secrets, object storage, and platform access required by ZPan.
---

A production ZPan instance touches several systems: an application runtime, a database, object storage, DNS, and optionally email or an identity provider. Prepare their ownership and credentials before following a platform deployment guide.

For a temporary local evaluation, skip this page and use the [Quick start](/docs/getting-started/quick-start/).

## 1. Decide the final public address

Prepare a hostname such as `drive.example.com` and make sure you can manage its DNS. Production authentication, share links, OAuth callbacks, image URLs, and WebDAV discovery all depend on a stable public origin.

Use HTTPS in production. Decide the final hostname before configuring OAuth providers or bucket CORS; changing it later means updating every allowlist and callback that contains the old origin.

## 2. Prepare the runtime and database

Each supported runtime uses the same ZPan application but not the same persistence model.

| Platform | Prepare before deployment | Database |
| --- | --- | --- |
| Cloudflare Workers | Cloudflare account, Workers/D1 access, API token, and a GitHub fork | D1 |
| Docker | Linux host or NAS, Docker Engine, Compose, persistent volumes, and a reverse proxy for production | Local SQLite by default; Turso optional |
| AWS Lambda | AWS account, deployment IAM credentials, region, GitHub fork, and Turso account | Turso/libSQL |
| Vercel | Vercel account and project access, GitHub fork, and Turso account | Turso/libSQL |
| Netlify | Netlify account and site access, GitHub fork, and Turso account | Turso/libSQL |
| Azure Functions | Azure subscription, service principal, resource group access, GitHub fork, and Turso account | Turso/libSQL |
| Google Cloud Run | GCP project with billing, deployment service account, required IAM roles, GitHub fork, and Turso account | Turso/libSQL |

Serverless local filesystems are temporary and must not be used as the database. Docker is the only listed production path that can keep SQLite in a local persistent volume.

## 3. Generate and retain the authentication secret

`BETTER_AUTH_SECRET` signs authentication data. Generate a high-entropy value, store it in the target platform's secret manager, and keep a recoverable copy outside the deployment pipeline.

```sh
openssl rand -base64 32
```

Do not regenerate it on every deployment. Rotating it invalidates existing sessions and can disrupt authentication flows.

Some official deployment workflows can create this value on the first run. If you use that behavior, retrieve and back up the generated value from the platform afterward.

## 4. Prepare S3-compatible object storage

Create a dedicated bucket and credentials for ZPan. You will configure them in the administration console after the application is deployed; they normally do not belong in GitHub Actions secrets.

Record the following values:

- S3-compatible endpoint reachable from users' browsers.
- Bucket name and region.
- Access key and secret key with the required object permissions.
- Whether the provider requires path-style requests.
- Optional public or custom host used to serve objects.

ZPan supports S3-compatible APIs. Google Cloud Storage is not a direct substitute unless an S3-compatible interface is provided.

## 5. Plan browser CORS

Direct uploads mean the browser sends requests from the ZPan origin to the storage endpoint. The bucket must allow the final site origin and the methods and headers used by presigned uploads.

Apply CORS only after the final domain is known. When storage is added in the administration console, use ZPan's connection test and generated CORS guidance to verify the whole create, upload, and cleanup path.

## 6. Decide which optional services are needed

The basic file path does not require every integration. Prepare these only when needed:

- An SMTP or supported email service for verification, password reset, and invitations.
- OAuth or OIDC application credentials for third-party login.
- A separate WebDAV hostname when you want dedicated-domain access.
- One or more reachable downloader hosts for remote-download tasks.
- A ZPan Cloud account when activating Pro or Business features.

Enable optional services after sign-in, storage, upload, and download work. This keeps failures isolated to one boundary at a time.

## Ready to continue

You are ready for a production guide when you know the final HTTPS origin, control the deployment platform and DNS, have durable database credentials, have retained the authentication secret, and have an S3-compatible bucket that users' browsers can reach.

Select the exact platform under **Deploy ZPan** and follow that guide from start to finish.
