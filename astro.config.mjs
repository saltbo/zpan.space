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
					translations: { 'zh-CN': '从这里开始' },
					items: [
						{ label: 'Overview', translations: { 'zh-CN': '概览' }, slug: 'docs' },
						{
							label: 'Quick start',
							translations: { 'zh-CN': '快速开始' },
							slug: 'docs/getting-started/quick-start',
						},
						{
							label: 'Choose a deployment',
							translations: { 'zh-CN': '选择部署方式' },
							slug: 'docs/getting-started/choose-deployment',
						},
					],
				},
				{
					label: 'Deployment',
					translations: { 'zh-CN': '部署' },
					items: [{ autogenerate: { directory: 'docs/deployment' } }],
				},
				{
					label: 'Configuration',
					translations: { 'zh-CN': '配置' },
					items: [{ autogenerate: { directory: 'docs/configuration' } }],
				},
				{
					label: 'Administrator guide',
					translations: { 'zh-CN': '站长指南' },
					items: [{ autogenerate: { directory: 'docs/admin' } }],
				},
				{
					label: 'User guides',
					translations: { 'zh-CN': '使用指南' },
					items: [{ autogenerate: { directory: 'docs/guides' } }],
				},
			],
		}),
	],
});
