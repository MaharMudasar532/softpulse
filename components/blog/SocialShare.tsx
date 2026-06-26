"use client";

import { Link2, Share2 } from "lucide-react";

const SITE_URL = "https://softpulse.org";

export function SocialShare({ title, slug }: { title: string; slug: string }) {
  const url = `${SITE_URL}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      text: "X",
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      text: "in",
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      text: "f",
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-blue-100 mr-1 flex items-center gap-1.5">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      {shareLinks.map(({ label, href, text }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center text-sm font-bold text-white hover:bg-white/20 transition-colors"
        >
          {text}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
}
