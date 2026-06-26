import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/pages/BlogPostView";
import {
  getAdjacentPosts,
  getAllCategories,
  getAllTags,
  getPopularPosts,
  getPostBySlug,
  getPostSlugs,
  getRecentPosts,
  getRelatedPosts,
} from "@/lib/blog/get-posts";
import { getBlogPostMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return getBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <BlogPostView
      post={post}
      related={getRelatedPosts(slug)}
      prev={prev}
      next={next}
      sidebar={{
        recentPosts: getRecentPosts(),
        popularPosts: getPopularPosts(),
        categories: getAllCategories(),
        tags: getAllTags(),
      }}
    />
  );
}
