import Link from "next/link";
import { Search } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog/types";

export function BlogSidebar({
  recentPosts,
  popularPosts,
  categories,
  tags,
  activeCategory,
  activeTag,
}: {
  recentPosts: BlogPostMeta[];
  popularPosts: BlogPostMeta[];
  categories: string[];
  tags: string[];
  activeCategory?: string;
  activeTag?: string;
}) {
  return (
    <aside className="space-y-8">
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-bold mb-4">Search Blog</h3>
        <form action="/blog/search" method="get" className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="search"
            name="q"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </form>
      </div>

      <SidebarSection title="Recent Posts">
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-muted hover:text-primary transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </SidebarSection>

      <SidebarSection title="Popular Posts">
        <ul className="space-y-3">
          {popularPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-muted hover:text-primary transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </SidebarSection>

      <SidebarSection title="Categories">
        <ul className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/blog/search?category=${encodeURIComponent(cat)}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </SidebarSection>

      <SidebarSection title="Tags">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/search?tag=${encodeURIComponent(tag)}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeTag === tag
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted hover:border-primary/30 hover:text-primary"
                }`}
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      </SidebarSection>

      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-border p-6">
        <h3 className="font-bold mb-2">Newsletter</h3>
        <p className="text-sm text-muted mb-4">
          Get dev tips, course updates, and career advice from Soft Pulse.
        </p>
        <form action="/#contact" className="space-y-3">
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button
            type="submit"
            className="w-full px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <h3 className="font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}
