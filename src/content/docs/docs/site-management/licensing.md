---
title: "Licensing and version"
description: Bind a purchased ZPan license, verify its edition and status, and prepare safely for instance migration.
---

Licensing unlocks paid features on your self-hosted instance. Files, accounts, database, and storage credentials remain in infrastructure you control.

![Licensing in the admin console](/images/docs/admin-licensing.png)

Open **Admin Console → Licensing** to see the installed edition and current feature comparison. To activate a purchased license, choose the connection action and follow the pairing flow with the purchase account. Confirm that the expected edition and status appear before enabling dependent production workflows.

The binding identifies an instance. Before changing domains, databases, or infrastructure, back up the database and record the installed version and binding status. A normal application upgrade should preserve it; rebuilding with a different database may create a different instance identity.

If activation fails, verify outbound HTTPS, server time, the purchase account, and that the license is available for this instance. Do not paste pairing codes, license payloads, or account details into public issues.

The authoritative current price is on [Pricing](/pricing/), while the in-product table is authoritative for features in the installed release. Contact the purchase channel before a major migration if the old instance cannot be accessed for unbinding.
