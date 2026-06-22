import type { Course } from "@/lib/types";
import { courses, services } from "@/lib/data/static";

export type ServicePage = {
  slug: string;
  serviceId: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  benefits: string[];
  process: { step: string; title: string; description: string }[];
};

export type TrainingPage = {
  slug: string;
  courseSlug: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  applyTitle: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  features: string[];
  portfolioSlug?: string;
  image?: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "react-native-development",
    serviceId: "react-native",
    headline: "React Native Development",
    subheadline:
      "Cross-platform mobile apps for iOS and Android — one codebase, native performance, App Store ready.",
    metaTitle: "React Native Development Company Pakistan | SoftPulse",
    metaDescription:
      "Hire expert React Native developers in Pakistan. SoftPulse builds production iOS & Android apps with Expo, TypeScript, and native integrations. Apps live on Play Store & App Store.",
    keywords: [
      "React Native Development Company Pakistan",
      "React Native developers Pakistan",
      "React Native app development",
      "cross-platform mobile apps",
    ],
    benefits: [
      "Single codebase for iOS and Android",
      "Faster time-to-market vs native",
      "Expo and bare workflow expertise",
      "App Store & Play Store publishing",
      "OTA updates and performance tuning",
    ],
    process: [
      { step: "01", title: "Discovery", description: "Requirements, user flows, and technical architecture." },
      { step: "02", title: "Design & Build", description: "UI implementation, APIs, and device integrations." },
      { step: "03", title: "Test & Launch", description: "QA, store submission, and post-launch support." },
    ],
  },
  {
    slug: "mobile-app-development",
    serviceId: "mobile-app",
    headline: "Mobile App Development",
    subheadline:
      "End-to-end mobile product development — from idea to published app on Google Play and the App Store.",
    metaTitle: "Mobile App Development Company Pakistan | SoftPulse",
    metaDescription:
      "SoftPulse is a mobile app development company in Pakistan shipping fintech, e-commerce, and social apps. React Native, GPS, payments, and scalable backends.",
    keywords: [
      "Mobile App Development Company Pakistan",
      "mobile app developers Pakistan",
      "iOS Android app development",
      "app development company",
    ],
    benefits: [
      "Production apps with real users",
      "GPS, maps, payments & push notifications",
      "Secure authentication & APIs",
      "Analytics and crash monitoring",
      "Ongoing maintenance contracts",
    ],
    process: [
      { step: "01", title: "Strategy", description: "Define MVP scope, platforms, and success metrics." },
      { step: "02", title: "Development", description: "Agile sprints with weekly demos and feedback." },
      { step: "03", title: "Scale", description: "Launch, monitor, iterate, and grow your user base." },
    ],
  },
  {
    slug: "web-development-services",
    serviceId: "web",
    headline: "Web Development Services",
    subheadline:
      "Modern web applications with Next.js, React, and cloud deployment — fast, SEO-friendly, and built to scale.",
    metaTitle: "Web Development Services Pakistan | SoftPulse",
    metaDescription:
      "Professional web development services — SaaS dashboards, e-commerce platforms, and business portals. Next.js, React, TypeScript, and cloud hosting.",
    keywords: [
      "web development services Pakistan",
      "Next.js development company",
      "React web development",
      "custom web applications",
    ],
    benefits: [
      "SEO-optimized Next.js applications",
      "Responsive, accessible interfaces",
      "API integration & authentication",
      "Cloud deployment on Vercel/AWS",
      "Performance and Core Web Vitals",
    ],
    process: [
      { step: "01", title: "Planning", description: "Wireframes, tech stack, and project roadmap." },
      { step: "02", title: "Build", description: "Frontend, backend APIs, and database design." },
      { step: "03", title: "Deploy", description: "Production launch with monitoring and support." },
    ],
  },
  {
    slug: "shopify-app-development",
    serviceId: "shopify",
    headline: "Shopify App Development",
    subheadline:
      "Custom Shopify themes, apps, and store optimization — built to convert and scale your e-commerce brand.",
    metaTitle: "Shopify App Development Pakistan | SoftPulse",
    metaDescription:
      "Shopify app development and custom store builds. Liquid themes, Shopify APIs, headless commerce, and conversion-focused e-commerce solutions.",
    keywords: [
      "Shopify App Development",
      "Shopify developers Pakistan",
      "Shopify custom apps",
      "Shopify store development",
    ],
    benefits: [
      "Custom Liquid themes & sections",
      "Shopify app extensions & APIs",
      "Checkout and cart optimization",
      "Inventory & fulfillment integrations",
      "Conversion rate improvements",
    ],
    process: [
      { step: "01", title: "Audit", description: "Store review, goals, and conversion opportunities." },
      { step: "02", title: "Build", description: "Theme customization, apps, and integrations." },
      { step: "03", title: "Grow", description: "Launch campaigns and ongoing optimization." },
    ],
  },
  {
    slug: "mern-stack-development",
    serviceId: "web",
    headline: "MERN Stack Development",
    subheadline:
      "Full-stack JavaScript solutions with MongoDB, Express, React, and Node.js — from API to dashboard.",
    metaTitle: "MERN Stack Developers Pakistan | SoftPulse",
    metaDescription:
      "Hire MERN stack developers for SaaS, dashboards, and APIs. MongoDB, Express.js, React, Node.js — production-ready full-stack applications.",
    keywords: [
      "MERN Stack Developers",
      "MERN stack development Pakistan",
      "full stack JavaScript developers",
      "Node.js React MongoDB",
    ],
    benefits: [
      "RESTful & GraphQL APIs",
      "MongoDB schema design",
      "JWT auth & role-based access",
      "Real-time with WebSockets",
      "Docker & cloud deployment",
    ],
    process: [
      { step: "01", title: "Architecture", description: "Database models, API contracts, and frontend structure." },
      { step: "02", title: "Full Stack Build", description: "Parallel frontend and backend development." },
      { step: "03", title: "Production", description: "Testing, security hardening, and go-live." },
    ],
  },
  {
    slug: "ui-ux-design",
    serviceId: "ui-ux",
    headline: "UI/UX Design",
    subheadline:
      "User-centered design that drives engagement — wireframes, prototypes, and pixel-perfect interfaces.",
    metaTitle: "UI UX Design Services Pakistan | SoftPulse",
    metaDescription:
      "UI/UX design for web and mobile products. User research, wireframing, Figma prototypes, and design systems that convert.",
    keywords: [
      "UI UX design Pakistan",
      "mobile app UI design",
      "web design services",
      "product design agency",
    ],
    benefits: [
      "User research & journey mapping",
      "Wireframes & interactive prototypes",
      "Design systems & component libraries",
      "Mobile-first responsive design",
      "Developer-ready Figma handoff",
    ],
    process: [
      { step: "01", title: "Research", description: "User interviews, competitors, and pain points." },
      { step: "02", title: "Design", description: "Wireframes, UI kits, and prototype testing." },
      { step: "03", title: "Deliver", description: "Final assets and developer collaboration." },
    ],
  },
];

