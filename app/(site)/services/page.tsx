import type { Metadata } from "next";
import {
  Smartphone,
  Code,
  ShoppingBag,
  Globe,
  Palette,
  Brain,
  CheckCircle,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/lib/data/static";
import {
  buildPageMetadata,
  faqJsonLd,
  seoKeywords,
  servicesFaq,
  servicesPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Software Development Services in Sargodha — Web & Mobile Apps",
  description:
    "Hire SoftPulse — top software house in Sargodha for web development, mobile apps, React Native, Shopify, UI/UX & AI. 50+ projects shipped. Free consultation at Al Rehman Trade Center, Sargodha.",
  path: "/services",
  keywords: seoKeywords.services,
});

const iconMap = {
  smartphone: Smartphone,
  code: Code,
  "shopping-bag": ShoppingBag,
  globe: Globe,
  palette: Palette,
  brain: Brain,
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[servicesPageJsonLd(), faqJsonLd(servicesFaq)]} />
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Software Development Services in Sargodha
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            SoftPulse is a trusted software house in Sargodha — delivering web
            apps, mobile apps, Shopify stores, and UI/UX design for businesses
            across Pakistan and worldwide.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[{ name: "Services in Sargodha", path: "/services" }]} />
          <div className="space-y-24">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center scroll-mt-24`}
              >
                <div className="flex-1">
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    {service.title} in Sargodha
                  </h2>
                  <p className="text-muted text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/#contact">Get a Quote</Button>
                </div>

                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 border border-border flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-60" />
                    <Icon className="w-24 h-24 text-primary/20" />
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      <FaqSection
        title="Software House in Sargodha — FAQ"
        items={servicesFaq}
        className="bg-white border-t border-border"
      />

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeader
            title="Not Sure Where to Start?"
            description="Book a free consultation and we'll help you find the right solution for your business."
          />
          <Button href="/#contact" size="lg">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </>
  );
}
