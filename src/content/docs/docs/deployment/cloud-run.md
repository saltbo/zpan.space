---
title: Google Cloud Run
description: Deploy ZPan as a Cloud Run container with Turso, Secret Manager, and S3-compatible storage.
sidebar:
  order: 7
---

Google Cloud Run is a strong choice when your organization already operates containers on Google Cloud. ZPan runs from its official Dockerfile in an autoscaling Cloud Run service. Turso stores metadata, Secret Manager protects credentials, and user files stay in an external S3-compatible bucket.

## Architecture and prerequisites

The supplied service manifest runs ZPan on port `8222` with 1 CPU, 512 MiB memory, concurrency `80`, and a 300-second request timeout. It may scale to zero and up to ten instances. Because instances are ephemeral and can run concurrently, use Turso instead of local SQLite.

Prepare:

- A Google Cloud project with billing and Cloud Run enabled.
- A Turso database and token.
- A fork of [saltbo/zpan](https://github.com/saltbo/zpan).
- An S3-compatible bucket. Google Cloud Storage is not currently a ZPan storage adapter.

## Create the deployment service account

The workflow builds an image, writes secrets, deploys Cloud Run, and allows public invocation. Its documented quick-start roles include Cloud Run Admin, Cloud Build Editor, Secret Manager Admin, Service Account User, and Storage Admin.

These roles are intentionally broad. For production, separate build and runtime identities, grant Secret Manager access only to the ZPan secrets, and scope deployment permissions to the project resources used by this service. Google recommends using [Secret Manager for Cloud Run secrets](https://cloud.google.com/run/docs/configuring/services/secrets).

Create a JSON key for the deployment identity only if your GitHub setup does not use workload identity federation.

## Configure GitHub Secrets

Add:

| Secret | Required | Purpose |
| --- | --- | --- |
| `GCP_SERVICE_ACCOUNT_KEY` | Yes | Deployment service-account JSON |
| `GCP_PROJECT_ID` | Yes | Selects the Google Cloud project |
| `TURSO_DATABASE_URL` | Yes | Persistent libSQL database URL |
| `TURSO_AUTH_TOKEN` | Yes | Database authentication |
| `BETTER_AUTH_SECRET` | No | Stable session-signing secret |
| `BETTER_AUTH_URL` | No | Final public HTTPS origin |

The workflow generates and preserves `BETTER_AUTH_SECRET` when omitted.

## Deploy

Open **Actions → Deploy to Google Cloud Run → Run workflow**. Choose a region close to the Turso database and primary users. Leave version empty to deploy the latest stable release.

The workflow enables the required Google APIs, applies Turso migrations, stores secrets, builds the container, deploys `deploy/cloud-run/service.yaml`, grants public invoker access, and records the generated service URL.

Verify:

```sh
curl https://your-service.run.app/api/health
```

Register the first administrator only after confirming the service points to the intended Turso database.

## Add a custom domain

Expose Cloud Run through a supported Google Cloud custom-domain option, then set `BETTER_AUTH_URL` to its exact HTTPS origin and deploy a new revision. Set the same origin under **Admin Console → Settings → Site identity** and update OAuth callback URLs.

Keep the generated `run.app` URL out of user-facing links after the custom domain is live.

## Configure S3-compatible storage

Add your bucket under **Admin Console → Storages**. The Cloud Run container authorizes operations, but file bytes move directly between browser and S3 through presigned URLs. Configure the bucket endpoint and CORS for the final origin; see [Object storage](/docs/site-management/storage/).

Cloud Run's container filesystem and Google Cloud Storage are not implicit ZPan file storage.

## Schedule maintenance jobs

Set `REFRESH_CRON_SECRET`, then configure Cloud Scheduler to send authenticated `POST` requests:

| Interval | Endpoint |
| --- | --- |
| Every 6 hours | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| Every 10 minutes | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

Google documents [invoking Cloud Run on a schedule](https://cloud.google.com/run/docs/triggering/using-scheduler). ZPan's main service is public, so protect these application endpoints with the random query secret and keep scheduler configuration private.

## Upgrade and troubleshoot

Run the workflow again to create a new Cloud Run revision. Back up Turso before migrations. Cloud Run can shift traffic between revisions, but an earlier container revision cannot reverse a database migration.

- If a revision never becomes ready, inspect its startup logs and Secret Manager permissions.
- If API latency is high, place Cloud Run and Turso closer together before adding more compute.
- If only file transfers fail, inspect the browser-to-S3 request and bucket CORS.
