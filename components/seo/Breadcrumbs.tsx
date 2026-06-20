import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { name: string; path: string };

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: BreadcrumbItem[];
  light?: boolean;
}) {
  const allItems = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <JsonLd data={breadcrumbJsonLd(allItems)} />
      <ol
        className={`flex flex-wrap items-center gap-1 text-sm ${light ? "text-blue-200" : "text-muted"}`}
      >
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${light ? "text-blue-300/60" : "text-muted/60"}`}
                />
              )}
              {isLast ? (
                <span
                  className={`font-medium ${light ? "text-white" : "text-foreground"}`}
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className={`transition-colors ${light ? "hover:text-white" : "hover:text-primary"}`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
