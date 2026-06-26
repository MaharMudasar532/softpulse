import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import {
  getAllPostMetas,
  getAllCategories,
  getAllTags,
  getPopularPosts,
  getRecentPosts,
  paginatePosts,
} from "@/lib/blog/get-posts";
import { blogHubJsonLd, getBlogHubMetadata } from "@/lib/seo";

export const metadata: Metadata = getBlogHubMetadata();

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const allPosts = getAllPostMetas();
  const { items, currentPage, totalPages } = paginatePosts(allPosts, page);

  return (
    <>
      <JsonLd data={blogHubJsonLd(allPosts.map((p) => ({ title: p.title, slug: p.slug })))} />

      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Soft Pulse Blog</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Practical guides on React Native, MERN stack, web development, and
            building a tech career in Pakistan.
          </p>
          <Link
            href="/blog/search"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl glass text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4" />
            Search Articles
          </Link>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <SectionHeader
              label="Latest"
              title="Articles & Guides"
              description="Insights from our developers and trainers at Soft Pulse."
              className="mb-12 !text-left !mx-0"
            />

            {items.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  {items.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
                <BlogPagination currentPage={currentPage} totalPages={totalPages} />
              </>
            ) : (
              <p className="text-muted text-center py-12">
                No articles yet. Check back soon!
              </p>
            )}
          </div>

          <BlogSidebar
            recentPosts={getRecentPosts()}
            popularPosts={getPopularPosts()}
            categories={getAllCategories()}
            tags={getAllTags()}
          />
        </div>
      </section>
    </>
  );
}
