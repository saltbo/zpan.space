# zpan.space

Official website, blog, and documentation for [ZPan](https://github.com/saltbo/zpan).

Built with Astro and Starlight. Content lives in Markdown and MDX under `src/content/` and the generated static site is deployed with Cloudflare Workers Static Assets.

## Development

```sh
pnpm install
pnpm dev
```

The local site runs at `http://localhost:4321`.

## Content

- Product pages: `src/pages/` and `src/components/`
- Blog posts: `src/content/blog/{en,zh-cn}/`
- Documentation: `src/content/docs/`

## Build and deploy

```sh
pnpm build
pnpm deploy:dry-run
pnpm deploy
```

Deployment configuration is defined in `wrangler.jsonc`.
