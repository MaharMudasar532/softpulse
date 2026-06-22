import type { MetadataRoute } from "next";
import { business } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name} — Software House & IT Training`,
    short_name: business.name,
    description: business.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
    lang: "en-PK",
    categories: ["business", "education", "technology"],
  };
}
