import Link from "next/link";
import type { BlogHeading } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

export function TableOfContents({
  headings,
  className,
}: {
  headings: BlogHeading[];
  className?: string;
}) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "bg-blue-50 rounded-2xl border border-border p-6 sticky top-24",
        className
      )}
    >
      <h2 className="font-bold text-sm uppercase tracking-wider text-primary mb-4">
        On This Page
      </h2>
      <ol className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={
              heading.level === 3 ? "pl-4" : heading.level === 4 ? "pl-8" : undefined
            }
          >
            <Link
              href={`#${heading.id}`}
              className="text-muted hover:text-primary transition-colors leading-snug block"
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
