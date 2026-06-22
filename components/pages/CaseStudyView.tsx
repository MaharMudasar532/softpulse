import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CaseStudy } from "@/lib/data/pages";
import { caseStudyJsonLd } from "@/lib/seo";

export function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <>
      <JsonLd data={caseStudyJsonLd(study)} />
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Breadcrumbs
            light
            items={[
              { name: "Case Studies", path: "/#portfolio" },
              { name: study.title, path: `/case-study-${study.slug}` },
            ]}
          />
          <span className="inline-block px-3 py-1 rounded-full glass text-sm font-medium text-blue-100 mb-4">
            {study.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {study.title}
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">Client: {study.client}</p>
        </div>
      </section>

      {study.image && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image
                src={study.image}
                alt={`${study.title} — ${study.client} case study by SoftPulse`}
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
              <p className="text-muted leading-relaxed">{study.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
              <p className="text-muted leading-relaxed">{study.solution}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {study.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-6 border border-border">
              <h3 className="font-bold mb-4">Results</h3>
              <ul className="space-y-3">
                {study.results.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="font-bold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {study.portfolioSlug && (
              <Link
                href={`/portfolio/${study.portfolioSlug}`}
                className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                View live project <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Button href="/#contact" size="lg" className="w-full">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
