import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SocialShare } from "@/components/blog/SocialShare";
import { RelatedPosts, PostNavigation } from "@/components/blog/RelatedPosts";
import { BlogFaqSection, BlogTags } from "@/components/blog/BlogExtras";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Button } from "@/components/ui/Button";
import type { BlogPost, BlogPostMeta } from "@/lib/blog/types";
import { blogPostJsonLd, breadcrumbJsonLd } from "@/lib/seo";

type BlogPostViewProps = {
  post: BlogPost;
  related: BlogPostMeta[];
  prev?: BlogPostMeta;
  next?: BlogPostMeta;
  sidebar: {
    recentPosts: BlogPostMeta[];
    popularPosts: BlogPostMeta[];
    categories: string[];
    tags: string[];
  };
};

export function BlogPostView({
  post,
  related,
  prev,
  next,
  sidebar,
}: BlogPostViewProps) {
  const breadcrumbs = [
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          blogPostJsonLd(post),
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <section className="pt-32 pb-12 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Breadcrumbs light items={breadcrumbs} />
          <span className="inline-block px-3 py-1 rounded-full glass text-sm font-medium text-blue-100 mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-blue-100 text-sm mb-8">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishDate).toLocaleDateString("en-PK", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>
          <SocialShare title={post.title} slug={post.slug} />
        </div>
      </section>

      <section className="relative -mt-8 max-w-7xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl aspect-[21/9] relative bg-slate-900">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2 min-w-0">
            <BlogPostContent content={post.content} />
            {post.faqs && post.faqs.length > 0 && (
              <BlogFaqSection faqs={post.faqs} />
            )}
            <div className="mt-10 pt-8 border-t border-border">
              <BlogTags tags={post.tags} />
            </div>
            <div className="mt-10 p-8 rounded-2xl gradient-bg text-white text-center">
              <h2 className="text-2xl font-bold mb-3">Ready to Start Learning?</h2>
              <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                Join the React Native course at Soft Pulse in Sargodha — hands-on
                projects, mentor support, and a path to real developer careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/react-native-course-sargodha" variant="secondary" size="lg">
                  View React Native Course
                </Button>
                <Button href="/#contact" variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
            <PostNavigation prev={prev} next={next} />
            <RelatedPosts posts={related} />
          </article>

          <aside className="space-y-8">
            <TableOfContents headings={post.headings} />
            <BlogSidebar {...sidebar} />
          </aside>
        </div>
      </section>
    </>
  );
}
