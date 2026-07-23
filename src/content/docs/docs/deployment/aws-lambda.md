---
title: AWS Lambda
description: Deploy ZPan to AWS Lambda with SAM, Turso, and a Lambda Function URL.
sidebar:
  order: 3
---

AWS Lambda is a good target when your team already operates AWS and wants ZPan to scale without a permanent server. ZPan runs as a Node.js 22 Lambda behind a Function URL. Turso stores application metadata, while user files stay in the S3-compatible bucket you select later.

## Architecture and requirements

The official template deploys one `zpan` Lambda with 512 MB of memory and a 30-second timeout. Its Function URL is public at the network layer; ZPan still performs application authentication and authorization.

Prepare:

- An AWS account and a region that supports [Lambda Function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html).
- A [Turso](https://docs.turso.tech/) database and token. Lambda's local filesystem is not a durable database.
- A fork of [saltbo/zpan](https://github.com/saltbo/zpan).
- An S3-compatible bucket reachable by users' browsers.

## Configure GitHub Secrets

Open **Settings → Secrets and variables → Actions** in your fork and add:

| Secret | Required | Purpose |
| --- | --- | --- |
| `AWS_ACCESS_KEY_ID` | Yes | Deploys the SAM stack |
| `AWS_SECRET_ACCESS_KEY` | Yes | Authenticates the deployment workflow |
| `AWS_REGION` | Yes | Chooses the Lambda region |
| `TURSO_DATABASE_URL` | Yes | Persistent libSQL database URL |
| `TURSO_AUTH_TOKEN` | Yes | Database authentication |
| `BETTER_AUTH_SECRET` | No | Stable session-signing secret; generated when omitted |

The repository's IAM example is intended for quick evaluation and grants broad Lambda, IAM, S3, and CloudFormation access. For production, create a dedicated deployment role and reduce it to the resources in the `zpan` stack and its artifact bucket.

Keep `BETTER_AUTH_SECRET` unchanged between releases. Rotating it signs every user out.

## Deploy with GitHub Actions

Open **Actions → Deploy to AWS Lambda → Run workflow**. Leave the version empty to deploy the latest stable ZPan release.

The workflow runs database migrations, creates an artifact bucket named for the account and region, packages the application with AWS SAM, and deploys the `zpan` CloudFormation stack. On the first run, it writes the resulting Function URL back to `APP_URL` and `BETTER_AUTH_URL`.

Open the URL shown in the workflow summary and check:

```sh
curl https://your-function-url/api/health
```

The first account registered against a new database becomes the administrator.

## Add a production domain

A Lambda Function URL does not directly provide a custom domain. Keep the generated URL, or place the function behind an AWS service that supports your required custom-domain and TLS setup. When the public origin changes, update `BETTER_AUTH_URL`, redeploy, and set the same origin under **Admin Console → Settings → Site identity**.

Also update OAuth callback URLs. Do not use different origins for authentication and Public URL unless you have deliberately configured both.

## Configure S3-compatible storage

The SAM artifact bucket only carries deployment packages; it is not ZPan file storage. Add Amazon S3, R2, B2, Tigris, or another S3-compatible bucket under **Admin Console → Storages**.

Uploads and downloads use presigned URLs, so data moves between the browser and the bucket rather than through Lambda. The bucket endpoint must be browser-reachable and its CORS policy must allow the final ZPan origin. Follow [Object storage](/docs/site-management/storage/) before testing a large upload.

## Schedule maintenance jobs

Lambda instances are not persistent. Configure EventBridge Scheduler, an external cron service, or another private scheduler to send authenticated `POST` requests:

| Interval | Endpoint |
| --- | --- |
| Every 6 hours | `/api/licensing/refresh-cron?secret=YOUR_SECRET` |
| Every 10 minutes | `/api/licensing/traffic-sync-runs?secret=YOUR_SECRET` |

Set the same random value as `REFRESH_CRON_SECRET` in the Lambda environment. Keep it out of source control and scheduler logs.

## Operate and upgrade

Run the workflow again to upgrade. It applies Turso migrations before replacing the Lambda package. Before production updates, back up the database and read the release notes; rolling back code does not reverse a completed migration.

Check CloudWatch logs when `/api/health` fails. If only uploads fail, inspect bucket CORS and the browser network panel first—the file bytes do not pass through Lambda.
