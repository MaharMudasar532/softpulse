export const BLOG_CATEGORIES = [
  "React Native",
  "MERN Stack",
  "Web Development",
  "Shopify",
  "AI",
  "Career",
  "Software Development",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogFrontmatter = {
  title: string;
  description: string;
  slug: string;
  category: BlogCategory;
  author: string;
  publishDate: string;
  updatedDate?: string;
  featuredImage: string;
  tags: string[];
  keywords: string[];
  readingTime?: string;
  popular?: boolean;
  faqs?: BlogFaq[];
};

export type BlogHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
  readingTimeMinutes: number;
  headings: BlogHeading[];
};

export type BlogPostMeta = Omit<BlogPost, "content">;

export type BlogSearchFilters = {
  query?: string;
  category?: string;
  tag?: string;
};

export const POSTS_PER_PAGE = 6;
