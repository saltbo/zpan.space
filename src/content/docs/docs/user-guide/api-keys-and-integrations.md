---
title: "API keys and integrations"
description: Create, store, test, rotate, and revoke separate ZPan API keys for tools, scripts, and devices.
---

API keys let tools act without storing your ZPan password. Create them from the account or feature integration page supported by the tool.

![API key management in the English ZPan interface](/images/docs/api-keys.png)

Name each key after one device and purpose, such as `MacBook PicGo` or `backup-script`. Copy the value immediately because plaintext is normally shown once, then store it in the operating system keychain, CI secret store, or password manager.

Give a key only the access required by the integration. Never place it in a public repository, browser URL, screenshot, shared configuration template, or client-side code delivered to other users. Use separate keys for separate devices so one can be revoked without interrupting everything.

When connecting an uploader or script, verify the ZPan base URL, then perform a disposable test operation. Confirm the returned file, owner or space, path, and public/private behavior. Rate limits, quotas, and edition restrictions still apply to API operations.

Revoke unused keys and rotate any key that appears in logs or chat. Revocation stops future requests but cannot recall files already downloaded or public URLs already distributed. If a tool reports unauthorized access, first confirm the correct site URL and whether the key was copied with hidden whitespace before creating another credential.
