import type { Course, PortfolioItem, Service, TeamMember, Testimonial } from "@/lib/types";

export const services: Service[] = [
  {
    id: "mobile-app",
    title: "Mobile App Development",
    description:
      "Native-quality mobile experiences built for iOS and Android with performance, polish, and scalability at the core.",
    icon: "smartphone",
    features: ["iOS & Android", "Cross-platform", "App Store launch"],
  },
  {
    id: "react-native",
    title: "React Native Development",
    description:
      "Ship faster with a single codebase. We build beautiful, high-performance React Native apps that feel truly native.",
    icon: "code",
    features: ["Expo & bare workflow", "Native modules", "OTA updates"],
  },
  {
    id: "shopify",
    title: "Shopify Development",
    description:
      "Custom Shopify stores, themes, and apps that convert visitors into loyal customers and scale with your brand.",
    icon: "shopping-bag",
    features: ["Custom themes", "Headless commerce", "App integrations"],
  },
  {
    id: "web",
    title: "Web Development",
    description:
      "Modern, blazing-fast web applications using Next.js, React, and cutting-edge technologies built for growth.",
    icon: "globe",
    features: ["Next.js & React", "SEO optimized", "Cloud deployment"],
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description:
      "User-centered design that delights. From wireframes to pixel-perfect interfaces that drive engagement and conversion.",
    icon: "palette",
    features: ["User research", "Prototyping", "Design systems"],
  },
  {
    id: "ai",
    title: "AI Integrations",
    description:
      "Harness the power of AI to automate workflows, enhance user experiences, and unlock new business capabilities.",
    icon: "brain",
    features: ["LLM integration", "Chatbots", "Automation"],
  },
];

export const whyChooseItems = [
  {
    title: "Expert Team",
    description:
      "Seasoned developers and designers with deep expertise across mobile, web, and emerging technologies.",
    icon: "users",
  },
  {
    title: "Proven Results",
    description:
      "50+ successful projects delivered on time and on budget, with 500+ students trained through our IT institute.",
    icon: "trophy",
  },
  {
    title: "Agile Process",
    description:
      "Transparent, iterative development with regular demos and feedback loops so you're always in the loop.",
    icon: "zap",
  },
  {
    title: "Long-term Partnership",
    description:
      "We don't just build and leave — we provide ongoing support, maintenance, and strategic guidance.",
    icon: "heart-handshake",
  },
];

export const portfolioItems: PortfolioItem[] = [];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content:
      "SoftPulse delivered an exceptional Laravel application that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
    avatar_url: null,
    rating: 5,
  },
  {
    id: "2",
    name: "James Rodriguez",
    role: "Founder",
    company: "ShopBright",
    content:
      "Our Shopify store conversion rate increased by 40% after SoftPulse redesigned and optimized our entire e-commerce experience. Incredible team!",
    avatar_url: null,
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "Product Manager",
    company: "HealthFirst",
    content:
      "Working with SoftPulse on our telemedicine platform was seamless. They delivered on time, communicated clearly, and the quality was outstanding.",
    avatar_url: null,
    rating: 5,
  },
];

