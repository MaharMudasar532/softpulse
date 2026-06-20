import { readFileSync, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";
import pg from "pg";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const { Client } = pg;

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const envPath = resolve(process.cwd(), file);
    if (!existsSync(envPath)) continue;
    for (const line of readFileSync(envPath, "utf-8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

async function roundCorners(input: Buffer, radius: number): Promise<Buffer> {
  const meta = await sharp(input).metadata();
  const w = meta.width || 400;
  const h = meta.height || 800;

  const mask = Buffer.from(
    `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" ry="${radius}" fill="white"/></svg>`
  );

  return sharp(input)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function mergeImagesEnhanced(
  imagePaths: string[],
  outputPath: string,
  accent: { r: number; g: number; b: number }
) {
  const phoneHeight = 760;
  const gap = 28;
  const padding = 48;
  const radius = 28;

  const phones = await Promise.all(
    imagePaths.map(async (p) => {
      const buf = await sharp(p)
        .resize({ height: phoneHeight, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
      return roundCorners(buf, radius);
    })
  );

  const metas = await Promise.all(phones.map((b) => sharp(b).metadata()));
  const totalPhonesWidth =
    metas.reduce((s, m) => s + (m.width || 0), 0) + gap * (phones.length - 1);
  const canvasW = totalPhonesWidth + padding * 2;
  const canvasH = phoneHeight + padding * 2 + 40;

  const gradientSvg = Buffer.from(`
    <svg width="${canvasW}" height="${canvasH}">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${accent.r},${accent.g},${accent.b})"/>
          <stop offset="50%" style="stop-color:rgb(15,23,42)"/>
          <stop offset="100%" style="stop-color:rgb(30,64,175)"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
  `);

  let x = padding;
  const composites: { input: Buffer; left: number; top: number }[] = [
    { input: gradientSvg, top: 0, left: 0 },
  ];

  for (let i = 0; i < phones.length; i++) {
    const w = metas[i].width || 0;
    const shadow = await sharp({
      create: {
        width: w + 16,
        height: phoneHeight + 16,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0.35 },
      },
    })
      .blur(12)
      .png()
      .toBuffer();

    composites.push({ input: shadow, left: x - 4, top: padding + 4 });
    composites.push({ input: phones[i], left: x, top: padding });
    x += w + gap;
  }

  mkdirSync(resolve(outputPath, ".."), { recursive: true });

  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 3,
      background: { r: 15, g: 23, b: 42 },
    },
  })
    .composite(composites)
    .jpeg({ quality: 92 })
    .toFile(outputPath);
}

type PortfolioSeed = {
  slug: string;
  title: string;
  category: string;
  description: string;
  long_description: string;
  features: string[];
  website_url: string | null;
  google_play_url: string | null;
  apple_store_url: string | null;
  images: string[];
  accent: { r: number; g: number; b: number };
};

const portfolioSeeds: PortfolioSeed[] = [
  {
    slug: "pacepal",
    title: "PacePal",
    category: "React Native",
    description:
      "Social running app that connects runners worldwide — host group runs, earn rewards, track GPS activities, and compete on leaderboards.",
    long_description:
      "PacePal is the social running app designed to build a community of runners and enhance performance whilst rewarding users along the way. Whether you're new to running or a seasoned ultra marathoner, PacePal offers exciting features to connect, compete, and achieve your running goals.\n\nBuilt with React Native for iOS and Android, the app focuses on community and making running with others more accessible. Users can host or join runs that suit their preferences and earn points for every kilometre tracked — solo runs earn one point per km, while group runs earn two.",
    features: [
      "Host Runs — create group runs with distance, pace, and start location",
      "Join Runs — discover runs via map filters or unique run codes",
      "GPS Tracking — real-time activity logging with route history",
      "Earn Points & Monthly Prize Draws",
      "In-app Messaging for running groups",
      "Pace Calculator for race predictions",
      "Training Plans from approved coaches",
      "Public & private Leaderboards",
    ],
    website_url: null,
    google_play_url:
      "https://play.google.com/store/apps/details?id=com.pacepalv2",
    apple_store_url: "https://apps.apple.com/pk/app/pacepal/id6563148283",
    images: [
      "portfolio/pacepal/4F0ACD68-BFA8-44AA-9A63-E0F1A167F8AD.PNG",
      "portfolio/pacepal/9831D995-E93E-4D50-A85C-0C997035BC5D.PNG",
    ],
    accent: { r: 34, g: 197, b: 94 },
  },
  {
    slug: "whenn",
    title: "Whenn — Life & Death Admin",
    category: "React Native",
    description:
      "Productivity app that helps people organize life's essential accounts — utilities, insurance, pensions — and share lists securely with loved ones.",
    long_description:
      "Whenn helps you make sure someone has a map of your life. After death, someone else needs to know which companies you hold accounts with — without having to ask you.\n\nShare your utility companies, WiFi provider, phone contract, savings banks, and pension providers. Edit when you switch provider and keep your Lists up to date. The app supports categorized lists, secure sharing with family members, and an AI-powered Ask Me assistant.\n\nDeveloped for Whenn Limited (UK) and available on both Google Play and the Apple App Store.",
    features: [
      "Categorized Lists — personal, home, documents, utilities",
      "Secure List Sharing with family members",
      "To-do tracking for life admin tasks",
      "Ask Me AI assistant",
      "Insurance, professionals & utilities tracking",
      "Account address management",
      "Paper pack integration via whenn.com",
    ],
    website_url: "https://www.whenn.com",
    google_play_url:
      "https://play.google.com/store/apps/details?id=com.identity.bundle.whenn",
    apple_store_url: "https://apps.apple.com/pk/app/whenn/id1660258574",
    images: [
      "portfolio/whenn.com/8B143BD6-0702-4E22-B97E-240E6011B1AA.PNG",
      "portfolio/whenn.com/FB240C20-C549-46C9-9CFB-724F61DDAAD0.PNG",
    ],
    accent: { r: 16, g: 185, b: 129 },
  },
  {
    slug: "shoof",
    title: "SHOOF | شوف",
    category: "React Native",
    description:
      "Integrated smart platform for security & surveillance products with certified technician booking, agent rewards, and shop-by-brand e-commerce.",
    long_description:
      "The Shoof app is an integrated smart platform that combines security, surveillance, and networking products with quick access to certified technicians at the click of a button. Whether you're an agent looking for wholesale offers or a user in need of reliable technology solutions, Shoof is your first destination.\n\nBrowse products from leading companies like Hikvision, enjoy a points and incentive system for agents, request specialized technicians in your area, and access articles about the latest security solutions. Shoof is not just a store — it's a smart system enhancing the purchasing and technical support experience.",
    features: [
      "Security & surveillance product catalog",
      "Shop by brand — Hikvision, Eyeping, Etha, Hexa",
      "Installation, maintenance & inspection services",
      "Agent points & incentive rewards system",
      "On-demand certified technician requests",
      "Black Friday & promotional campaigns",
      "Arabic & English bilingual support",
      "Location-based service availability",
    ],
    website_url: null,
    google_play_url:
      "https://play.google.com/store/apps/details?id=com.allaith.shoof.app",
    apple_store_url: null,
    images: [
      "portfolio/shoof/D951E405-D595-47C6-AE94-30F91A4D8E77.PNG",
      "portfolio/shoof/9FD17024-8517-406E-93D1-AAC859220D96.PNG",
      "portfolio/shoof/8560E19B-2265-4649-B15A-26FA7A82C866.PNG",
    ],
    accent: { r: 30, g: 64, b: 175 },
  },
  {
    slug: "wafaa-pro",
    title: "Wafaa PRO — Digital Loyalty Wallet",
    category: "Mobile App",
    description:
      "Bilingual French-Arabic digital loyalty wallet and merchant dashboard for tracking customer visits, promotions, and digital card management.",
    long_description:
      "Wafaa is a Digital Loyalty Wallet designed for the French-speaking market with Arabic branding support. The consumer app provides secure login, profile management, and a beautifully minimal earth-toned interface.\n\nWafaa PRO is the merchant-facing companion that lets business owners track loyal customers, monitor monthly entry statistics, manage promotions, and oversee digital loyalty cards — all in real time from a clean dashboard.",
    features: [
      "Secure email & password authentication",
      "French language UI with Arabic branding",
      "Merchant dashboard with visit analytics",
      "Monthly entry & client count tracking",
      "Promotion campaign management",
      "Digital loyalty card system",
      "Customer history & entry logging",
      "Profile & settings management",
    ],
    website_url: null,
    google_play_url: null,
    apple_store_url: null,
    images: [
      "portfolio/wafaa/0123EC12-33DB-492F-BB05-844D40BD31E9.PNG",
      "portfolio/wafaa/73BBE7FD-9FD1-4A72-808F-8D0C75D6188C.PNG",
      "portfolio/wafaa/64CECA05-C9D0-4C91-849F-111A28428E05.PNG",
    ],
    accent: { r: 120, g: 83, b: 60 },
  },
];

async function uploadToStorage(
  localPath: string,
  storagePath: string
): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const fileBuffer = readFileSync(localPath);

  const { error } = await supabase.storage
    .from("site-assets")
    .upload(storagePath, fileBuffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) {
    console.warn(`Storage upload failed: ${error.message}`);
    return null;
  }

  const { data } = supabase.storage.from("site-assets").getPublicUrl(storagePath);
  return data.publicUrl;
}

async function main() {
  loadEnv();

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("Missing DATABASE_URL");
    process.exit(1);
  }

  const publicDir = resolve(process.cwd(), "public/portfolio");
  mkdirSync(publicDir, { recursive: true });

  console.log("Creating enhanced portfolio images...\n");

  const items: (PortfolioSeed & { image_url: string })[] = [];

  for (const seed of portfolioSeeds) {
    const imagePaths = seed.images.map((p) => resolve(process.cwd(), p));
    for (const p of imagePaths) {
      if (!existsSync(p)) {
        console.error(`Missing: ${p}`);
        process.exit(1);
      }
    }

    const localOutput = join(publicDir, `${seed.slug}.jpg`);
    await mergeImagesEnhanced(imagePaths, localOutput, seed.accent);
    console.log(`  ✓ ${seed.slug}.jpg`);

    const remoteUrl = await uploadToStorage(
      localOutput,
      `portfolio/${seed.slug}.jpg`
    );
    items.push({
      ...seed,
      image_url: remoteUrl || `/portfolio/${seed.slug}.jpg`,
    });
  }

  console.log("\nRunning migration & seeding...\n");

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  const migration = readFileSync(
    resolve(process.cwd(), "supabase/portfolio-detail-migration.sql"),
    "utf-8"
  );
  await client.query(migration);

  await client.query(`delete from portfolio_items`);

  for (const item of items) {
    await client.query(
      `insert into portfolio_items (
        slug, title, category, description, long_description, features,
        image_url, link, website_url, google_play_url, apple_store_url
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        item.slug,
        item.title,
        item.category,
        item.description,
        item.long_description,
        item.features,
        item.image_url,
        item.website_url,
        item.website_url,
        item.google_play_url,
        item.apple_store_url,
      ]
    );
    console.log(`  ✓ ${item.title}`);
  }

  await client.end();
  console.log(`\nDone! ${items.length} portfolio projects with full details.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
