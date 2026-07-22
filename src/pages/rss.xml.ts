import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
	const posts = await getCollection('blog', ({ data }) => data.locale === 'en' && !data.draft);
	return rss({
		title: 'ZPan Blog',
		description: 'Product news, tutorials, and engineering notes from ZPan.',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishedAt,
			link: `/blog/${post.id.replace('en/', '').replace(/\.(md|mdx)$/, '')}/`,
		})),
	});
}
