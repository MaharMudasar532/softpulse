"use client";

type StoreButtonsProps = {
  googlePlayUrl?: string | null;
  appleStoreUrl?: string | null;
  size?: "sm" | "md";
  className?: string;
};

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.004 1.004 0 0 1-.61-.92V2.734a1.004 1.004 0 0 1 .609-.92zm3.596 4.403l9.342 5.405-2.896 2.896-6.446-6.45zm-.01 8.967l6.443 6.443 2.898-2.898-9.34-5.405zM20.39 10.66l-2.52-1.456 2.896-2.896 1.02 1.02a1.5 1.5 0 0 1 0 2.332l-1.396 1z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function StoreButtons({
  googlePlayUrl,
  appleStoreUrl,
  size = "md",
  className = "",
}: StoreButtonsProps) {
  if (!googlePlayUrl && !appleStoreUrl) return null;

  const sizeClasses =
    size === "sm"
      ? "px-3 py-2 text-xs gap-2"
      : "px-5 py-3 text-sm gap-3";

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {googlePlayUrl && (
        <a
          href={googlePlayUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center ${sizeClasses} rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors`}
        >
          <GooglePlayIcon className={iconSize} />
          Google Play
        </a>
      )}
      {appleStoreUrl && (
        <a
          href={appleStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center ${sizeClasses} rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors`}
        >
          <AppleIcon className={iconSize} />
          App Store
        </a>
      )}
    </div>
  );
}

export function StoreButtonsLink({
  googlePlayUrl,
  appleStoreUrl,
  size = "sm",
}: StoreButtonsProps) {
  return (
    <StoreButtons
      googlePlayUrl={googlePlayUrl}
      appleStoreUrl={appleStoreUrl}
      size={size}
    />
  );
}
