import { getCollection } from 'astro:content';

export async function GET() {
  const blogs = await getCollection('blog');
  const projects = await getCollection('project');

  const blogData = blogs.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    tags: [...(post.data.tags || []), post.data.category].filter(Boolean),
    url: `${import.meta.env.BASE_URL}blog/${post.id}`,
    body: post.body || '',
    type: 'Blog',
  }));

  const projectData = projects.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.techStack || [],
    url: `${import.meta.env.BASE_URL}projects/${post.id}`,
    body: post.body || '',
    type: 'Project',
  }));

  const searchData = [...blogData, ...projectData];

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
