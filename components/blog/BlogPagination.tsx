import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  searchParams?: Record<string, string>;
};

function buildHref(
  page: number,
  basePath: string,
  searchParams?: Record<string, string>
) {
  const params = new URLSearchParams(searchParams);
  if (page > 1) params.set("page", String(page));
  else params.delete("page");
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath = "/blog",
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Blog pagination"
      className="flex items-center justify-center gap-2 mt-12"
    >
      <Link
        href={buildHref(currentPage - 1, basePath, searchParams)}
        aria-disabled={currentPage <= 1}
        className={cn(
          "inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-border text-sm font-medium transition-colors",
          currentPage <= 1
            ? "pointer-events-none opacity-40"
            : "hover:border-primary/30 hover:text-primary"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Link>

      <div className="hidden sm:flex items-center gap-1">
        {pages.map((page) => (
          <Link
            key={page}
            href={buildHref(page, basePath, searchParams)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium border transition-colors",
              page === currentPage
                ? "bg-primary text-white border-primary"
                : "border-border hover:border-primary/30 hover:text-primary"
            )}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      <span className="sm:hidden text-sm text-muted px-2">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={buildHref(currentPage + 1, basePath, searchParams)}
        aria-disabled={currentPage >= totalPages}
        className={cn(
          "inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-border text-sm font-medium transition-colors",
          currentPage >= totalPages
            ? "pointer-events-none opacity-40"
            : "hover:border-primary/30 hover:text-primary"
        )}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
}
