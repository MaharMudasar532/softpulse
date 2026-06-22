import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageSeoBlocks } from "@/components/seo/PageSeoBlocks";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ServicePage } from "@/lib/data/pages";
import { getServiceByPage } from "@/lib/data/pages";
import { serviceJsonLd } from "@/lib/seo";

const iconMap: Record<string, string> = {
  smartphone: "📱",
  code: "⚡",
  "shopping-bag": "🛒",
  globe: "🌐",
  palette: "🎨",
  brain: "🤖",
};

export function ServiceDetailView({ page }: { page: ServicePage }) {
  const service = getServiceByPage(page.slug);
  if (!service) return null;

  return (
    <>
      <JsonLd data={serviceJsonLd(page)} />
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Breadcrumbs
            light
            items={[
              { name: "Services", path: "/services" },
              { name: page.headline, path: `/${page.slug}` },
            ]}
          />
          <div className="max-w-3xl">
            <span className="text-4xl mb-4 block">{iconMap[service.icon] || "⚡"}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {page.headline}
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              {page.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/#contact" variant="secondary" size="lg">
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/services" variant="outline" size="lg">
                All Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">What We Deliver</h2>
            <p className="text-muted leading-relaxed mb-8">{service.description}</p>
            <ul className="space-y-3">
              {page.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Process</h2>
            <div className="space-y-6">
              {page.process.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-4 p-6 bg-blue-50 rounded-2xl border border-border"
                >
                  <span className="text-2xl font-bold text-primary/30">{step.step}</span>
                  <div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Related Case Studies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/case-study-karzame"
              className="p-6 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <span className="text-xs font-medium text-primary">Fintech</span>
              <h3 className="font-bold mt-2">Karzame Platform</h3>
              <p className="text-sm text-muted mt-2">React Native fintech app</p>
            </Link>
            <Link
              href="/case-study-shopify-app"
              className="p-6 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <span className="text-xs font-medium text-primary">Shopify</span>
              <h3 className="font-bold mt-2">Shopify App & Store</h3>
              <p className="text-sm text-muted mt-2">Custom e-commerce solution</p>
            </Link>
            <Link
              href="/case-study-loyalty-app"
              className="p-6 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <span className="text-xs font-medium text-primary">Fintech</span>
              <h3 className="font-bold mt-2">Loyalty Wallet</h3>
              <p className="text-sm text-muted mt-2">Wafaa PRO digital wallet</p>
            </Link>
          </div>
        </div>
      </section>

      <PageSeoBlocks slug={page.slug} />
    </>
  );
}
