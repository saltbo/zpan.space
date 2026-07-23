---
title: Azure Functions
description: Deploy ZPan to Azure Functions with Bicep, Turso, and external S3-compatible storage.
sidebar:
  order: 6
---

Azure Functions fits organizations that already manage applications, identity, and monitoring in Azure. ZPan runs on the Node.js 22 Functions v4 model in a Consumption plan. Turso stores application metadata and an external S3-compatible service stores user files.

## Understand the resources

The official Bicep template creates a resource group deployment containing a Consumption plan, Function App, and Azure Storage Account. That Storage Account is required by the Functions runtime; it is not the bucket used for ZPan files.

Azure Blob Storage does not expose the S3-compatible API ZPan expects. Configure Amazon S3, R2, B2, Tigris, RustFS, or another compatible service after deployment.

Prepare a Turso database and fork [saltbo/zpan](https://github.com/saltbo/zpan).

## Create deployment credentials

Create a service principal for GitHub Actions. The fastest command is:

```sh
az ad sp create-for-rbac \
  --name zpan-github-actions \
  --role Contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID \
  --sdk-auth
```

Save the complete JSON output as `AZURE_CREDENTIALS`. Subscription-wide Contributor is convenient for evaluation but broader than most production deployments need. Prefer a dedicated resource group and scope the principal to that group once it exists.

## Configure GitHub Secrets

Add:

| Secret | Required | Purpose |
| --- | --- | --- |
| `AZURE_CREDENTIALS` | Yes | Service-principal JSON for Azure login |
| `TURSO_DATABASE_URL` | Yes | Persistent libSQL database URL |
| `TURSO_AUTH_TOKEN` | Yes | Database authentication |
| `BETTER_AUTH_SECRET` | No | Stable session-signing secret |

Keep `BETTER_AUTH_SECRET` unchanged. The workflow generates and persists it when omitted.

## Deploy

Open **Actions → Deploy to Azure Functions → Run workflow**. Choose the resource-group name and Azure region; leave version empty for the latest stable release.

The workflow creates the resource group, applies `deploy/azure-functions/main.bicep`, stores the application settings, runs Turso migrations, builds ZPan, and publishes the Function App. It then sets `APP_URL` and `BETTER_AUTH_URL` from the generated Azure hostname.

Verify the URL shown in the workflow summary:

```sh
curl https://your-function-app.azurewebsites.net/api/health
```

The first account registered in the new database becomes the administrator.

## Add a custom domain

Attach the hostname in the Function App's **Custom domains** settings. After TLS is active, update the Function App settings:

```dotenv
BETTER_AUTH_URL=https://files.example.com
TRUSTED_ORIGINS=https://files.example.com
REFRESH_CRON_SECRET=replace-with-a-random-secret
```

Restart or redeploy the app, set the same origin under **Admin Console → Settings → Site identity**, and update OAuth callbacks.

## Configure file storage

Add an S3-compatible bucket under **Admin Console → Storages**. ZPan issues presigned URLs, so uploads travel directly from users' browsers to that endpoint. Allow the final Azure or custom-domain origin in the bucket's CORS policy. See [Object storage](/docs/site-management/storage/).

Do not put user files in the Functions runtime Storage Account unless you are separately exposing it through a supported S3-compatible gateway.

## Schedule maintenance jobs

Use an Azure Timer Trigger, Logic App, or another private scheduler to send `POST` requests:

| Interval | Endpoint |
| --- | --- |
| Every 6 hours | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| Every 10 minutes | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

Azure documents [Timer Triggers](https://learn.microsoft.com/azure/azure-functions/functions-bindings-timer) for scheduled Functions. Whichever scheduler you choose, its secret must equal `REFRESH_CRON_SECRET` and must not be committed.

## Upgrade and troubleshoot

Rerun the workflow for upgrades. Back up Turso before migrations and retain the previous function package for rollback.

- A failed infrastructure step usually appears in the resource group's deployment history.
- A healthy UI with failing API calls usually means a missing app setting or Turso connectivity issue.
- Upload CORS errors are between the browser and S3, not Azure Storage or the Function App.
