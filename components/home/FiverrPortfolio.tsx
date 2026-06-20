import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FiverrPortfolioItem } from "@/lib/types";

const FIVERR_PROFILE =
  "https://www.fiverr.com/developerpro532?public_mode=true";
const FIVERR_PORTFOLIO =
  "https://www.fiverr.com/users/developerpro532/portfolio?roleIds=";

export function FiverrPortfolio({ items }: { items: FiverrPortfolioItem[] }) {
  if (!items.length) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Fiverr"
          title="Services on Fiverr"
          description="Hire me on Fiverr for mobile app development, React Native, Flutter, bug fixes, and full project delivery."
        />

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href={FIVERR_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1dbf73] text-white font-semibold hover:bg-[#19a463] transition-colors"
          >
            View Fiverr Profile
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href={FIVERR_PORTFOLIO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1dbf73] text-[#1dbf73] font-semibold hover:bg-[#1dbf73]/5 transition-colors"
          >
            Fiverr Portfolio
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.fiverr_url || FIVERR_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border overflow-hidden hover:border-[#1dbf73]/40 hover:shadow-lg hover:shadow-[#1dbf73]/10 transition-all bg-white"
            >
              {item.image_url && (
                <div className="h-40 relative bg-slate-900 overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1dbf73]">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold mt-1 mb-2 group-hover:text-[#1dbf73] transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-3">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1dbf73]">
                  View on Fiverr <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
