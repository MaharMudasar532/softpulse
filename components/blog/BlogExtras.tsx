import Link from "next/link";
import type { BlogFaq } from "@/lib/blog/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

export function BlogFaqSection({ faqs }: { faqs: BlogFaq[] }) {
  if (!faqs?.length) return null;

  return (
    <section className="py-12 border-t border-border">
      <JsonLd data={faqJsonLd(faqs)} />
      <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group bg-blue-50 rounded-2xl border border-border overflow-hidden"
          >
            <summary className="cursor-pointer px-6 py-4 font-semibold list-none flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="text-primary text-xl shrink-0 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="px-6 pb-5 text-muted leading-relaxed border-t border-border pt-4">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function BlogTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-muted">Tags:</span>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog/search?tag=${encodeURIComponent(tag)}`}
          className="px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-medium border border-border hover:border-primary/30 transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
