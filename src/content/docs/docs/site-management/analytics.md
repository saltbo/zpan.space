---
title: "Analytics"
description: Read ZPan growth, storage, traffic, and sharing metrics and diagnose missing scheduled rollups.
---

Analytics summarizes how the instance is used without requiring administrators to query the database. Open **Admin Console → Analytics**, choose a UTC date range, and inspect the available sections for users and growth, storage and files, traffic and transfers, and sharing activity.

![The English ZPan admin overview that leads to site analytics](/images/docs/admin-overview.png)

Metrics are operational signals, not billing records unless the product explicitly labels them as such. Recent events may take time to appear when a deployment relies on scheduled rollups. A new instance or an inactive range can legitimately show empty charts.

Use growth data to review registration policy and activation, storage data to find capacity pressure, traffic data to investigate failures or cost, and sharing data to spot unexpectedly public behavior. Compare changes with releases, announcements, outages, campaigns, and audit events before drawing conclusions.

Serverless targets need their documented external scheduler for maintenance and aggregation jobs. If every range remains empty, confirm the installed edition enables Analytics, scheduled endpoints are running with the correct secret, the database is writable, and the application clock is correct.

Export or record the date range and timezone when sharing figures. Analytics retains aggregates according to the installed version; use infrastructure monitoring and storage-provider billing dashboards for long-term capacity and cost records.
