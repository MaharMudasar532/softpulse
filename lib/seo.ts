import type { Metadata } from "next";
import { courses, services } from "@/lib/data/static";
import { defaultSiteSettings } from "@/lib/data/site-settings";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || defaultSiteSettings.website_url;

export const business = {
  name: defaultSiteSettings.site_name,
  legalName: "SoftPulse",
  url: SITE_URL,
  email: defaultSiteSettings.contact_email,
  phone: defaultSiteSettings.contact_phone,
  address: defaultSiteSettings.contact_address,
  city: "Sargodha",
  region: "Punjab",
  country: "PK",
  description: defaultSiteSettings.hero_subtitle,
  logo: `${SITE_URL}/logo.jpeg`,
};

export const seoKeywords = {
  general: [
    "SoftPulse",
    "software house Sargodha",
    "IT company Sargodha",
    "IT training institute Sargodha",
    "software house Pakistan",
    "web development Sargodha",
    "mobile app development Sargodha",
  ],
  courses: [
    "IT courses in Sargodha",
    "courses in Sargodha",
    "web development course Sargodha",
    "React course Sargodha",
    "React Native course Sargodha",
    "MERN stack course Sargodha",
    "Shopify course Sargodha",
    "JavaScript course Sargodha",
    "programming courses Sargodha",
    "computer courses Sargodha",
    "IT training Sargodha Pakistan",
    "software training institute Sargodha",
    "coding classes Sargodha",
    "tech courses Sargodha",
  ],
  services: [
    "software development services Sargodha",
    "web development services Sargodha",
    "mobile app development Sargodha",
    "React Native development Sargodha",
    "Shopify development Sargodha",
    "Laravel development Sargodha",
    "MERN stack development Sargodha",
    "UI UX design Sargodha",
    "software house services Sargodha",
    "IT services Sargodha Pakistan",
    "custom software development Sargodha",
    "ecommerce development Sargodha",
  ],
};

type PageSeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  type = "website",
}: PageSeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const allKeywords = [...new Set([...keywords, ...seoKeywords.general])];

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_PK",
      url,
      siteName: business.name,
      title: `${title} | ${business.name}`,
      description,
      images: [
        {
          url: business.logo,
          width: 512,
          height: 512,
          alt: `${business.name} — Software House & IT Training Institute, Sargodha`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${business.name}`,
      description,
      images: [business.logo],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const rootMetadata: Metadata = {
  ...buildPageMetadata({
    title: "Software House & IT Training Institute in Sargodha",
    description:
      "SoftPulse is a leading software house and IT training institute in Sargodha, Pakistan. Web & mobile app development, Laravel, React, MERN, Shopify services — plus hands-on IT courses for students.",
    path: "/",
    keywords: [...seoKeywords.courses, ...seoKeywords.services],
  }),
  title: {
    default: "SoftPulse — Software House & IT Courses in Sargodha, Pakistan",
    template: "%s | SoftPulse",
  },
};

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: business.name,
    url: business.url,
    logo: business.logo,
    image: business.logo,
    description: business.description,
    email: business.email,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "176-FF Al Rehman Trade Center",
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.0836,
      longitude: 72.6711,
    },
    areaServed: {
      "@type": "City",
      name: "Sargodha",
    },
    priceRange: "$$",
    sameAs: [business.url],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SoftPulse Services & Courses",
      itemListElement: [
        ...services.map((service, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: `${service.title} in Sargodha`,
            description: service.description,
            areaServed: "Sargodha, Pakistan",
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
        ...courses.map((course, i) => ({
          "@type": "Offer",
          position: services.length + i + 1,
          itemOffered: {
            "@type": "Course",
            name: `${course.title} in Sargodha`,
            description: course.description,
            provider: { "@id": `${SITE_URL}/#organization` },
            educationalLevel: course.level,
            timeRequired: course.duration,
            url: `${SITE_URL}/courses/${course.slug}`,
          },
        })),
      ],
    },
  };
}

export function coursesPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IT Courses in Sargodha",
    description:
      "Hands-on programming and web development courses at SoftPulse IT training institute in Sargodha, Pakistan.",
    url: `${SITE_URL}/courses`,
    numberOfItems: courses.length,
    itemListElement: courses.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: courseJsonLd(course),
    })),
  };
}

export function courseSeoTitle(course: (typeof courses)[number]) {
  const titles: Record<string, string> = {
    react: "React.js Course in Sargodha",
    "react-native": "React Native Course in Sargodha",
    "mern-stack": "MERN Stack Course in Sargodha",
    shopify: "Shopify Development Course in Sargodha",
  };
  return titles[course.slug] || `${course.title} in Sargodha`;
}

export function courseSeoDescription(course: (typeof courses)[number]) {
  return `${course.description} Enroll at SoftPulse IT training institute in Sargodha, Pakistan — ${course.duration}, ${course.level}. Located at Al Rehman Trade Center, Sargodha.`;
}

export function courseJsonLd(course: (typeof courses)[number]) {
  return {
    "@type": "Course",
    name: `${course.title} in Sargodha`,
    description: course.description,
    url: `${SITE_URL}/courses/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: business.name,
      url: business.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: business.city,
        addressRegion: business.region,
        addressCountry: business.country,
      },
    },
    educationalLevel: course.level,
    timeRequired: course.duration,
    teaches: course.tools.join(", "),
    inLanguage: "en",
    availableLanguage: ["en", "ur"],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: {
        "@type": "Place",
        name: business.name,
        address: business.address,
      },
    },
  };
}

export function servicesPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software Development Services in Sargodha",
    description:
      "Professional web, mobile, Shopify, and UI/UX development services by SoftPulse software house in Sargodha, Pakistan.",
    url: `${SITE_URL}/services`,
    numberOfItems: services.length,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: `${service.title} in Sargodha`,
        description: service.description,
        url: `${SITE_URL}/services#${service.id}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "City",
          name: "Sargodha",
        },
      },
    })),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: business.url,
    description: business.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/courses?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
