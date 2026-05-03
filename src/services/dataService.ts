import { supabase } from '../lib/supabase';
import {
  projects as staticProjects,
  awards as staticAwards,
  blogPosts as staticBlogPosts,
  Project,
  Award,
  BlogPost,
} from '../data';

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return staticProjects;

    return data.map(mapProject);
  } catch {
    return staticProjects;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return staticProjects.find((p) => p.id === id) || null;

    return mapProject(data);
  } catch {
    return staticProjects.find((p) => p.id === id) || null;
  }
}

export async function createProject(project: Omit<Project, 'id'> & { id: string }): Promise<Project> {
  const { data, error } = await supabase.from('projects').insert([mapProjectToDb(project)]).select().single();
  if (error) throw error;
  return mapProject(data);
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(mapProjectToDb(project))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return mapProject(data);
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ─── AWARDS ──────────────────────────────────────────────────────────────────

export async function getAwards(): Promise<Award[]> {
  try {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .order('year', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return staticAwards;

    return data.map(mapAward);
  } catch {
    return staticAwards;
  }
}

export async function createAward(award: Omit<Award, 'id'>): Promise<Award> {
  const { data, error } = await supabase.from('awards').insert([award]).select().single();
  if (error) throw error;
  return mapAward(data);
}

export async function updateAward(id: string, award: Partial<Award>): Promise<Award> {
  const { data, error } = await supabase.from('awards').update(award).eq('id', id).select().single();
  if (error) throw error;
  return mapAward(data);
}

export async function deleteAward(id: string): Promise<void> {
  const { error } = await supabase.from('awards').delete().eq('id', id);
  if (error) throw error;
}

// ─── BLOG POSTS ──────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return staticBlogPosts;

    return data.map(mapBlogPost);
  } catch {
    return staticBlogPosts;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (error) throw error;
    if (!data) return staticBlogPosts.find((p) => p.id === id) || null;
    return mapBlogPost(data);
  } catch {
    return staticBlogPosts.find((p) => p.id === id) || null;
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'id'> & { id: string }): Promise<BlogPost> {
  const { data, error } = await supabase.from('blog_posts').insert([mapBlogPostToDb(post)]).select().single();
  if (error) throw error;
  return mapBlogPost(data);
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(mapBlogPostToDb(post))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return mapBlogPost(data);
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

// ─── MAPPERS ─────────────────────────────────────────────────────────────────

function mapProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    fullDescription: row.full_description as string | undefined,
    tags: (row.tags as string[]) || [],
    date: row.date as string,
    github: row.github as string | undefined,
    link: row.link as string | undefined,
    isFeatured: row.is_featured as boolean | undefined,
    image: row.image as string | undefined,
    stats: (row.stats as { label: string; value: string }[]) || undefined,
    orderIndex: row.order_index as number | undefined,
  };
}

function mapProjectToDb(p: Partial<Project>): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  if (p.id !== undefined) obj.id = p.id;
  if (p.title !== undefined) obj.title = p.title;
  if (p.description !== undefined) obj.description = p.description;
  if (p.fullDescription !== undefined) obj.full_description = p.fullDescription;
  if (p.tags !== undefined) obj.tags = p.tags;
  if (p.date !== undefined) obj.date = p.date;
  if (p.github !== undefined) obj.github = p.github;
  if (p.link !== undefined) obj.link = p.link;
  if (p.isFeatured !== undefined) obj.is_featured = p.isFeatured;
  if (p.image !== undefined) obj.image = p.image;
  if (p.stats !== undefined) obj.stats = p.stats;
  if (p.orderIndex !== undefined) obj.order_index = p.orderIndex;
  return obj;
}

function mapAward(row: Record<string, unknown>): Award {
  return {
    id: row.id as string,
    name: row.name as string,
    rank: row.rank as string,
    year: row.year as string,
    category: row.category as string,
  };
}

function mapBlogPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    date: row.date as string,
    type: row.type as string,
    image: row.image as string,
  };
}

function mapBlogPostToDb(p: Partial<BlogPost>): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  if (p.id !== undefined) obj.id = p.id;
  if (p.title !== undefined) obj.title = p.title;
  if (p.excerpt !== undefined) obj.excerpt = p.excerpt;
  if (p.content !== undefined) obj.content = p.content;
  if (p.date !== undefined) obj.date = p.date;
  if (p.type !== undefined) obj.type = p.type;
  if (p.image !== undefined) obj.image = p.image;
  return obj;
}
