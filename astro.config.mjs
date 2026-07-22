// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

/**
 * @param {string} label
 * @param {string} zhCN
 * @param {string} slug
 */
function sidebarLink(label, zhCN, slug) {
	return { label, translations: { 'zh-CN': zhCN }, slug };
}

/**
 * @param {string} label
 * @param {string} zhCN
 * @param {any[]} items
 */
function sidebarGroup(label, zhCN, items) {
	return { label, translations: { 'zh-CN': zhCN }, items };
}

export default defineConfig({
	site: 'https://zpan.space',
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
				sidebarGroup('Get Started', 'Get Started', [
					sidebarLink('What is ZPan?', 'ZPan 是什么', 'docs'),
					sidebarLink(
						'Core concepts',
						'核心概念',
						'docs/getting-started/core-concepts',
					),
					sidebarLink(
						'Before you deploy',
						'部署前准备',
						'docs/getting-started/prerequisites',
					),
					sidebarLink(
						'Quick start',
						'快速开始',
						'docs/getting-started/quick-start',
					),
				]),
				sidebarGroup('Deploy ZPan', '部署 ZPan', [
					sidebarLink('Cloudflare Workers', 'Cloudflare Workers', 'docs/deployment/cloudflare'),
					sidebarLink('Docker', 'Docker', 'docs/deployment/docker'),
					sidebarLink('AWS Lambda', 'AWS Lambda', 'docs/deployment/aws-lambda'),
					sidebarLink('Vercel', 'Vercel', 'docs/deployment/vercel'),
					sidebarLink('Netlify', 'Netlify', 'docs/deployment/netlify'),
					sidebarLink('Azure Functions', 'Azure Functions', 'docs/deployment/azure-functions'),
					sidebarLink('Google Cloud Run', 'Google Cloud Run', 'docs/deployment/cloud-run'),
				]),
				sidebarGroup('Site management', '站点管理', [
					sidebarLink('Basic settings', '基础配置', 'docs/site-management/basic/public-url'),
					sidebarLink(
						'Login and email',
						'登录与邮件',
						'docs/site-management/authentication/oauth',
					),
					sidebarLink('Object storage', '对象存储', 'docs/site-management/storage/add-storage'),
					sidebarLink('User management', '用户管理', 'docs/site-management/people/users'),
					sidebarLink('Team management', '团队管理', 'docs/site-management/people/teams'),
					sidebarLink(
						'Downloaders',
						'下载器',
						'docs/site-management/download-nodes/deploy',
					),
					sidebarLink(
						'Site announcements',
						'站点公告',
						'docs/site-management/governance/announcements',
					),
					sidebarLink(
						'Audit logs',
						'审计日志',
						'docs/site-management/governance/audit-logs',
					),
					sidebarLink(
						'Analytics',
						'数据分析',
						'docs/site-management/governance/analytics',
					),
					sidebarLink(
						'Licensing',
						'授权管理',
						'docs/site-management/governance/licensing',
					),
				]),
				sidebarGroup('User guide', '功能指南', [
					sidebarLink(
						'File management',
						'文件管理',
						'docs/user-guide/files-and-folders',
					),
					sidebarLink(
						'Personal and team spaces',
						'团队空间',
						'docs/user-guide/spaces',
					),
					sidebarLink('File sharing', '文件分享', 'docs/user-guide/file-sharing'),
					sidebarLink(
						'Remote downloads',
						'远程下载',
						'docs/user-guide/remote-downloads',
					),
					sidebarLink('Image hosting', '图床', 'docs/user-guide/image-hosting'),
					sidebarLink('WebDAV', 'WebDAV', 'docs/user-guide/webdav'),
					sidebarLink(
						'API keys',
						'API Key',
						'docs/user-guide/api-keys-and-integrations',
					),
				]),
				sidebarGroup('Operations and troubleshooting', '运维与排错', [
					sidebarLink('Upgrade ZPan', '升级 ZPan', 'docs/operations/upgrading'),
					sidebarLink(
						'Backup and restore',
						'备份与恢复',
						'docs/operations/backup-and-restore',
					),
					sidebarLink('Security configuration', '安全配置', 'docs/operations/security'),
					sidebarLink(
						'Troubleshooting',
						'常见问题',
						'docs/operations/troubleshooting',
					),
				]),
				sidebarGroup('Reference', '参考', [
					sidebarLink(
						'Environment variables',
						'环境变量',
						'docs/reference/environment-variables',
					),
					sidebarLink(
						'Deployment platform comparison',
						'部署平台对照',
						'docs/reference/deployment-platforms',
					),
					sidebarLink(
						'Object storage compatibility',
						'对象存储兼容性',
						'docs/reference/object-storage-permissions',
					),
					sidebarLink(
						'Editions and features',
						'版本与功能对照',
						'docs/reference/editions',
					),
				]),
			],
		}),
	],
});
