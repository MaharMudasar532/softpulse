import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog/types";

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (!posts.length) return null;

  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-blue-950">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <span className="text-xs font-medium text-primary">{post.category}</span>
              <h3 className="font-bold mt-1 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PostNavigation({
  prev,
  next,
}: {
  prev?: BlogPostMeta;
  next?: BlogPostMeta;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="grid sm:grid-cols-2 gap-4 py-8 border-t border-border"
    >
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group p-5 rounded-2xl border border-border hover:border-primary/30 transition-all"
        >
          <span className="text-xs text-muted flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous Article
          </span>
          <span className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group p-5 rounded-2xl border border-border hover:border-primary/30 transition-all sm:text-right"
        >
          <span className="text-xs text-muted flex items-center gap-1 mb-2 sm:justify-end">
            Next Article
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
