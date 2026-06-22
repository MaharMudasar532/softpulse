import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RelatedLink } from "@/lib/data/page-seo";

export function RelatedLinks({
  links,
  title = "Related Pages",
}: {
  links: RelatedLink[];
  title?: string;
}) {
  if (links.length < 3) return null;

  return (
    <section className="py-12 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <nav aria-label="Related pages">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 hover:text-primary text-sm font-medium transition-all"
                >
                  <ArrowRight className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
