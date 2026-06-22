import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicePages } from "@/lib/data/pages";
import { services } from "@/lib/data/static";
import { buildPageMetadata, seoKeywords, servicesHubJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Software Development Services | SoftPulse",
  description:
    "Mobile app development, React Native, web development, MERN stack, Shopify apps, and UI/UX design. SoftPulse delivers production-ready software for businesses worldwide.",
  path: "/services",
  keywords: seoKeywords.services,
});

const iconEmoji: Record<string, string> = {
  smartphone: "📱",
  code: "⚡",
  "shopping-bag": "🛒",
  globe: "🌐",
  palette: "🎨",
  brain: "🤖",
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesHubJsonLd()} />
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            End-to-end software development — mobile apps, web platforms,
            Shopify, and UI/UX design for startups and enterprises.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="What We Build"
            title="Development Services"
            description="From concept to production — we ship software that scales."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicePages.map((page) => {
              const service = services.find((s) => s.id === page.serviceId);
              return (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="group bg-white rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all"
                >
                  <span className="text-3xl mb-4 block">
                    {service ? iconEmoji[service.icon] : "⚡"}
                  </span>
                  <h2 className="text-xl font-bold group-hover:text-primary transition-colors mb-3">
                    {page.headline}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {page.subheadline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Case Studies</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            See how we&apos;ve helped clients ship production apps and platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/case-study-karzame"
              className="px-6 py-3 rounded-xl bg-white border border-border hover:border-primary/30 font-medium text-sm transition-all"
            >
              Karzame Fintech
            </Link>
            <Link
              href="/case-study-shopify-app"
              className="px-6 py-3 rounded-xl bg-white border border-border hover:border-primary/30 font-medium text-sm transition-all"
            >
              Shopify App
            </Link>
            <Link
              href="/case-study-loyalty-app"
              className="px-6 py-3 rounded-xl bg-white border border-border hover:border-primary/30 font-medium text-sm transition-all"
            >
              Loyalty Wallet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
