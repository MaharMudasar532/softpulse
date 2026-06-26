import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  BlogCategory,
  BlogFrontmatter,
  BlogHeading,
  BlogPost,
  BlogPostMeta,
  BlogSearchFilters,
} from "@/lib/blog/types";
import { POSTS_PER_PAGE } from "@/lib/blog/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[#*_`[\]]/g, "").trim();
    headings.push({ id: slugify(text), text, level });
  }

  return headings;
}

function parsePostFile(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;
  const stats = readingTime(content);

  return {
    ...fm,
    content,
    readingTimeMinutes: Math.max(1, Math.ceil(stats.minutes)),
    headings: extractHeadings(content),
    readingTime: fm.readingTime || stats.text,
  };
}

function getPostFilenames(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .sort();
}

export function getAllPosts(): BlogPost[] {
  return getPostFilenames()
    .map(parsePostFile)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
}

export function getAllPostMetas(): BlogPostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined,
  };
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  return getAllPostMetas()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 3;
      const sharedTags = p.tags.filter((t) => current.tags.includes(t));
      score += sharedTags.length * 2;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getRecentPosts(limit = 5): BlogPostMeta[] {
  return getAllPostMetas().slice(0, limit);
}

export function getPopularPosts(limit = 5): BlogPostMeta[] {
  const popular = getAllPostMetas().filter((p) => p.popular);
  if (popular.length >= limit) return popular.slice(0, limit);
  return getAllPostMetas().slice(0, limit);
}

export function getAllCategories(): BlogCategory[] {
  const cats = new Set(getAllPosts().map((p) => p.category));
  return Array.from(cats).sort() as BlogCategory[];
}

export function getAllTags(): string[] {
  const tags = new Set(getAllPosts().flatMap((p) => p.tags));
  return Array.from(tags).sort();
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPostMetas().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchPosts(filters: BlogSearchFilters): BlogPostMeta[] {
  const { query = "", category, tag } = filters;
  const q = query.toLowerCase().trim();

  return getAllPosts()
    .filter((post) => {
      if (category && post.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
      if (tag && !post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        return false;
      }
      if (!q) return true;

      const haystack = [
        post.title,
        post.description,
        post.category,
        post.author,
        ...post.tags,
        ...post.keywords,
        post.content,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    })
    .map(({ content: _content, ...meta }) => meta);
}

export function paginatePosts<T>(items: T[], page: number, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalItems: items.length,
    perPage,
  };
}
