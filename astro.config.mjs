// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://zpan.space',
	integrations: [
		sitemap(),
		starlight({
			title: 'ZPan',
			description: 'Documentation for the open-source, S3-native file hosting platform.',
			logo: { src: './src/assets/logo.svg', alt: 'ZPan' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/starlight.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/saltbo/zpan' }],
			locales: {
				root: { label: 'English', lang: 'en' },
				'zh-cn': { label: '简体中文', lang: 'zh-CN' },
			},
			defaultLocale: 'root',
			editLink: { baseUrl: 'https://github.com/saltbo/zpan.space/edit/main/' },
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Overview', slug: 'docs' },
						{ label: 'Quick start', slug: 'docs/getting-started/quick-start' },
					],
				},
				{
					label: 'Deploy',
					items: [{ autogenerate: { directory: 'docs/deployment' } }],
				},
				{
					label: 'Use ZPan',
					items: [{ autogenerate: { directory: 'docs/guides' } }],
				},
			],
		}),
	],
});
