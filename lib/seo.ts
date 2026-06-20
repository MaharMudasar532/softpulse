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
  streetAddress: "176-FF Al Rehman Trade Center",
  city: "Sargodha",
  region: "Punjab",
  country: "PK",
  description: defaultSiteSettings.hero_subtitle,
  logo: `${SITE_URL}/logo.jpeg`,
  founder: "Mahar Mudassar",
};

/** Off-page brand profiles — used in schema.org sameAs + footer */
export const socialProfiles = {
  website: SITE_URL,
  email: `mailto:${business.email}`,
  whatsapp: "https://wa.me/923478787881",
  fiverr: "https://www.fiverr.com/developerpro532",
  upwork: "https://www.upwork.com/freelancers/mudassara81",
  googleMaps:
    "https://www.google.com/maps/search/Al+Rehman+Trade+Center+Sargodha+Pakistan",
};

export const seoKeywords = {
  general: [
    "SoftPulse",
    "SoftPulse Sargodha",
    "software house Sargodha",
    "IT company Sargodha",
    "IT training institute Sargodha",
    "software house Pakistan",
    "web development Sargodha",
    "mobile app development Sargodha",
    "best IT institute Sargodha",
    "tech company Sargodha Punjab",
  ],
  courses: [
    "IT courses in Sargodha",
    "courses in Sargodha",
    "best IT courses Sargodha",
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
    "learn programming Sargodha",
    "IT institute near me Sargodha",
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
    "hire developers Sargodha",
    "app development company Sargodha",
  ],
  local: [
    "Al Rehman Trade Center Sargodha",
    "IT company near Sargodha",
    "software house Punjab Pakistan",
  ],
};

export const coursesFaq = [
  {
    question: "What IT courses are available in Sargodha at SoftPulse?",
    answer:
      "SoftPulse offers React.js, React Native, MERN Stack, and Shopify development courses in Sargodha. All courses are hands-on, project-based, and taught by working developers at our Al Rehman Trade Center campus.",
  },
  {
    question: "Where is SoftPulse IT training institute located in Sargodha?",
    answer:
      "We are located at 176-FF Al Rehman Trade Center, Sargodha, Punjab, Pakistan. You can visit us in person or apply online through our course pages.",
  },
  {
    question: "How long are the programming courses in Sargodha?",
    answer:
      "Course durations vary: React.js is 4 months, React Native and MERN Stack are 5 months each, and Shopify development is 2 months. Each includes live mentorship and portfolio projects.",
  },
  {
    question: "Do I need prior experience to join IT courses in Sargodha?",
    answer:
      "No prior coding experience is required for most courses. Our React.js course starts from basics and progresses to production deployment. Check each course page for specific prerequisites.",
  },
  {
    question: "How do I enroll in a course at SoftPulse Sargodha?",
    answer:
      "Visit any course page on softpulse.org, fill out the application form, or contact us via WhatsApp at +92 347 8787881 or email info@softpulse.org. We respond within 24 hours.",
  },
];

export const servicesFaq = [
  {
    question: "What software development services does SoftPulse offer in Sargodha?",
    answer:
      "SoftPulse provides mobile app development, React Native apps, web development with Next.js and React, Shopify store development, UI/UX design, and AI integrations for businesses in Sargodha and worldwide.",
  },
  {
    question: "Why choose SoftPulse as your software house in Sargodha?",
    answer:
      "We have delivered 50+ projects, trained 500+ students, and maintain 98% client satisfaction. Our team ships real apps on Google Play and the App Store, including PacePal, Whenn, and SHOOF.",
  },
  {
    question: "Does SoftPulse work with clients outside Sargodha?",
    answer:
      "Yes. While we are based in Sargodha, Pakistan, we serve clients globally through Upwork and Fiverr, as well as direct contracts for web, mobile, and e-commerce projects.",
  },
  {
    question: "How can I get a quote for a project in Sargodha?",
    answer:
      "Contact us through the website contact form, WhatsApp at +92 347 8787881, or email info@softpulse.org. We offer free consultations Monday to Friday, 9 AM to 6 PM EST.",
  },
];

