import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

type FaqItem = { question: string; answer: string };

type Props = {
  title: string;
  subtitle?: string;
  items: FaqItem[];
  className?: string;
};

export function FaqSection({ title, subtitle, items, className = "" }: Props) {
  return (
    <section className={`py-16 ${className}`} aria-labelledby="faq-heading">
      <JsonLd data={faqJsonLd(items)} />
      <div className="max-w-3xl mx-auto px-6">
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-3 text-center">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted text-center mb-10 leading-relaxed">{subtitle}</p>
        )}
        <div className="space-y-3">
          {items.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white rounded-2xl border border-border overflow-hidden"
            >
              <summary className="px-6 py-4 cursor-pointer font-semibold text-foreground list-none flex justify-between items-center gap-4 hover:bg-blue-50/50 transition-colors [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="text-primary text-xl shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-muted leading-relaxed text-sm border-t border-border pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
