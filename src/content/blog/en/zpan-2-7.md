---
title: "ZPan 2.7: remote downloads, WebDAV, background jobs, and version management"
description: "A detailed introduction to ZPan 2.7: remote downloaders, WebDAV, server-side archives, folder uploads, Cloud Credits, captcha, API keys, and the 2.7.1–2.7.4 fixes."
publishedAt: 2026-06-06
locale: en
tags: [Releases, v2.7]
---

ZPan 2.7 extended file operations beyond the browser. Remote downloader nodes can fetch HTTP and torrent sources, WebDAV connects compatible desktop and media clients, and longer archive work moves into explicit background jobs.

Four patch releases followed, improving downloader behavior, Docker persistence, licensing, version information, session performance, and upload compatibility.

## Remote download manager

Administrators can attach independent downloader nodes and assign HTTP or torrent work to them. Task details expose state, peer regions, and progress. BitTorrent jobs can retain seeds, and completed folder structures are preserved when the result is imported into the drive.

The `zpan` CLI provides one-command device login for a downloader and accepts a configurable server URL. A node joins through device authorization instead of keeping an administrator's browser session.

## WebDAV and API keys

Users can create per-user app passwords and mount personal or team spaces in WebDAV clients. The implementation is compatible with RFC 4918 Class 2.

API-key management was unified in the same release, giving programs and clients dedicated credentials rather than a shared account password.

## Folder uploads and background work

The web interface now accepts folder uploads. Server-side archive operations use streaming ZIP jobs placed on a queue, with progress available on a dedicated background-tasks page.

Longer work no longer has to remain attached to one browser request.

## Cloud Credits and sign-in protection

ZPan 2.7 added Cloud Credits for metered storage egress and included a credits store. Captcha protection can be enabled for sign-in and sign-up.

## Breaking change

REST routes became stricter, and public download links moved from `/dl/:token` to `/r/:token`. External scripts, saved URLs, and integrations that construct the old path must be updated.

## v2.7.1: downloader operations

Administrators can rename downloader nodes from the UI. Assignment reliability and transfer-speed reporting were improved. Docker exposes the torrent listening port and uses the host hostname when registering downloader nodes.

## v2.7.2: branding and Docker persistence

This patch refreshed the ZPan logo and branding. It also fixed permissions on the downloader data volume so the downloader can write its persistent state in Docker.

## v2.7.3: About page, business licensing, and entitlements

The administration area gained an About page with instance, edition, and version information, a changelog drawer, and a latest-version check against GitHub Releases.

Business authorization became independently manageable. The admin layout shows an edition ribbon, and the edition comparison groups features by capability. Administrators can edit or revoke granted quota entitlements. Instances may opt into anonymous deployment telemetry that includes a GeoIP region.

The patch also hardened remote-download usage billing, repaired Docker image startup, and switched downloader registration to the host hostname. Admin quota queries became batched and chunked under D1's 100-parameter limit, while monthly resets moved into a scheduled job. The application version is now read from `package.json` and injected at build time.

## v2.7.4: session performance, pairing, and upload compatibility

The server automatically trusts loopback and LAN origins without requiring them in `TRUSTED_ORIGINS`. Cloud pairing gained environment-key validation, clearer errors, and a confirmation handshake. Checkout gained a coupon entry.

Fixes include logging the underlying cause chain for failed D1 queries, cancelling a pending plan order after a duplicate-checkout error, producing Latin-1-safe `Content-Disposition` values for non-ASCII filenames, eliminating session hangs caused by cross-request pending initialization, and parsing the default quota input as a number.

Session reads also gained a client-side cache and Worker performance improvements. License confirmation was refactored to use `PATCH`.

Source releases:

- [v2.7.0](https://github.com/saltbo/zpan/releases/tag/v2.7.0)
- [v2.7.1](https://github.com/saltbo/zpan/releases/tag/v2.7.1)
- [v2.7.2](https://github.com/saltbo/zpan/releases/tag/v2.7.2)
- [v2.7.3](https://github.com/saltbo/zpan/releases/tag/v2.7.3)
- [v2.7.4](https://github.com/saltbo/zpan/releases/tag/v2.7.4)