export const homeFaq = [
  {
    question: "Is SoftPulse a software house or IT training institute?",
    answer:
      "SoftPulse is both — a software house that builds web and mobile products, and an IT training institute offering programming courses in Sargodha, Pakistan.",
  },
  {
    question: "What makes SoftPulse the best IT company in Sargodha?",
    answer:
      "We combine real-world project experience with hands-on training. Our developers build production apps while teaching the same technologies — React, Laravel, MERN, Shopify, and React Native — to students in Sargodha.",
  },
];

type PageSeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

type BreadcrumbItem = { name: string; path: string };

export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  type = "website",
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const allKeywords = [
    ...new Set([...keywords, ...seoKeywords.general, ...seoKeywords.local]),
  ];

  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: business.name, url: SITE_URL }],
    creator: business.name,
    publisher: business.name,
    category: "technology",
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
          alt: `${business.name} — Software House & IT Training Institute, Sargodha, Pakistan`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${business.name}`,
      description,
      images: [business.logo],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
  };
}

export const rootMetadata: Metadata = {
  ...buildPageMetadata({
    title: "Software House & IT Training Institute in Sargodha",
    description:
      "SoftPulse — #1 software house & IT training institute in Sargodha, Pakistan. Web & mobile app development, Laravel, React, MERN, Shopify services + IT courses. Al Rehman Trade Center, Sargodha.",
    path: "/",
    keywords: [...seoKeywords.courses, ...seoKeywords.services],
  }),
  title: {
    default:
      "SoftPulse — Software House & IT Courses in Sargodha, Pakistan",
    template: "%s | SoftPulse",
  },
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
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

export function faqJsonLd(
  faqs: { question: string; answer: string }[]
) {
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

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: business.name,
    legalName: business.legalName,
    url: business.url,
    logo: business.logo,
    image: business.logo,
    description: business.description,
    email: business.email,
    telephone: business.phone,
    founder: {
      "@type": "Person",
      name: business.founder,
      jobTitle: "Founder & CEO",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: "40100",
      addressCountry: business.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.0836,
      longitude: 72.6711,
    },
    areaServed: [
      { "@type": "City", name: "Sargodha" },
      { "@type": "State", name: "Punjab" },
      { "@type": "Country", name: "Pakistan" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
      bestRating: "5",
    },
    sameAs: [
      socialProfiles.website,
      socialProfiles.whatsapp,
      socialProfiles.fiverr,
      socialProfiles.upwork,
      socialProfiles.googleMaps,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SoftPulse Services & Courses in Sargodha",
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

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: business.name,
    url: business.url,
    description: business.description,
    inLanguage: "en-PK",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "SoftPulse — Software House & IT Courses in Sargodha",
    description: business.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: business.logo,
    inLanguage: "en-PK",
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
    react: "React.js Course in Sargodha — Learn Web Development",
    "react-native": "React Native Course in Sargodha — Mobile App Training",
    "mern-stack": "MERN Stack Course in Sargodha — Full Stack JavaScript",
    shopify: "Shopify Development Course in Sargodha — E-commerce Training",
  };
  return titles[course.slug] || `${course.title} in Sargodha`;
}

export function courseSeoDescription(course: (typeof courses)[number]) {
  return `Join the best ${course.title.toLowerCase()} in Sargodha at SoftPulse IT institute. ${course.duration}, ${course.level}. Hands-on projects, live mentorship — Al Rehman Trade Center, Sargodha, Pakistan. Apply now.`;
}

export function courseJsonLd(course: (typeof courses)[number]) {
  return {
    "@type": "Course",
    name: courseSeoTitle(course),
    description: course.description,
    url: `${SITE_URL}/courses/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: business.name,
      url: business.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.streetAddress,
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
    offers: {
      "@type": "Offer",
      category: "IT Training",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/courses/${course.slug}`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["onsite", "online"],
      courseWorkload: course.duration,
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
        serviceType: service.title,
      },
    })),
  };
}

export function portfolioJsonLd(item: {
  title: string;
  description: string;
  slug: string | null;
  category: string;
  image_url?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${item.title} — SoftPulse Portfolio`,
    description: item.description,
    url: `${SITE_URL}/portfolio/${item.slug || ""}`,
    creator: { "@id": `${SITE_URL}/#organization` },
    genre: item.category,
    image: item.image_url || business.logo,
  };
}
