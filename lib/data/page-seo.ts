export type SeoFaq = { question: string; answer: string };

export type SeoSection = {
  title: string;
  paragraphs: string[];
};

export type RelatedLink = { href: string; label: string };

export type PageSeoContent = {
  intro: string[];
  sections: SeoSection[];
  faqs: SeoFaq[];
  relatedLinks: RelatedLink[];
};

function links(...items: RelatedLink[]): RelatedLink[] {
  return items;
}

const pageSeoContent: Record<string, PageSeoContent> = {
  "react-native-development": {
    intro: [
      "SoftPulse is a React Native development company in Pakistan that ships production mobile apps for startups, SMEs, and international clients. Our team builds cross-platform iOS and Android applications with a single JavaScript codebase — reducing cost and time-to-market without sacrificing native performance.",
      "We work with Expo and bare React Native workflows, integrating GPS, push notifications, payments, camera, maps, and third-party APIs. Every project follows agile delivery with weekly demos, so you see progress from week one.",
      "Whether you need an MVP for investors, a customer-facing app for your business, or a scalable product for thousands of users, our React Native developers in Sargodha deliver store-ready builds with ongoing maintenance support.",
    ],
    sections: [
      {
        title: "Why Choose React Native for Your App",
        paragraphs: [
          "React Native lets you reach both iOS and Android users with one team and one codebase. Companies like Meta, Microsoft, and Shopify use it for high-traffic apps because it balances development speed with near-native UX.",
          "For Pakistani startups and overseas clients, hiring a local React Native team means lower costs, overlapping time zones, and direct communication — without compromising on code quality or App Store compliance.",
        ],
      },
      {
        title: "Our React Native Tech Stack",
        paragraphs: [
          "We use TypeScript, Expo, React Navigation, Zustand or Redux for state, and REST or GraphQL backends. Firebase, Supabase, and custom Node.js APIs are common in our projects. We handle App Store and Google Play submission, OTA updates, and performance profiling.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does React Native app development cost in Pakistan?",
        answer:
          "Cost depends on features, integrations, and timeline. A focused MVP typically starts lower than building separate native iOS and Android apps. Contact SoftPulse for a scoped quote based on your requirements.",
      },
      {
        question: "Can you publish my app to the App Store and Google Play?",
        answer:
          "Yes. We prepare store assets, handle signing certificates, and guide you through Apple and Google review. We have multiple apps live on both stores.",
      },
      {
        question: "Do you use Expo or bare React Native?",
        answer:
          "We choose based on your project. Expo is faster for most MVPs; bare workflow is used when custom native modules are required.",
      },
      {
        question: "How long does a React Native project take?",
        answer:
          "A typical MVP takes 8–16 weeks depending on scope. We break work into sprints with weekly demos and clear milestones.",
      },
      {
        question: "Do you offer maintenance after launch?",
        answer:
          "Yes. We provide bug fixes, OS updates, feature additions, and performance monitoring on monthly retainer or per-task basis.",
      },
    ],
    relatedLinks: links(
      { href: "/mobile-app-development", label: "Mobile App Development" },
      { href: "/mern-stack-development", label: "MERN Stack Development" },
      { href: "/services", label: "All Services" },
      { href: "/react-native-course-sargodha", label: "React Native Course" },
      { href: "/case-study-karzame", label: "Karzame Fintech Case Study" }
    ),
  },
  "mobile-app-development": {
    intro: [
      "SoftPulse is a mobile app development company in Pakistan specializing in React Native, GPS-enabled apps, fintech wallets, e-commerce, and social platforms. We take products from idea to published app on Google Play and the App Store.",
      "Our mobile team has shipped apps with real users — loyalty wallets, delivery trackers, fintech platforms, and Shopify companion apps. We focus on secure authentication, offline support, analytics, and scalable backend architecture.",
      "Clients choose SoftPulse for transparent communication, on-time delivery, and code they can maintain long-term. We serve businesses in Pakistan and international markets through our Sargodha software house.",
    ],
    sections: [
      {
        title: "End-to-End Mobile Product Development",
        paragraphs: [
          "We cover discovery, UI implementation, API integration, QA, and store launch. Our process starts with defining your MVP scope and success metrics, then moves through agile sprints until your app is live and monitored.",
          "Common integrations include Stripe and local payment gateways, Google Maps, Firebase push notifications, biometric login, and admin dashboards for your operations team.",
        ],
      },
      {
        title: "Industries We Build For",
        paragraphs: [
          "We have delivered fintech, e-commerce, logistics, healthcare booking, and loyalty apps. Each domain brings specific compliance and UX requirements — we apply patterns from past production apps to reduce risk on your project.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build both iOS and Android apps?",
        answer:
          "Yes. We primarily use React Native for cross-platform delivery, so one codebase powers both platforms with platform-specific refinements where needed.",
      },
      {
        question: "Can you work with an existing backend or design?",
        answer:
          "Absolutely. We integrate with your APIs, Figma designs, or existing codebase and extend features as needed.",
      },
      {
        question: "What is included in mobile app development?",
        answer:
          "Typical scope includes UI development, API integration, testing, store submission, and documentation. Backend development can be included or handled separately.",
      },
      {
        question: "How do you ensure app security?",
        answer:
          "We implement secure token storage, HTTPS-only communication, input validation, and follow OWASP mobile security guidelines for authentication and data handling.",
      },
    ],
    relatedLinks: links(
      { href: "/react-native-development", label: "React Native Development" },
      { href: "/shopify-app-development", label: "Shopify App Development" },
      { href: "/services", label: "All Services" },
      { href: "/mobile-app-development-course-sargodha", label: "Mobile App Development Course" },
      { href: "/case-study-loyalty-app", label: "Loyalty Wallet Case Study" }
    ),
  },
  "mern-stack-development": {
    intro: [
      "SoftPulse provides MERN stack development services — MongoDB, Express.js, React, and Node.js — for SaaS products, admin dashboards, APIs, and full-stack web applications. Our developers build secure, scalable systems deployed to cloud infrastructure.",
      "From RESTful APIs and JWT authentication to real-time features with WebSockets, we deliver production-ready backends and React frontends that work together seamlessly.",
      "Businesses hire our MERN stack team in Pakistan for faster delivery, competitive rates, and direct access to senior developers who also train students in the same technologies.",
    ],
    sections: [
      {
        title: "Full-Stack JavaScript Expertise",
        paragraphs: [
          "The MERN stack keeps your entire product in one language — JavaScript — which speeds development and simplifies hiring. We design MongoDB schemas, build Express middleware, and create React interfaces with TypeScript for type safety.",
        ],
      },
      {
        title: "Deployment & DevOps",
        paragraphs: [
          "We deploy to Vercel, AWS, DigitalOcean, and VPS environments with PM2, Docker, and CI/CD pipelines. Environment variables, database backups, and monitoring are part of our production checklist.",
        ],
      },
    ],
    faqs: [
      {
        question: "What types of projects use the MERN stack?",
        answer:
          "SaaS dashboards, booking systems, e-commerce backends, content platforms, internal tools, and mobile app APIs are common MERN projects we build.",
      },
      {
        question: "Do you use TypeScript with MERN?",
        answer:
          "Yes. We recommend TypeScript on both frontend and backend for larger projects to catch errors early and improve maintainability.",
      },
      {
        question: "Can you migrate an existing app to MERN?",
        answer:
          "We can migrate legacy PHP or WordPress backends to Node.js APIs and rebuild frontends in React, phased to minimize downtime.",
      },
    ],
    relatedLinks: links(
      { href: "/web-development-services", label: "Web Development Services" },
      { href: "/react-native-development", label: "React Native Development" },
      { href: "/mern-stack-course-sargodha", label: "MERN Stack Course" },
      { href: "/services", label: "All Services" },
      { href: "/case-study-karzame", label: "Fintech Case Study" }
    ),
  },
  "web-development-services": {
    intro: [
      "SoftPulse delivers modern web development services using Next.js, React, and TypeScript. We build SEO-friendly marketing sites, SaaS dashboards, e-commerce platforms, and business portals optimized for performance and Core Web Vitals.",
      "Our web team combines frontend polish with backend API design — so your site is not just beautiful but fast, secure, and easy to maintain. We deploy to Vercel, cloud VPS, and enterprise hosting environments.",
      "Whether you need a company website, a customer portal, or a complex web application, SoftPulse provides end-to-end development from Sargodha with international delivery standards.",
    ],
    sections: [
      {
        title: "Next.js & SEO-First Architecture",
        paragraphs: [
          "We use Next.js App Router for server rendering, static generation, and optimal SEO metadata. Canonical URLs, structured data, sitemaps, and semantic HTML are built into every project — not added as an afterthought.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build SEO-optimized websites?",
        answer:
          "Yes. We implement proper title tags, meta descriptions, schema markup, sitemaps, and performance optimization as standard practice.",
      },
      {
        question: "Can you integrate payment gateways and auth?",
        answer:
          "We integrate Stripe, PayPal, local payment providers, Supabase Auth, NextAuth, and custom JWT systems.",
      },
      {
        question: "How long does a business website take?",
        answer:
          "A marketing site typically takes 3–6 weeks. Complex web apps require scoping based on features and integrations.",
      },
    ],
    relatedLinks: links(
      { href: "/mern-stack-development", label: "MERN Stack Development" },
      { href: "/ui-ux-design", label: "UI/UX Design" },
      { href: "/web-development-course-sargodha", label: "Web Development Course" },
      { href: "/services", label: "All Services" },
      { href: "/training", label: "IT Training Courses" }
    ),
  },
  "shopify-app-development": {
    intro: [
      "SoftPulse builds custom Shopify stores, Liquid themes, and Shopify apps for e-commerce brands that need more than a template. We optimize checkout flows, inventory workflows, and conversion rates for mobile shoppers.",
      "Our Shopify developers in Pakistan have delivered custom themes, agent reward systems, bilingual catalogs, and API integrations for order and inventory management.",
      "From theme customization to Shopify app extensions and headless commerce, we help brands scale on the world's largest e-commerce platform.",
    ],
    sections: [
      {
        title: "Shopify Theme & App Development",
        paragraphs: [
          "We customize Dawn and other themes with dynamic sections, metafields, and Ajax cart interactions. For advanced needs, we build private apps using Shopify APIs and GraphQL.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build custom Shopify themes?",
        answer:
          "Yes. We create custom Liquid themes with responsive design, SEO sections, and conversion-focused product pages.",
      },
      {
        question: "Can you improve my existing Shopify store?",
        answer:
          "We audit store speed, checkout UX, and theme code, then implement fixes and new features to improve conversion.",
      },
    ],
    relatedLinks: links(
      { href: "/web-development-services", label: "Web Development Services" },
      { href: "/mobile-app-development", label: "Mobile App Development" },
      { href: "/case-study-shopify-app", label: "Shopify Case Study" },
      { href: "/services", label: "All Services" },
      { href: "/training", label: "IT Training" }
    ),
  },
  "ui-ux-design": {
    intro: [
      "SoftPulse provides UI/UX design services for web and mobile products — from user research and wireframes to high-fidelity Figma prototypes and developer-ready design systems.",
      "Good design drives engagement and conversion. We map user journeys, test prototypes, and deliver pixel-perfect interfaces that developers can implement without guesswork.",
      "Our designers work alongside developers at SoftPulse, so designs are practical, accessible, and aligned with React Native and Next.js implementation constraints.",
    ],
    sections: [
      {
        title: "Design Process",
        paragraphs: [
          "We start with discovery and competitor analysis, move to wireframes and interactive prototypes, then finalize UI kits with typography, color systems, and component libraries for consistent product development.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you provide Figma files for developers?",
        answer:
          "Yes. All designs are delivered in Figma with organized components, spacing specs, and export assets ready for development handoff.",
      },
      {
        question: "Can you redesign an existing app or website?",
        answer:
          "We audit current UX pain points, propose improvements, and implement new designs in phased releases to minimize disruption.",
      },
    ],
    relatedLinks: links(
      { href: "/mobile-app-development", label: "Mobile App Development" },
      { href: "/web-development-services", label: "Web Development Services" },
      { href: "/react-native-development", label: "React Native Development" },
      { href: "/services", label: "All Services" },
      { href: "/about", label: "About SoftPulse" }
    ),
  },
  "react-native-course-sargodha": {
    intro: [
      "The React Native course at SoftPulse in Sargodha is a five-month, project-based program for students who want to become professional mobile app developers. You start with web foundations — HTML, CSS, and JavaScript — then progress through React and React Native until you can publish apps to iOS and Android.",
      "Unlike online video courses, this training is mentor-led with live sessions, code reviews, and accountability. You build four real mobile apps including a GPS-enabled project and a capstone app submitted to app stores.",
      "Graduates leave with a portfolio, certificate, and the skills to freelance on Fiverr, join a software house, or continue into our advanced MERN stack program.",
    ],
    sections: [
      {
        title: "Who Should Enroll",
        paragraphs: [
          "This course suits beginners with basic computer skills, college students in CS or IT, and career switchers who want practical mobile development skills. No prior coding experience is required — we teach from fundamentals.",
          "If you already know JavaScript and React, you may progress faster through early modules with mentor guidance.",
        ],
      },
      {
        title: "Career Outcomes After Completion",
        paragraphs: [
          "React Native developers are in high demand in Pakistan and remotely. Our students have built portfolios that lead to freelance clients and junior developer roles. The course includes App Store publishing guidance so you can demonstrate shipped products, not just tutorials.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the duration of the React Native course?",
        answer:
          "The program runs for five months with structured weekly modules, assignments, and mentor check-ins.",
      },
      {
        question: "Do I need a Mac for iOS development?",
        answer:
          "You can complete most of the course on Windows. For final iOS store submission, we guide you through options including cloud Mac services or testing on Android first.",
      },
      {
        question: "Will I get a certificate?",
        answer:
          "Yes. Students who complete all projects and the final capstone receive a SoftPulse certificate of completion.",
      },
      {
        question: "Is this course available online or in-person?",
        answer:
          "We offer onsite classes at our Sargodha institute with hybrid options for students who cannot attend every session in person.",
      },
      {
        question: "What apps will I build during the course?",
        answer:
          "You will build a portfolio website, a React web app, a multi-screen mobile app, a GPS-enabled social app, and a final capstone published to app stores.",
      },
    ],
    relatedLinks: links(
      { href: "/mern-stack-course-sargodha", label: "MERN Stack Course" },
      { href: "/react-js-course-sargodha", label: "React JS Course" },
      { href: "/react-native-development", label: "React Native Development Services" },
      { href: "/training", label: "All Courses" },
      { href: "/mobile-app-development-course-sargodha", label: "Mobile App Development Course" }
    ),
  },
  "react-js-course-sargodha": {
    intro: [
      "The React JS course at SoftPulse in Sargodha is a four-month program that takes beginners from HTML and CSS through JavaScript and React.js to deployed production web applications. It is the ideal starting point for anyone pursuing frontend or full-stack development.",
      "You complete three portfolio projects — a responsive landing page, an interactive JavaScript app, and a full React dashboard — plus a final production deployment to Vercel or Netlify.",
      "This course prepares you for our MERN stack or React Native programs, or for entry-level frontend developer roles and freelance web projects.",
    ],
    sections: [
      {
        title: "Curriculum Overview",
        paragraphs: [
          "Month one covers HTML, CSS, and responsive design. Month two dives into JavaScript ES6+, DOM manipulation, and async programming. Month three focuses on React components, hooks, routing, and state management. Month four combines API integration, testing basics, Git workflow, and deployment.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is prior programming experience required?",
        answer:
          "No. We start from web fundamentals. Basic computer literacy is sufficient to begin.",
      },
      {
        question: "How is this different from free YouTube tutorials?",
        answer:
          "You get structured progression, mentor feedback on your code, accountability, peer learning, and portfolio projects reviewed by working developers.",
      },
      {
        question: "Can I freelance after this course?",
        answer:
          "Many students take small landing page and React projects after completing the program. For full-stack freelance work, we recommend continuing to the MERN stack course.",
      },
    ],
    relatedLinks: links(
      { href: "/web-development-course-sargodha", label: "Web Development Course" },
      { href: "/mern-stack-course-sargodha", label: "MERN Stack Course" },
      { href: "/web-development-services", label: "Web Development Services" },
      { href: "/training", label: "All Courses" },
      { href: "/", label: "SoftPulse Homepage" }
    ),
  },
  "mern-stack-course-sargodha": {
    intro: [
      "The MERN stack course at SoftPulse in Sargodha is a five-month full-stack JavaScript program covering MongoDB, Express.js, React, and Node.js. You learn to build complete web applications with authentication, databases, APIs, and deployed production infrastructure.",
      "This course is designed for students who want backend and frontend skills in one stack — the most in-demand combination for startups and SaaS companies in Pakistan and globally.",
      "Your capstone project is a full MERN SaaS application with user auth, CRUD operations, and cloud deployment — a portfolio piece that demonstrates job-ready full-stack ability.",
    ],
    sections: [
      {
        title: "Skills You Will Master",
        paragraphs: [
          "Database design with MongoDB and Mongoose, RESTful API development with Express, JWT authentication, React frontend with protected routes, real-time features, security best practices, and Docker-based deployment.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I take the React JS course first?",
        answer:
          "Basic HTML, CSS, and JavaScript knowledge is helpful. If you are a complete beginner, we recommend starting with the React JS course or the first month covers fundamentals.",
      },
      {
        question: "What job roles can I apply for after this course?",
        answer:
          "Full-stack developer, backend developer, Node.js developer, and React developer roles are common paths for MERN graduates.",
      },
      {
        question: "Do you cover deployment?",
        answer:
          "Yes. We deploy both frontend and backend to production with environment configuration, database hosting, and CI/CD basics.",
      },
    ],
    relatedLinks: links(
      { href: "/nodejs-course-sargodha", label: "Node.js Course" },
      { href: "/react-js-course-sargodha", label: "React JS Course" },
      { href: "/mern-stack-development", label: "MERN Stack Development Services" },
      { href: "/training", label: "All Courses" },
      { href: "/react-native-course-sargodha", label: "React Native Course" }
    ),
  },
  "nodejs-course-sargodha": {
    intro: [
      "The Node.js course at SoftPulse in Sargodha focuses on server-side JavaScript — building REST APIs with Express, connecting to MongoDB, implementing JWT authentication, and deploying backend services to production.",
      "This program is ideal for frontend developers who want backend skills, or as a specialized track within our broader MERN stack training. You learn the server layer that powers modern web and mobile applications.",
      "By the end, you will have built production-ready APIs with proper error handling, validation, security, and documentation.",
    ],
    sections: [
      {
        title: "Backend Development Focus",
        paragraphs: [
          "Topics include Node.js runtime, npm ecosystem, Express routing and middleware, MongoDB queries, authentication flows, file uploads, WebSockets for real-time features, and testing APIs with Postman and automated tests.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this course standalone or part of MERN?",
        answer:
          "It can be taken as a focused backend course or as part of the full MERN stack program. Contact us to choose the best path for your goals.",
      },
      {
        question: "What databases do you teach?",
        answer:
          "We primarily use MongoDB with Mongoose ODM, which pairs naturally with Node.js and the MERN stack.",
      },
    ],
    relatedLinks: links(
      { href: "/mern-stack-course-sargodha", label: "MERN Stack Course" },
      { href: "/web-development-course-sargodha", label: "Web Development Course" },
      { href: "/mern-stack-development", label: "MERN Stack Services" },
      { href: "/training", label: "All Courses" },
      { href: "/", label: "Homepage" }
    ),
  },
  "web-development-course-sargodha": {
    intro: [
      "The web development course at SoftPulse in Sargodha covers frontend development from scratch — HTML, CSS, JavaScript, and React.js — with hands-on projects and live mentorship. It is designed for students who want a career in web development without prior coding experience.",
      "You learn responsive design, modern JavaScript, component-based architecture with React, and how to deploy websites to the cloud. Three portfolio projects demonstrate your skills to employers and clients.",
      "This course overlaps with our React JS program and provides a solid foundation for MERN stack or specialized frontend career paths.",
    ],
    sections: [
      {
        title: "Practical, Project-Based Learning",
        paragraphs: [
          "Every module ends with a project you can add to your portfolio. Mentors review your code, suggest improvements, and help you understand industry best practices — not just syntax.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long is the web development course?",
        answer:
          "The program runs four months with structured modules from HTML/CSS through React and deployment.",
      },
      {
        question: "Will I learn React in this course?",
        answer:
          "Yes. React.js is a core part of the curriculum in the final months, including hooks, routing, and API integration.",
      },
    ],
    relatedLinks: links(
      { href: "/react-js-course-sargodha", label: "React JS Course" },
      { href: "/mern-stack-course-sargodha", label: "MERN Stack Course" },
      { href: "/web-development-services", label: "Web Development Services" },
      { href: "/training", label: "All Courses" },
      { href: "/", label: "Homepage" }
    ),
  },
  "mobile-app-development-course-sargodha": {
    intro: [
      "The mobile app development course at SoftPulse in Sargodha teaches you to build and publish real iOS and Android apps using React Native. It combines our web foundations curriculum with deep mobile-specific training including navigation, device APIs, and app store deployment.",
      "This program is for students who know they want a mobile development career — not just web. You graduate with published apps and the confidence to take on freelance or junior mobile developer roles.",
      "Training is delivered at our Sargodha institute with mentor support, code reviews, and peer collaboration throughout the program.",
    ],
    sections: [
      {
        title: "From Zero to Published App",
        paragraphs: [
          "The curriculum mirrors our React Native course with emphasis on mobile-first thinking, App Store guidelines, performance optimization, and building apps users actually want to install and keep.",
        ],
      },
    ],
    faqs: [
      {
        question: "How is this different from the React Native course?",
        answer:
          "Both programs share the same core curriculum. This page emphasizes the mobile app development career path; content and duration are aligned with our React Native training track.",
      },
      {
        question: "Can I get an internship after the course?",
        answer:
          "Top-performing students may receive internship opportunities at SoftPulse or referrals to partner companies. Performance is based on project quality and consistency.",
      },
    ],
    relatedLinks: links(
      { href: "/react-native-course-sargodha", label: "React Native Course" },
      { href: "/mobile-app-development", label: "Mobile App Development Services" },
      { href: "/react-native-development", label: "React Native Development" },
      { href: "/training", label: "All Courses" },
      { href: "/", label: "Homepage" }
    ),
  },
  "case-study-karzame": {
    intro: [
      "Karzame needed a secure, bilingual fintech mobile platform with real-time transactions and trustworthy UX for first-time financial app users. SoftPulse delivered a React Native application with token-based authentication, optimized API layers, and cross-platform support for iOS and Android.",
      "This case study demonstrates our fintech mobile development capabilities — security-first architecture, offline support, and scalable design for future feature expansion.",
    ],
    sections: [
      {
        title: "Technical Approach",
        paragraphs: [
          "We used React Native with TypeScript, secure session management, REST APIs, and Firebase for push notifications. The modular component architecture allows Karzame to add features without rewriting core flows.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can SoftPulse build a fintech app like Karzame?",
        answer:
          "Yes. We have experience with secure authentication, transaction feeds, and compliance-conscious UX for financial products. Contact us to discuss your requirements.",
      },
    ],
    relatedLinks: links(
      { href: "/react-native-development", label: "React Native Development" },
      { href: "/mobile-app-development", label: "Mobile App Development" },
      { href: "/case-study-loyalty-app", label: "Loyalty Wallet Case Study" },
      { href: "/services", label: "All Services" },
      { href: "/#contact", label: "Start Your Project" }
    ),
  },
  "case-study-shopify-app": {
    intro: [
      "This e-commerce client needed a Shopify experience beyond standard themes — custom inventory workflows, agent rewards, and a bilingual product catalog. SoftPulse delivered a custom Liquid theme with API integrations and mobile-optimized checkout.",
      "The project resulted in significant conversion improvements and automated inventory sync, demonstrating our Shopify development expertise for growing brands.",
    ],
    sections: [],
    faqs: [
      {
        question: "Do you build custom Shopify solutions like this?",
        answer:
          "Yes. We develop custom themes, Shopify apps, and store optimizations for e-commerce brands in Pakistan and internationally.",
      },
    ],
    relatedLinks: links(
      { href: "/shopify-app-development", label: "Shopify App Development" },
      { href: "/web-development-services", label: "Web Development Services" },
      { href: "/case-study-karzame", label: "Fintech Case Study" },
      { href: "/services", label: "All Services" },
      { href: "/#contact", label: "Get a Quote" }
    ),
  },
  "case-study-loyalty-app": {
    intro: [
      "Wafaa PRO required a consumer loyalty wallet and merchant dashboard for visit tracking, promotions, and digital card management — with French and Arabic language support. SoftPulse built a dual-app ecosystem with real-time analytics and secure authentication.",
      "This case study showcases our ability to deliver multi-sided platforms where consumers and merchants interact through connected mobile and web applications.",
    ],
    sections: [],
    faqs: [
      {
        question: "Can you build a loyalty or wallet app?",
        answer:
          "Yes. We have shipped consumer wallet apps and merchant dashboards with promotion management, visit tracking, and analytics.",
      },
    ],
    relatedLinks: links(
      { href: "/mobile-app-development", label: "Mobile App Development" },
      { href: "/react-native-development", label: "React Native Development" },
      { href: "/case-study-karzame", label: "Karzame Case Study" },
      { href: "/services", label: "All Services" },
      { href: "/#contact", label: "Contact SoftPulse" }
    ),
  },
};

export function getPageSeoContent(slug: string): PageSeoContent | undefined {
  return pageSeoContent[slug];
}

export function getCaseStudySeoContent(slug: string): PageSeoContent | undefined {
  return pageSeoContent[`case-study-${slug}`];
}