export const trainingPages: TrainingPage[] = [
  {
    slug: "react-native-course-sargodha",
    courseSlug: "react-native",
    headline: "React Native Development Course",
    subheadline:
      "5-month intensive program — from JavaScript fundamentals to publishing apps on iOS and Android.",
    metaTitle: "React Native Course Sargodha | SoftPulse Training",
    metaDescription:
      "React Native course in Sargodha — learn mobile app development with hands-on projects, mentor sessions, and App Store publishing. Enroll at SoftPulse IT training institute.",
    keywords: ["React Native Course Sargodha", "React Native training", "mobile app course"],
    applyTitle: "React Native Development Course",
  },
  {
    slug: "react-js-course-sargodha",
    courseSlug: "react",
    headline: "React.js Full Stack Course",
    subheadline:
      "4-month journey from HTML & CSS to React.js and production deployment.",
    metaTitle: "React JS Course Sargodha | SoftPulse Training",
    metaDescription:
      "React JS course in Sargodha — master JavaScript, React, and modern web development with 3 portfolio projects. Beginner-friendly with job-ready skills.",
    keywords: ["React JS Course Sargodha", "React course Pakistan", "JavaScript course"],
    applyTitle: "React.js Full Stack Course",
  },
  {
    slug: "mern-stack-course-sargodha",
    courseSlug: "mern-stack",
    headline: "MERN Stack Development Course",
    subheadline:
      "5-month full-stack program — MongoDB, Express, React, and Node.js from zero to production.",
    metaTitle: "MERN Stack Course Sargodha | SoftPulse Training",
    metaDescription:
      "MERN stack course in Sargodha — become a full-stack JavaScript developer. Build APIs, databases, and React frontends with a capstone SaaS project.",
    keywords: ["MERN Stack Course Sargodha", "full stack course", "Node.js MongoDB React"],
    applyTitle: "MERN Stack Development Course",
  },
  {
    slug: "nodejs-course-sargodha",
    courseSlug: "mern-stack",
    headline: "Node.js Backend Development Course",
    subheadline:
      "Master server-side JavaScript — Express APIs, MongoDB, authentication, and deployment.",
    metaTitle: "Node.js Course Sargodha | SoftPulse Training",
    metaDescription:
      "Node.js course in Sargodha — learn Express.js, REST APIs, MongoDB, JWT auth, and backend deployment. Part of our MERN stack training program.",
    keywords: ["Node.js Course Sargodha", "Node.js training", "backend development course"],
    applyTitle: "Node.js Backend Development Course",
  },
  {
    slug: "web-development-course-sargodha",
    courseSlug: "react",
    headline: "Web Development Course",
    subheadline:
      "Complete web development training — HTML, CSS, JavaScript, React, and live project deployment.",
    metaTitle: "Web Development Course Sargodha | SoftPulse Training",
    metaDescription:
      "Web development course in Sargodha — learn frontend development from scratch. HTML, CSS, JavaScript, React.js with portfolio projects and certification.",
    keywords: ["Web Development Course Sargodha", "web dev training", "frontend course"],
    applyTitle: "Web Development Course",
  },
  {
    slug: "mobile-app-development-course-sargodha",
    courseSlug: "react-native",
    headline: "Mobile App Development Course",
    subheadline:
      "Build and publish real mobile apps — React Native, device APIs, and store deployment.",
    metaTitle: "Mobile App Development Course Sargodha | SoftPulse",
    metaDescription:
      "Mobile app development course in Sargodha — learn to build iOS & Android apps with React Native. Hands-on projects and App Store publishing guidance.",
    keywords: ["mobile app development course Sargodha", "app development training", "iOS Android course"],
    applyTitle: "Mobile App Development Course",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "karzame",
    client: "Karzame",
    title: "Fintech Mobile Platform",
    category: "React Native · Fintech",
    metaTitle: "Case Study: Karzame Fintech App | SoftPulse",
    metaDescription:
      "How SoftPulse built a secure fintech mobile platform with React Native — authentication, real-time transactions, and scalable backend architecture.",
    keywords: ["fintech app development", "React Native case study", "mobile banking app"],
    challenge:
      "Karzame needed a secure, bilingual mobile platform for financial services with real-time data, user authentication, and a polished UX that builds trust with first-time users.",
    solution:
      "We architected a React Native application with secure token-based auth, optimized API layers, and a modular component system. The app was built for both iOS and Android with shared business logic and platform-specific refinements.",
    results: [
      "Cross-platform app shipped to production",
      "Secure authentication & session management",
      "Real-time data sync with offline support",
      "Scalable architecture for future features",
    ],
    techStack: ["React Native", "TypeScript", "Node.js", "REST APIs", "Firebase"],
    features: [
      "Secure login & biometric auth",
      "Real-time transaction feeds",
      "Push notifications",
      "Multi-language support",
      "Analytics dashboard integration",
    ],
    portfolioSlug: "pacepal",
    image: "/portfolio/pacepal/4F0ACD68-BFA8-44AA-9A63-E0F1A167F8AD.PNG",
  },
  {
    slug: "shopify-app",
    client: "E-Commerce Brand",
    title: "Custom Shopify App & Store",
    category: "Shopify · E-Commerce",
    metaTitle: "Case Study: Shopify App Development | SoftPulse",
    metaDescription:
      "Custom Shopify app and store development case study — theme customization, inventory management, and conversion optimization by SoftPulse.",
    keywords: ["Shopify app development case study", "Shopify store", "e-commerce development"],
    challenge:
      "The client required a custom Shopify experience beyond standard themes — including inventory workflows, agent rewards, and a bilingual product catalog integrated with third-party services.",
    solution:
      "SoftPulse delivered a custom Liquid theme with dynamic sections, Shopify API integrations for inventory and orders, and a companion workflow for agent incentives. Performance and mobile checkout were prioritized.",
    results: [
      "Custom theme with 40%+ conversion improvement",
      "Automated inventory sync",
      "Agent rewards system integrated",
      "Mobile-optimized checkout flow",
    ],
    techStack: ["Shopify", "Liquid", "JavaScript", "Shopify APIs", "GraphQL"],
    features: [
      "Custom theme & sections",
      "Inventory management integration",
      "Promotional campaigns",
      "Bilingual product catalog",
      "Analytics & reporting",
    ],
    portfolioSlug: "shoof",
    image: "/portfolio/shoof/D951E405-D595-47C6-AE94-30F91A4D8E77.PNG",
  },
  {
    slug: "loyalty-app",
    client: "Wafaa PRO",
    title: "Digital Loyalty Wallet",
    category: "Mobile App · Fintech",
    metaTitle: "Case Study: Loyalty App Development | SoftPulse",
    metaDescription:
      "Wafaa PRO loyalty wallet case study — consumer app and merchant dashboard with visit tracking, promotions, and digital card management.",
    keywords: ["loyalty app development", "fintech wallet app", "merchant dashboard"],
    challenge:
      "Wafaa needed a consumer loyalty wallet and a merchant-facing dashboard to track customer visits, run promotions, and manage digital loyalty cards — with French and Arabic language support.",
    solution:
      "We built a dual-app ecosystem: a consumer wallet with secure authentication and card management, plus Wafaa PRO — a merchant dashboard with real-time analytics, promotion tools, and customer entry logging.",
    results: [
      "Consumer + merchant apps in production",
      "Real-time visit & entry analytics",
      "Promotion campaign management",
      "Bilingual FR/AR interface",
    ],
    techStack: ["React Native", "Node.js", "MongoDB", "REST APIs"],
    features: [
      "Digital loyalty cards",
      "Merchant analytics dashboard",
      "Promotion management",
      "Customer visit tracking",
      "Secure authentication",
    ],
    portfolioSlug: "wafaa-pro",
    image: "/portfolio/shoof/D951E405-D595-47C6-AE94-30F91A4D8E77.PNG",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}

export function getTrainingPage(slug: string) {
  return trainingPages.find((p) => p.slug === slug);
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCourseForTraining(slug: string): Course | undefined {
  const page = getTrainingPage(slug);
  if (!page) return undefined;
  return courses.find((c) => c.slug === page.courseSlug);
}

export function getServiceByPage(slug: string) {
  const page = getServicePage(slug);
  if (!page) return undefined;
  return services.find((s) => s.id === page.serviceId);
}

export const allDynamicSlugs = [
  ...servicePages.map((p) => p.slug),
  ...trainingPages.map((p) => p.slug),
];