export const courses: Course[] = [
  {
    slug: "react",
    title: "React.js Full Stack Course",
    description:
      "A complete 4-month journey from HTML & CSS to JavaScript, React.js, and production deployment — build real web apps from scratch.",
    long_description:
      "This course is designed for beginners and intermediate developers who want to master modern frontend development. You'll start with web fundamentals, progress through JavaScript and React, and finish by deploying production-ready applications to the cloud.",
    duration: "4 months",
    level: "Beginner to Intermediate",
    highlights: [
      "Live mentor sessions",
      "3 portfolio projects",
      "Certificate of completion",
      "Deployment to Vercel/Netlify",
      "Job-ready skills",
    ],
    prerequisites: ["Basic computer skills", "No prior coding required"],
    tools: ["HTML5", "CSS3", "JavaScript", "React.js", "Vite", "Git", "Vercel"],
    outline: [
      {
        period: "Month 1",
        title: "HTML & CSS Fundamentals",
        topics: [
          "HTML structure, semantic tags & accessibility",
          "CSS selectors, box model & flexbox",
          "CSS Grid & responsive design",
          "Mobile-first layouts & media queries",
          "Project: Build a responsive landing page",
        ],
      },
      {
        period: "Month 2",
        title: "JavaScript Essentials",
        topics: [
          "Variables, data types, operators & control flow",
          "Functions, closures & scope",
          "Arrays, objects & ES6+ features",
          "DOM manipulation & event handling",
          "Async JavaScript, fetch API & JSON",
          "Project: Interactive todo app with local storage",
        ],
      },
      {
        period: "Month 3",
        title: "React.js Deep Dive",
        topics: [
          "JSX, components, props & state",
          "React Hooks — useState, useEffect, useRef",
          "Custom hooks & component composition",
          "React Router & client-side navigation",
          "Context API & form handling",
          "Project: Full React dashboard application",
        ],
      },
      {
        period: "Month 4",
        title: "Projects & Deployment",
        topics: [
          "API integration & data fetching patterns",
          "State management best practices",
          "Performance optimization & code splitting",
          "Testing fundamentals with React Testing Library",
          "Git workflow & version control",
          "Deployment to Vercel/Netlify with CI/CD",
          "Final Project: Production-ready web application",
        ],
      },
    ],
  },
  {
    slug: "react-native",
    title: "React Native Mobile Development",
    description:
      "A 5-month intensive course covering HTML, CSS, JavaScript, React fundamentals, and React Native — ship apps to iOS and Android.",
    long_description:
      "Go from web foundations to building and publishing cross-platform mobile apps. This course mirrors the React.js curriculum for the first two months, then dives deep into React Native, native device APIs, and App Store deployment.",
    duration: "5 months",
    level: "Beginner to Advanced",
    highlights: [
      "Build 4 real mobile apps",
      "App Store & Play Store publishing",
      "Expo & bare workflow",
      "Mentor code reviews",
      "Certificate of completion",
    ],
    prerequisites: ["Basic computer skills", "No prior coding required"],
    tools: [
      "HTML", "CSS", "JavaScript", "React.js", "React Native", "Expo", "Firebase",
    ],
    outline: [
      {
        period: "Month 1",
        title: "HTML, CSS & Web Foundations",
        topics: [
          "HTML semantic structure & forms",
          "CSS flexbox, grid & responsive design",
          "JavaScript basics — variables, functions, DOM",
          "Understanding how the web works",
          "Project: Responsive portfolio website",
        ],
      },
      {
        period: "Month 2",
        title: "JavaScript & React Fundamentals",
        topics: [
          "ES6+, async/await & API calls",
          "React components, hooks & state",
          "React Router & project structure",
          "Thinking in React — component architecture",
          "Project: React web app (prep for mobile)",
        ],
      },
      {
        period: "Month 3",
        title: "React Native Core",
        topics: [
          "React Native setup with Expo",
          "Core components — View, Text, Image, ScrollView",
          "StyleSheet, Flexbox & platform-specific design",
          "Navigation with React Navigation",
          "Lists, FlatList & performance",
          "Project: Multi-screen mobile app",
        ],
      },
      {
        period: "Month 4",
        title: "State, APIs & Device Features",
        topics: [
          "Context API & Zustand state management",
          "REST API integration & authentication",
          "Camera, location, maps & push notifications",
          "AsyncStorage & offline support",
          "Animations with Reanimated",
          "Project: GPS-enabled social app",
        ],
      },
      {
        period: "Month 5",
        title: "Publishing & Production",
        topics: [
          "Performance profiling & optimization",
          "Native modules & bridging",
          "App icons, splash screens & store assets",
          "Building for iOS & Android",
          "App Store & Google Play submission",
          "Final Project: Publish a complete app to both stores",
        ],
      },
    ],
  },
  {
    slug: "mern-stack",
    title: "MERN Stack Development",
    description:
      "Master the full JavaScript stack — MongoDB, Express, React, and Node.js — in 5 months and build production-ready web applications.",
    long_description:
      "The MERN stack is one of the most in-demand skill sets in web development. This course takes you from frontend fundamentals through backend APIs, databases, authentication, and full-stack deployment.",
    duration: "5 months",
    level: "Intermediate",
    highlights: [
      "Full-stack capstone project",
      "REST & API design",
      "JWT authentication",
      "MongoDB Atlas cloud database",
      "Deploy to production",
    ],
    prerequisites: [
      "Basic HTML/CSS knowledge helpful",
      "Logical thinking & problem solving",
    ],
    tools: [
      "HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express", "MongoDB", "Git",
    ],
    outline: [
      {
        period: "Month 1",
        title: "HTML, CSS & JavaScript",
        topics: [
          "HTML5 semantic markup & forms",
          "CSS layouts — flexbox, grid, responsive design",
          "JavaScript ES6+ — functions, arrays, objects",
          "DOM APIs, events & async programming",
          "Git & GitHub version control",
          "Project: Dynamic frontend with API consumption",
        ],
      },
      {
        period: "Month 2",
        title: "React.js Frontend",
        topics: [
          "React components, hooks & lifecycle",
          "React Router & protected routes",
          "Form handling & validation",
          "HTTP clients — fetch & Axios",
          "Component libraries & UI patterns",
          "Project: React SPA with routing",
        ],
      },
      {
        period: "Month 3",
        title: "Node.js & Express Backend",
        topics: [
          "Node.js runtime & npm ecosystem",
          "Express.js routing & middleware",
          "RESTful API design principles",
          "Request validation & error handling",
          "File uploads & environment variables",
          "Project: REST API for a blog/e-commerce backend",
        ],
      },
      {
        period: "Month 4",
        title: "MongoDB & Full Stack Integration",
        topics: [
          "MongoDB & Mongoose ODM",
          "Schema design, queries & aggregation",
          "JWT authentication & authorization",
          "Connecting React frontend to Express API",
          "CRUD operations end-to-end",
          "Project: Authenticated full-stack app",
        ],
      },
      {
        period: "Month 5",
        title: "MERN Projects & Deployment",
        topics: [
          "Advanced state management patterns",
          "Real-time features with WebSockets",
          "Security best practices & CORS",
          "Testing APIs & frontend components",
          "Docker basics & cloud deployment",
          "Deploy frontend + backend to production",
          "Capstone: Full MERN stack SaaS application",
        ],
      },
    ],
  },
  {
    slug: "shopify",
    title: "Shopify Development Course",
    description:
      "Become a Shopify developer in 2 months — master Liquid templating, custom themes, Shopify APIs, and launch production stores.",
    long_description:
      "Shopify powers millions of e-commerce businesses worldwide. This focused 2-month course teaches you everything from theme customization to building custom Shopify apps and optimizing stores for conversion.",
    duration: "2 months",
    level: "Beginner to Intermediate",
    highlights: [
      "Build a real Shopify store",
      "Liquid templating mastery",
      "Shopify Partner certification prep",
      "Theme customization projects",
      "Certificate of completion",
    ],
    prerequisites: ["Basic HTML/CSS knowledge", "Understanding of e-commerce helpful"],
    tools: ["Shopify CLI", "Liquid", "HTML/CSS", "JavaScript", "Shopify APIs"],
    outline: [
      {
        period: "Month 1",
        title: "Shopify Fundamentals & Liquid",
        topics: [
          "Shopify ecosystem — stores, themes, apps & partners",
          "Shopify admin, products, collections & checkout",
          "Liquid templating language — tags, filters & objects",
          "Theme structure — sections, blocks & snippets",
          "Dawn theme anatomy & customization",
          "Responsive theme design with CSS",
          "Project: Customize a Shopify theme from scratch",
        ],
      },
      {
        period: "Month 2",
        title: "Advanced Themes, Apps & Launch",
        topics: [
          "Custom sections & dynamic blocks",
          "Shopify Ajax API & cart interactions",
          "Shopify Storefront API & headless basics",
          "Webhooks, metafields & app extensions",
          "Performance, SEO & conversion optimization",
          "Payment gateways & shipping setup",
          "Final Project: Launch a complete Shopify store",
        ],
      },
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design Course",
    description:
      "Master Adobe Photoshop, Illustrator, and Canva — build logos, social media designs, and brand identities in 3 months.",
    long_description:
      "This course is for creative students who want professional design skills for freelancing and agency work. You will learn visual communication, branding fundamentals, and the industry tools designers use every day — with a portfolio of real client-style projects by graduation.",
    duration: "3 months",
    level: "Beginner to Intermediate",
    highlights: [
      "Adobe Photoshop & Illustrator",
      "Logo & brand identity projects",
      "Social media design packs",
      "Canva for fast client delivery",
      "Freelance portfolio build",
    ],
    prerequisites: ["Basic computer skills", "Creative interest — no design experience required"],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Figma basics"],
    outline: [
      {
        period: "Month 1",
        title: "Design Foundations & Photoshop",
        topics: [
          "Design principles — colour, typography, layout",
          "Adobe Photoshop workspace & tools",
          "Photo editing, banners & digital ads",
          "Social media post design",
          "Project: Brand social media kit",
        ],
      },
      {
        period: "Month 2",
        title: "Illustrator & Logo Design",
        topics: [
          "Vector graphics with Adobe Illustrator",
          "Logo design process from brief to delivery",
          "Icons, badges & brand assets",
          "Print vs digital file formats",
          "Project: Complete logo & brand identity",
        ],
      },
      {
        period: "Month 3",
        title: "Canva, Portfolio & Freelancing",
        topics: [
          "Canva templates & fast client workflows",
          "Instagram, Facebook & TikTok design trends",
          "Portfolio presentation on Behance",
          "Pricing freelance design work",
          "Final Project: Client brand package",
        ],
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Course",
    description:
      "Learn SEO, Google Ads, Facebook Ads, content marketing, and analytics — grow businesses online in 3 months.",
    long_description:
      "Digital marketing skills are in demand at every business in Pakistan. This course teaches practical growth skills — from ranking on Google to running profitable ad campaigns — with real campaign projects and reporting dashboards.",
    duration: "3 months",
    level: "Beginner to Intermediate",
    highlights: [
      "SEO & content strategy",
      "Google Ads & Meta Ads",
      "Analytics & reporting",
      "Email marketing campaigns",
      "Client campaign projects",
    ],
    prerequisites: ["Basic computer & internet skills", "Good written English helpful"],
    tools: ["Google Analytics", "Google Ads", "Meta Business Suite", "Canva", "Mailchimp"],
    outline: [
      {
        period: "Month 1",
        title: "SEO & Content Marketing",
        topics: [
          "How search engines work",
          "Keyword research & on-page SEO",
          "Blog writing for rankings",
          "Content calendars & brand voice",
          "Project: SEO audit & content plan",
        ],
      },
      {
        period: "Month 2",
        title: "Paid Ads — Google & Meta",
        topics: [
          "Google Search & Display campaigns",
          "Facebook & Instagram ad manager",
          "Audience targeting & retargeting",
          "Ad creatives & A/B testing",
          "Project: Live ad campaign with budget",
        ],
      },
      {
        period: "Month 3",
        title: "Email, Analytics & Client Work",
        topics: [
          "Email marketing automation",
          "Google Analytics dashboards",
          "Conversion tracking & ROI reporting",
          "Client proposals & retainers",
          "Final Project: Full marketing plan for a local business",
        ],
      },
    ],
  },
  {
    slug: "youtube-automation",
    title: "YouTube Automation Course",
    description:
      "Build YouTube channel systems — niche research, scripts, editing, SEO, and monetization in 3 months.",
    long_description:
      "YouTube remains one of the largest discovery platforms globally. This course teaches sustainable channel systems — not get-rich-quick schemes — including niche research, content planning, AI-assisted workflows, editing, and monetization paths.",
    duration: "3 months",
    level: "Beginner",
    highlights: [
      "Niche & audience research",
      "Script writing & hooks",
      "Video editing fundamentals",
      "YouTube SEO & thumbnails",
      "Monetization strategies",
    ],
    prerequisites: ["Basic computer skills", "Consistent weekly time commitment"],
    tools: ["YouTube Studio", "CapCut / Premiere basics", "Canva", "AI writing tools"],
    outline: [
      {
        period: "Month 1",
        title: "Channel Strategy & Setup",
        topics: [
          "Niche research & competitor analysis",
          "Channel branding & content pillars",
          "Script structure — hooks & retention",
          "YouTube Studio fundamentals",
          "Project: Launch a branded channel",
        ],
      },
      {
        period: "Month 2",
        title: "Production & Editing",
        topics: [
          "Voiceover & recording basics",
          "Video editing workflow",
          "Thumbnails that get clicks",
          "AI tools for research & scripting",
          "Project: Publish 4 optimized videos",
        ],
      },
      {
        period: "Month 3",
        title: "SEO, Growth & Monetization",
        topics: [
          "YouTube SEO — titles, tags, descriptions",
          "Analytics & audience retention",
          "Affiliate & sponsorship models",
          "AdSense requirements & alternatives",
          "Final Project: 30-day growth sprint",
        ],
      },
    ],
  },
  {
    slug: "flutter",
    title: "Flutter Mobile Development",
    description:
      "Learn Dart and Flutter — build beautiful cross-platform iOS and Android apps in a 5-month program.",
    long_description:
      "Flutter is Google's UI toolkit for building natively compiled applications from a single codebase. This course covers Dart fundamentals, Flutter widgets, state management, API integration, and publishing to app stores — for students who want an alternative to the React Native track.",
    duration: "5 months",
    level: "Beginner to Advanced",
    highlights: [
      "Dart programming language",
      "Flutter widgets & layouts",
      "Firebase integration",
      "State management patterns",
      "App Store publishing",
    ],
    prerequisites: ["Basic computer skills", "Logical thinking", "No prior coding required"],
    tools: ["Dart", "Flutter", "Android Studio", "VS Code", "Firebase"],
    outline: [
      {
        period: "Month 1",
        title: "Programming & Dart Fundamentals",
        topics: [
          "Programming basics — variables, functions, OOP",
          "Dart syntax & data structures",
          "Async programming in Dart",
          "Debugging & problem solving",
          "Project: Dart CLI utilities",
        ],
      },
      {
        period: "Month 2",
        title: "Flutter UI & Widgets",
        topics: [
          "Flutter project structure",
          "Stateless & stateful widgets",
          "Layouts — Row, Column, Stack, Flex",
          "Material & Cupertino design",
          "Project: Multi-screen Flutter app",
        ],
      },
      {
        period: "Month 3",
        title: "Navigation & State Management",
        topics: [
          "Navigator & routing",
          "Provider / Riverpod state management",
          "Forms & validation",
          "Theming & responsive design",
          "Project: E-commerce UI prototype",
        ],
      },
      {
        period: "Month 4",
        title: "APIs, Firebase & Device Features",
        topics: [
          "REST API integration with http/dio",
          "Firebase Auth & Firestore",
          "Local storage & offline support",
          "Push notifications",
          "Project: Full-stack Flutter app",
        ],
      },
      {
        period: "Month 5",
        title: "Publishing & Production",
        topics: [
          "Performance optimization",
          "App icons & splash screens",
          "Building release APK & IPA",
          "Google Play & App Store submission",
          "Final Project: Published Flutter app",
        ],
      },
    ],
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mahar Mudassar",
    role: "Founder & CEO",
    bio: "Mobile development expert with expertise in React Native and cross-platform solutions.",
    avatar_url: null,
  },
  {
    id: "2",
    name: "Adnan Malik",
    role: "Full Stack Developer",
    bio: "5+ years of experience in Laravel and React development. Passionate about creating scalable solutions.",
    avatar_url: null,
  },
  {
    id: "3",
    name: "Amna Tahir",
    role: "Laravel Specialist",
    bio: "Backend architect specializing in Laravel, API development, and database optimization.",
    avatar_url: null,
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "UI/UX Designer",
    bio: "Creative designer focused on user experience and modern interface design principles.",
    avatar_url: null,
  },
  {
    id: "5",
    name: "David Kim",
    role: "DevOps Engineer",
    bio: "Cloud infrastructure and automation specialist ensuring scalable and reliable deployments.",
    avatar_url: null,
  },
  {
    id: "6",
    name: "Lisa Thompson",
    role: "Shopify Developer",
    bio: "E-commerce solutions expert with deep knowledge of Shopify platform and custom app development.",
    avatar_url: null,
  },
];
