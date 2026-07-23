---
title: "ZPan 2.2: team workspaces, roles, and invitations"
description: "A detailed introduction to ZPan 2.2: team workspaces, organization-level RBAC, member management, invitations, activity feeds, workspace switching, and public profiles."
publishedAt: 2026-04-19
locale: en
tags: [Releases, v2.2]
---

ZPan 2.2 expanded the product from personal file spaces to team collaboration.

Earlier versions could manage users and files, but a shared instance still needed a way to express ownership by a project, household, or organization. Team workspaces add that resource level so files, members, and roles can be managed together.

## Team workspaces and RBAC

Users can create teams and manage their members and roles. Organization-level role-based access control determines what each member may do without requiring everyone to share an administrator account.

A workspace switcher in the sidebar moves between a personal space and the teams a user has joined. Each workspace keeps its own file context.

## Invitations and activity

Teams can invite members by email or invite link. An administrator may send an invitation to a specific address or share a link with the intended participants.

Each team also has an activity feed. Team-list filtering and member counts were corrected in the same release.

## Public user pages

Version 2.2 introduced public profiles at `/u/:username`, giving each user a stable public address. This provided a user-level surface for later sharing and public-content features.

## Navigation change

The Teams entry moved into the avatar menu so it no longer occupied the main navigation.

After upgrading, test workspace visibility and role behavior with a team administrator, a regular member, and a user who has not joined the team. The source record is available in the [ZPan v2.2.0 release](https://github.com/saltbo/zpan/releases/tag/v2.2.0).
