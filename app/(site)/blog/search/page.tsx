import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import {
  getAllCategories,
  getAllTags,
  getPopularPosts,
  getRecentPosts,
  searchPosts,
} from "@/lib/blog/get-posts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Search Blog | SoftPulse",
  description: "Search SoftPulse blog articles by title, category, tags, and content.",
  path: "/blog/search",
});

type Props = {
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
};

export default async function BlogSearchPage({ searchParams }: Props) {
  const { q = "", category, tag } = await searchParams;
  const results = searchPosts({ query: q, category, tag });
  const hasFilters = Boolean(q || category || tag);

  return (
    <>
      <section className="pt-32 pb-12 gradient-bg relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Blog</h1>
          <p className="text-blue-100 max-w-xl mx-auto mb-8">
            Find articles by keyword, category, or tag.
          </p>
          <form
            action="/blog/search"
            method="get"
            className="max-w-xl mx-auto flex gap-3"
          >
            {category && (
              <input type="hidden" name="category" value={category} />
            )}
            {tag && <input type="hidden" name="tag" value={tag} />}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {hasFilters && (
              <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted">Filters:</span>
                {q && (
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-primary border border-border">
                    &quot;{q}&quot;
                  </span>
                )}
                {category && (
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-primary border border-border">
                    {category}
                  </span>
                )}
                {tag && (
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-primary border border-border">
                    #{tag}
                  </span>
                )}
                <Link href="/blog/search" className="text-primary hover:underline ml-2">
                  Clear all
                </Link>
              </div>
            )}

            <p className="text-muted mb-8">
              {results.length} article{results.length !== 1 ? "s" : ""} found
            </p>

            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {results.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-border">
                <p className="text-muted mb-4">No articles match your search.</p>
                <Link href="/blog" className="text-primary font-semibold hover:underline">
                  Browse all articles
                </Link>
              </div>
            )}
          </div>

          <BlogSidebar
            recentPosts={getRecentPosts()}
            popularPosts={getPopularPosts()}
            categories={getAllCategories()}
            tags={getAllTags()}
            activeCategory={category}
            activeTag={tag}
          />
        </div>
      </section>
    </>
  );
}
