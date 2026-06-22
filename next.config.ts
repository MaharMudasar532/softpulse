import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/courses/react",
        destination: "/react-js-course-sargodha",
        permanent: true,
      },
      {
        source: "/courses/react-native",
        destination: "/react-native-course-sargodha",
        permanent: true,
      },
      {
        source: "/courses/mern-stack",
        destination: "/mern-stack-course-sargodha",
        permanent: true,
      },
      { source: "/courses/shopify", destination: "/training", permanent: true },
      { source: "/courses/:slug", destination: "/training", permanent: true },
      { source: "/courses", destination: "/training", permanent: true },
    ];
  },
};

export default nextConfig;
