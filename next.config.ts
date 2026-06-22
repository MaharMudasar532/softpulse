import type { NextConfig } from "next";

const serviceSlugs = [
  "react-native-development",
  "mobile-app-development",
  "web-development-services",
  "shopify-app-development",
  "mern-stack-development",
  "ui-ux-design",
];

const trainingSlugs = [
  "react-native-course-sargodha",
  "react-js-course-sargodha",
  "mern-stack-course-sargodha",
  "nodejs-course-sargodha",
  "web-development-course-sargodha",
  "mobile-app-development-course-sargodha",
];

const servicePathRedirects = serviceSlugs.map((slug) => ({
  source: `/services/${slug}`,
  destination: `/${slug}`,
  permanent: true,
}));

const trainingPathRedirects = trainingSlugs.map((slug) => ({
  source: `/training/${slug}`,
  destination: `/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  trailingSlash: false,
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
        source: "/:path*",
        has: [{ type: "host", value: "www.softpulse.org" }],
        destination: "https://softpulse.org/:path*",
        permanent: true,
      },
      ...servicePathRedirects,
      ...trainingPathRedirects,
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
