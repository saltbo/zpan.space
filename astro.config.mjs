// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://zpan.space',
	redirects: {
		'/docs/getting-started/quick-start/': '/docs/getting-started/first-run/',
		'/zh-cn/docs/getting-started/quick-start/': '/zh-cn/docs/getting-started/first-run/',
		'/docs/configuration/site-settings/': '/docs/site-management/general/site-settings/',
		'/zh-cn/docs/configuration/site-settings/': '/zh-cn/docs/site-management/general/site-settings/',
		'/docs/configuration/storage/': '/docs/site-management/storage/object-storage/',
		'/zh-cn/docs/configuration/storage/': '/zh-cn/docs/site-management/storage/object-storage/',
		'/docs/configuration/authentication/': '/docs/site-management/authentication/login-and-email/',
		'/zh-cn/docs/configuration/authentication/': '/zh-cn/docs/site-management/authentication/login-and-email/',
		'/docs/configuration/webdav/': '/docs/site-management/webdav-domain/',
		'/zh-cn/docs/configuration/webdav/': '/zh-cn/docs/site-management/webdav-domain/',
		'/docs/admin/overview/': '/docs/site-management/overview/',
		'/zh-cn/docs/admin/overview/': '/zh-cn/docs/site-management/overview/',
		'/docs/admin/users-and-teams/': '/docs/site-management/users-and-teams/',
		'/zh-cn/docs/admin/users-and-teams/': '/zh-cn/docs/site-management/users-and-teams/',
		'/docs/admin/operations/': '/docs/site-management/operations-and-governance/',
		'/zh-cn/docs/admin/operations/': '/zh-cn/docs/site-management/operations-and-governance/',
		'/docs/guides/remote-downloader/': '/docs/site-management/downloaders/',
		'/zh-cn/docs/guides/remote-downloader/': '/zh-cn/docs/site-management/downloaders/',
		'/docs/guides/file-sharing/': '/docs/user-guide/file-sharing/',
		'/zh-cn/docs/guides/file-sharing/': '/zh-cn/docs/user-guide/file-sharing/',
		'/docs/guides/image-hosting/': '/docs/user-guide/image-hosting/',
		'/zh-cn/docs/guides/image-hosting/': '/zh-cn/docs/user-guide/image-hosting/',
	},
	integrations: [
		sitemap(),
		starlight({
			title: 'ZPan',
			description: 'Documentation for the open-source, S3-native file hosting platform.',
			components: {
				ThemeProvider: './src/components/LightThemeProvider.astro',
				ThemeSelect: './src/components/EmptyThemeSelect.astro',
			},
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
							label: 'Choose a deployment',
							translations: { 'zh-CN': '选择部署方式' },
							slug: 'docs/getting-started/choose-deployment',
						},
						{
							label: 'First-run setup',
							translations: { 'zh-CN': '部署后的首次初始化' },
							slug: 'docs/getting-started/first-run',
						},
					],
				},
				{
					label: 'Deploy ZPan',
					translations: { 'zh-CN': '部署 ZPan' },
					items: [
						{ label: 'Cloudflare Workers', slug: 'docs/deployment/cloudflare' },
						{ label: 'Docker', slug: 'docs/deployment/docker' },
						{
							label: 'Other Serverless platforms',
							translations: { 'zh-CN': '其他 Serverless 平台' },
							slug: 'docs/deployment/other-platforms',
						},
					],
				},
				{
					label: 'Site management',
					translations: { 'zh-CN': '站点管理' },
					items: [
						{
							label: 'Admin console overview',
							translations: { 'zh-CN': '管理控制台概览' },
							slug: 'docs/site-management/overview',
						},
						{
							label: 'Basic settings',
							translations: { 'zh-CN': '基础设置' },
							items: [
								{
									label: 'Site settings',
									translations: { 'zh-CN': '站点设置' },
									slug: 'docs/site-management/general/site-settings',
								},
							],
						},
						{
							label: 'Object storage',
							translations: { 'zh-CN': '对象存储' },
							items: [
								{
									label: 'Configure object storage',
									translations: { 'zh-CN': '配置对象存储' },
									slug: 'docs/site-management/storage/object-storage',
								},
							],
						},
						{
							label: 'Login and email',
							translations: { 'zh-CN': '登录与邮件' },
							items: [
								{
									label: 'Authentication, OAuth, and email',
									translations: { 'zh-CN': '登录、OAuth 与邮件' },
									slug: 'docs/site-management/authentication/login-and-email',
								},
							],
						},
						{
							label: 'Users and teams',
							translations: { 'zh-CN': '用户与团队' },
							slug: 'docs/site-management/users-and-teams',
						},
						{
							label: 'Download nodes',
							translations: { 'zh-CN': '下载节点' },
							slug: 'docs/site-management/downloaders',
						},
						{
							label: 'Operations and governance',
							translations: { 'zh-CN': '运营与治理' },
							slug: 'docs/site-management/operations-and-governance',
						},
						{
							label: 'WebDAV hostname',
							translations: { 'zh-CN': 'WebDAV 域名' },
							slug: 'docs/site-management/webdav-domain',
						},
					],
				},
				{
					label: 'User guide',
					translations: { 'zh-CN': '功能指南' },
					items: [
						{
							label: 'File sharing',
							translations: { 'zh-CN': '文件分享' },
							slug: 'docs/user-guide/file-sharing',
						},
						{
							label: 'Image hosting',
							translations: { 'zh-CN': '图床' },
							slug: 'docs/user-guide/image-hosting',
						},
					],
				},
			],
		}),
	],
});
