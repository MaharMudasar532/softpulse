import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { BlogPostMeta } from "@/lib/blog/types";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted mb-3">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            {new Date(post.publishDate).toLocaleDateString("en-PK", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {post.readingTime}
          </span>
        </div>

        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
          {post.description}
        </p>

        <Button href={`/blog/${post.slug}`} variant="ghost" size="sm" className="self-start px-0">
          Read More
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </article>
  );
}
