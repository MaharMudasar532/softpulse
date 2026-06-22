import {
  Smartphone,
  Code,
  ShoppingBag,
  Globe,
  Palette,
  Brain,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/lib/types";

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-cyan-300" aria-hidden="true" />
            {settings.hero_badge}
          </div>

          {/* Single H1 — primary homepage ranking signal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Software House &amp; IT Training Institute in Sargodha
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-blue-50 mb-4 whitespace-pre-line">
            {settings.hero_title}
          </p>

          <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-lg">
            {settings.hero_subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/#courses" variant="secondary" size="lg">
              View Courses
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Hire Developers
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold">{settings.stat_projects}</div>
              <div className="text-sm text-blue-200">Projects Delivered</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-3xl font-bold">{settings.stat_clients}</div>
              <div className="text-sm text-blue-200">Students Trained</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="text-3xl font-bold">{settings.stat_rating}</div>
              <div className="text-sm text-blue-200">Client Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-4" aria-hidden="true">
          {[
            { icon: Smartphone, label: "Mobile Apps", color: "from-blue-500 to-blue-600" },
            { icon: Globe, label: "Web Development", color: "from-cyan-500 to-blue-500" },
            { icon: ShoppingBag, label: "Shopify", color: "from-blue-600 to-indigo-600" },
            { icon: Brain, label: "AI Solutions", color: "from-indigo-500 to-purple-600" },
            { icon: Code, label: "React Native", color: "from-sky-500 to-blue-600" },
            { icon: Palette, label: "UI/UX Design", color: "from-blue-400 to-cyan-500" },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`glass rounded-2xl p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300 ${i % 2 === 1 ? "mt-8" : ""}`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
