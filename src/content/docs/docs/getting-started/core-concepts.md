---
title: Core concepts
description: Understand the storage, account, and feature terms used throughout the ZPan documentation.
---

This page does not contain deployment steps. It defines terms that appear throughout the documentation and is a useful starting point if object storage is new to you.

## Storage terms

### Object storage

Object storage is a service for storing files over a network. Images, videos, archives, and other content are stored as objects and uploaded or downloaded through HTTP APIs.

Unlike a disk filesystem, object storage usually has no physical folders. Applications display folder-like structures by interpreting object names. This model is suited to large file collections and capacity that grows on demand.

### AWS S3

Amazon Simple Storage Service, or AWS S3, is the object-storage product operated by Amazon Web Services. It established concepts such as buckets, objects, keys, and regions together with APIs for operating on them.

Only the explicit term **AWS S3** refers specifically to Amazon's service.

### S3 API

The S3 API defines how software uploads, downloads, lists, and deletes objects, signs requests, and creates presigned URLs.

What people call the “S3 protocol” usually means these API conventions. It is not a general network protocol standardized independently like HTTP.

### S3-compatible object storage

Other object-storage products can implement the commonly used S3 APIs so software written for AWS S3 can connect to them in a similar way. These products are called S3-compatible object storage.

Cloudflare R2, Backblaze B2, Tigris, MinIO, and RustFS are examples. They are not AWS S3; they provide compatible interfaces.

Compatibility does not guarantee identical behavior for every API and edge case. ZPan depends primarily on upload, download, delete, listing, multipart upload, presigned URLs, and browser CORS.

### S3 as a general term

In everyday conversation, “use S3” often means using any S3-compatible object store, not necessarily AWS.

Unless a page explicitly says AWS S3, “S3” in the ZPan documentation generally refers to the wider compatible ecosystem. Connecting ZPan to R2 or MinIO does not send files through or store them on Amazon.

### Bucket

A bucket is a container for objects. For example, you might create a bucket named `zpan-files` specifically for ZPan. Naming and region rules depend on the storage provider.

### Object

An object is one stored piece of content. It usually consists of the file bytes, an object key, and a small amount of metadata.

### Object key

An object key is the unique name of an object inside a bucket, for example:

```text
users/123/images/cover.png
```

The `/` characters are part of the name. Object-storage tools use these prefixes to present folders, but they do not necessarily represent physical disk directories.

### Endpoint

An endpoint is the address of the object-storage API. ZPan sends storage requests to it, and browsers may open presigned upload or download URLs based on it.

AWS S3, Cloudflare R2, and a self-hosted MinIO server use different endpoint formats. For direct browser transfers, users' browsers must be able to reach this address.

### Region

A region identifies where a bucket is located, such as `us-east-1`. Services such as AWS S3 use it to select a data center and sign requests.

Some compatible services have no real multi-region model but still require a fixed region value for S3 API compatibility.

### Access key and secret key

These form a credential pair for object storage:

- The **access key** identifies the caller, similar to a username.
- The **secret key** proves authorization, similar to a password.

Keep the secret key private. It is not a user login password and must not appear in public documentation, screenshots, or frontend code.

### Presigned URL

A presigned URL is a time-limited object-storage address containing temporary authorization. A browser holding that URL can upload or download one specified object without knowing the secret key.

ZPan uses presigned URLs to transfer files directly between browsers and object storage whenever possible.

### CORS

CORS is the browser's cross-origin access policy. The ZPan page and storage endpoint usually use different domains, so the bucket must allow the ZPan origin to upload, download, and read required response headers.

When CORS is wrong, the ZPan server may reach the bucket successfully while uploads still fail in users' browsers.

### Path-style

Path-style is an S3 URL format that places the bucket name in the URL path. Some MinIO, RustFS, and other self-hosted services require it; most public cloud providers work with the default format.

## ZPan terms

### Instance

One deployed ZPan site using its own database is an instance. It has its own domain, users, teams, settings, and storage configuration.

### Database

The database stores accounts, sessions, filenames, directory relationships, object keys, shares, quotas, and site settings. File bytes live in object storage, not in the ZPan database.

### Storage backend

A bucket, endpoint, region, and credential set configured by an administrator form one storage backend in ZPan. An instance can have multiple storage backends.

### Public URL

The Public URL is the complete public address users use to open ZPan, such as `https://drive.example.com`. Share links, authentication callbacks, WebDAV addresses, and some public assets are based on it.

### Site administrator

The site administrator operates the entire ZPan instance. They configure storage, login methods, site settings, and downloaders and manage users, teams, announcements, and licensing.

The first account registered against a new database becomes the site administrator.

### Personal space

A personal space is a user's own file area. Its files, directories, and quota belong to that user.

### Team space

A team space is a separate file area owned by a team. It has its own members, roles, files, and quota; it is not an ordinary folder inside one user's personal space.

### Team role

A team role decides whether a member can view, modify, or administer a team space. A team owner administers that team but is not automatically the site administrator.

## Feature terms

### File sharing

File sharing makes a file or directory available to people outside its space. A share can use a password, expiration, and download limit without adding the visitor to a team.

### Image hosting

Image hosting is a service specifically for uploading and publicly delivering images. ZPan image hosting uses the configured object storage and adds public image URLs, path rules, gallery management, and API keys.

PicGo, PicList, uPic, ShareX, Flameshot, and similar tools can upload to ZPan and use the returned URL in Markdown, blogs, or forums.

### WebDAV

WebDAV is an HTTP-based protocol for remote file access. Finder, Windows File Explorer, Cyberduck, RaiDrive, and other compatible clients can use it to access ZPan files.

WebDAV clients see personal and team spaces rather than raw object keys and do not need object-storage credentials.

### Remote download

A remote download tells ZPan to create a task from an HTTP URL, magnet link, torrent, or another supported source. The user chooses a destination, an available downloader runs the task, and completed files are imported into ZPan.

### Downloader

A downloader is the independent program that executes remote-download tasks. It connects to sources, holds temporary files, reports progress, and uploads results to object storage.

It runs continuously and uses its own network and temporary disk. The administrator deploys and authorizes downloaders; users create and manage only their own tasks.

### API key

An API key is a credential for programs and external tools. It lets scripts, image uploaders, and other clients call ZPan without storing a user's browser password.

An API key is normally shown only once when created. Use a different key for each tool so it can be revoked independently.

After learning these terms, continue with [Before you deploy](/docs/getting-started/prerequisites/) or run the local [Quick start](/docs/getting-started/quick-start/).
