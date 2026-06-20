import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center max-w-2xl mx-auto mb-16", className)}>
      {label && (
        <span
          className={cn(
            "inline-block text-sm font-semibold uppercase tracking-widest mb-3",
            light ? "text-blue-200" : "text-primary"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight mb-4",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lg leading-relaxed",
            light ? "text-blue-100" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
