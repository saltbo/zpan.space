---
title: "Remote downloads"
description: Submit remote URLs, magnets, or torrents, choose a destination, and diagnose queued or failed tasks.
---

Remote downloads fetch a supported URL, magnet link, or torrent through an administrator-operated download node, then import the completed files into your chosen ZPan space and folder.

![Remote downloads in the English ZPan interface](/images/docs/remote-downloads.png)

Create a task from **Remote Downloads**, enter the source, choose the destination, and review the expected size when it is available. Your destination quota must have enough capacity for the imported result; the node also needs temporary disk while the task runs.

The task can pass through queued, downloading, importing, completed, failed, or cancelled states. A queued task may simply be waiting for an online compatible node. If it fails, read the task message before retrying: an unreachable source, insufficient node disk, unsupported protocol, destination permission, and exhausted quota need different fixes.

Cancelling stops future work but may not instantly remove all temporary or retained seed data; cleanup follows the node policy. Do not submit private URLs containing reusable credentials. Anyone with task access may be able to see the source.

After completion, open the destination and download a sample file. Contact the administrator when every task remains queued or reports a node error.
