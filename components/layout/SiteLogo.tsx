import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

type SiteLogoProps = {
  settings: SiteSettings;
  variant?: "light" | "dark";
};

export function SiteLogo({ settings, variant = "dark" }: SiteLogoProps) {
  const name = settings.site_name || "SoftPulse";
  const [first, ...rest] = name.split(/(?=[A-Z])/);
  const displayFirst = first || name.slice(0, 4);
  const displayRest = rest.join("") || name.slice(displayFirst.length);

  return (
    <Link href="/" className="flex items-center gap-2 group">
      {settings.logo_url ? (
        <Image
          src={settings.logo_url}
          alt={`${name} — Software House & IT Training Institute`}
          width={36}
          height={36}
          className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-primary/30"
        />
      ) : (
        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/30">
          <Zap className="w-5 h-5 text-white" />
        </div>
      )}
      <span
        className={`text-xl font-bold ${variant === "light" ? "text-white" : "text-foreground"}`}
      >
        {displayRest ? (
          <>
            {displayFirst}
            <span className="text-primary">{displayRest}</span>
          </>
        ) : (
          name
        )}
      </span>
    </Link>
  );
}
