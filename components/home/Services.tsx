import {
  Smartphone,
  Code,
  ShoppingBag,
  Globe,
  Palette,
  Brain,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/lib/data/static";

const serviceLinks: Record<string, string> = {
  "mobile-app": "/mobile-app-development",
  "react-native": "/react-native-development",
  shopify: "/shopify-app-development",
  web: "/web-development-services",
  "ui-ux": "/ui-ux-design",
  ai: "/services",
};

const iconMap = {
  smartphone: Smartphone,
  code: Code,
  "shopping-bag": ShoppingBag,
  globe: Globe,
  palette: Palette,
  brain: Brain,
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="What We Do"
          title="Our Services"
          description="End-to-end digital solutions — mobile apps, web platforms, Shopify, and UI/UX design."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={serviceLinks[service.id] || "/services"}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
