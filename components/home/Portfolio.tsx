import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoreButtons } from "@/components/ui/StoreButtons";
import type { PortfolioItem } from "@/lib/types";

export function Portfolio({ items }: { items: PortfolioItem[] }) {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Our Work"
          title="Portfolio"
          description="Real apps shipped to Google Play and the App Store — built with React Native and modern mobile technologies."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.slug ? `/portfolio/${item.slug}` : "#"}
              className="group rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 bg-white"
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={`${item.title} — SoftPulse mobile app portfolio project`}
                    fill
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 md:hidden">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <StoreButtons
                    googlePlayUrl={item.google_play_url}
                    appleStoreUrl={item.apple_store_url}
                    size="sm"
                  />
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    View details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
