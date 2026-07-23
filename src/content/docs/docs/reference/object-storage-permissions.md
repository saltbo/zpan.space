---
title: "Object storage permissions"
description: Grant ZPan the minimum bucket, object, and multipart permissions required for reliable file operations.
---

Create a dedicated credential for each ZPan storage backend. Grant access only to the bucket and prefix used by that instance.

ZPan needs permission to:

- list the bucket or relevant prefix;
- read object metadata and content;
- create and overwrite objects;
- delete objects;
- create, upload, complete, and abort multipart uploads;
- generate signed requests for those operations.

Provider names differ, but the corresponding S3 actions commonly include `ListBucket`, `GetObject`, `HeadObject`, `PutObject`, `DeleteObject`, `DeleteObjects`, `CreateMultipartUpload`, `UploadPart`, `CompleteMultipartUpload`, and `AbortMultipartUpload`.

Do not grant bucket policy administration, account administration, or access to unrelated buckets. Avoid account root keys. If the provider supports conditions, restrict the credential by bucket, prefix, source network, and required TLS.

Browser uploads use presigned URLs. The browser never receives the secret key, but the signed URL temporarily authorizes one object operation. Treat URLs captured in logs as sensitive until they expire.

After applying a policy, run the storage connection test and verify upload, download, rename or copy, delete, trash restore, and a multipart upload. A policy that permits only `PutObject` can appear to upload successfully but fail during confirmation, cleanup, or later file operations.
