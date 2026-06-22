import type { PageSeoContent } from "@/lib/data/page-seo";

export function SeoContentBlock({ content }: { content: PageSeoContent }) {
  return (
    <section className="py-16 bg-white border-t border-border">
      <div className="max-w-3xl mx-auto px-6 space-y-10">
        <div className="space-y-4">
          {content.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {content.sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
