import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			id: z.number(),
			title: z.string(),
			description: z.string(),
			// Notion: 'Created time' (pubDate) and 'Last edited time' (updatedDate)
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			category: z.string().default('Uncategorized'),
			tags: z.array(z.string()).optional(),
			pinned: z.boolean().default(false),
		}),
});

const project = defineCollection({
	loader: glob({ base: './src/content/project', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			id: z.number(),
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			techStack: z.array(z.string()).optional(),
			link: z.string().url().optional(),
			repository: z.string().url().optional(),
			pinned: z.boolean().default(false),
		}),
});

export const collections = { blog, project };
