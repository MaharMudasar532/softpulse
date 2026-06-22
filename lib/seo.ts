import type { Metadata } from "next";
import type { Course } from "@/lib/types";
import {
  caseStudies,
  servicePages,
  trainingPages,
  type CaseStudy,
  type ServicePage,
  type TrainingPage,
} from "@/lib/data/pages";
import { defaultSiteSettings } from "@/lib/data/site-settings";

export const CANONICAL_BASE = "https://softpulse.org";

function normalizeOrigin(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.protocol = "https:";
    if (parsed.hostname.startsWith("www.")) {
      parsed.hostname = parsed.hostname.slice(4);
    }
    return parsed.origin;
  } catch {
    return CANONICAL_BASE;
  }
}

export const SITE_URL = normalizeOrigin(
  process.env.NEXT_PUBLIC_SITE_URL || defaultSiteSettings.website_url
);

export function canonicalUrl(path = ""): string {
  if (!path || path === "/") return CANONICAL_BASE;
  return `${CANONICAL_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export const business = {
  name: defaultSiteSettings.site_name,
  url: SITE_URL,
  email: defaultSiteSettings.contact_email,
  phone: defaultSiteSettings.contact_phone,
  address: defaultSiteSettings.contact_address,
  streetAddress: "176-FF Al Rehman Trade Center",
  city: "Sargodha",
  region: "Punjab",
  country: "PK",
  description: defaultSiteSettings.hero_subtitle,
  logo: `${SITE_URL}/logo.jpeg`,
  founder: "Mahar Mudassar",
};

export const socialProfiles = {
  website: SITE_URL,
  whatsapp: "https://wa.me/923478787881",
  fiverr: "https://www.fiverr.com/developerpro532",
  upwork: "https://www.upwork.com/freelancers/mudassara81",
  googleMaps:
    "https://www.google.com/maps/search/Al+Rehman+Trade+Center+Sargodha+Pakistan",
};

/** Keywords live in meta tags only — not repeated in visible page copy */
export const seoKeywords = {
  home: [
    "Software House in Sargodha",
    "Mobile App Development Company",
    "React Native Development",
    "IT Training Institute in Sargodha",
    "software house Pakistan",
  ],
  services: [
    "React Native Development Company Pakistan",
    "Mobile App Development Company Pakistan",
    "Software House Sargodha",
    "MERN Stack Developers",
    "Shopify App Development",
  ],
  training: [
    "React Native Course Sargodha",
    "MERN Stack Course Sargodha",
    "React JS Course Sargodha",
    "Web Development Course Sargodha",
    "Node.js Course Sargodha",
    "mobile app development course Sargodha",
  ],
};

type PageSeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = canonicalUrl(path);
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    authors: [{ name: business.name, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_PK",
      url,
      siteName: business.name,
      title,
      description,
      images: [{ url: business.logo, width: 512, height: 512, alt: business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [business.logo],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
  };
}

export const rootMetadata: Metadata = {
  ...buildPageMetadata({
    title:
      "SoftPulse | Software House & IT Training Institute in Sargodha | React Native, MERN Stack Courses",
    description:
      "SoftPulse is a software house and IT training institute in Sargodha offering React Native, MERN Stack, and modern app development courses with real projects and hands-on mentorship.",
    path: "/",
    keywords: [
      ...seoKeywords.home,
      ...seoKeywords.services,
      ...seoKeywords.training,
    ],
  }),
  title: {
    default:
      "SoftPulse | Software House & IT Training Institute in Sargodha | React Native, MERN Stack Courses",
    template: "%s | SoftPulse",
  },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: business.name,
    url: business.url,
    logo: business.logo,
    description: business.description,
    email: business.email,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    areaServed: { "@type": "Country", name: "Pakistan" },
    sameAs: [
      socialProfiles.website,
      socialProfiles.whatsapp,
      socialProfiles.fiverr,
      socialProfiles.upwork,
      socialProfiles.googleMaps,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services & Training",
      itemListElement: [
        ...servicePages.map((p, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: p.metaTitle,
            url: `${SITE_URL}/${p.slug}`,
          },
        })),
        ...trainingPages.map((p, i) => ({
          "@type": "Offer",
          position: servicePages.length + i + 1,
          itemOffered: {
            "@type": "Course",
            name: p.metaTitle,
            url: `${SITE_URL}/${p.slug}`,
          },
        })),
      ],
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: business.name,
    url: business.url,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "SoftPulse | Software House & IT Training Institute in Sargodha",
    description:
      "Software house and IT training institute offering mobile app development services and React Native, MERN Stack, and web development courses.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-PK",
  };
}

export function homeCoursesSchemaJsonLd() {
  return trainingPages.map((page) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: page.metaTitle,
    description: page.metaDescription,
    url: canonicalUrl(`/${page.slug}`),
    provider: { "@id": `${CANONICAL_BASE}/#organization` },
  }));
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${CANONICAL_BASE}/#organization`,
    name: business.name,
    url: CANONICAL_BASE,
    logo: business.logo,
    email: business.email,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    sameAs: [
      socialProfiles.website,
      socialProfiles.whatsapp,
      socialProfiles.fiverr,
      socialProfiles.upwork,
      socialProfiles.googleMaps,
    ],
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd(page: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.headline,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Pakistan" },
  };
}

export function trainingJsonLd(page: TrainingPage, course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: page.metaTitle,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    educationalLevel: course.level,
    timeRequired: course.duration,
    teaches: course.tools.join(", "),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["onsite", "online"],
      courseWorkload: course.duration,
    },
  };
}

export function caseStudyJsonLd(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.metaTitle,
    description: study.metaDescription,
    url: `${SITE_URL}/case-study-${study.slug}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function servicesHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software Development Services",
    url: `${SITE_URL}/services`,
    itemListElement: servicePages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: p.headline, url: `${SITE_URL}/${p.slug}` },
    })),
  };
}

export function trainingHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IT Training Courses",
    url: `${SITE_URL}/training`,
    itemListElement: trainingPages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Course", name: p.headline, url: `${SITE_URL}/${p.slug}` },
    })),
  };
}

export function getServicePageMetadata(page: ServicePage): Metadata {
  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
    keywords: [...page.keywords, ...seoKeywords.services],
  });
}

export function getTrainingPageMetadata(page: TrainingPage): Metadata {
  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
    keywords: [...page.keywords, ...seoKeywords.training],
  });
}

export function portfolioJsonLd(item: {
  title: string;
  description: string;
  slug: string | null;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.description,
    url: `${SITE_URL}/portfolio/${item.slug}`,
    genre: item.category,
    creator: { "@id": `${SITE_URL}/#organization` },
  };
}

export function getCaseStudyMetadata(study: CaseStudy): Metadata {
  return buildPageMetadata({
    title: study.metaTitle,
    description: study.metaDescription,
    path: `/case-study-${study.slug}`,
    keywords: study.keywords,
  });
}
