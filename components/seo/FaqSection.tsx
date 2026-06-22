import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import type { SeoFaq } from "@/lib/data/page-seo";

export function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
}: {
  faqs: SeoFaq[];
  title?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="py-16 bg-slate-50 border-t border-border">
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white rounded-2xl border border-border overflow-hidden"
            >
              <summary className="cursor-pointer px-6 py-4 font-semibold text-foreground list-none flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
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
      </div>
    </section>
  );
}
