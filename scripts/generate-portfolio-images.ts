/**
 * Regenerates modern portfolio hero images from phone screenshots.
 * Output: public/portfolio/{slug}.jpg (same filenames as before)
 *
 * Run: npm run generate:portfolio-images
 */
import { existsSync, mkdirSync, readFileSync } from "fs";
import { join, resolve } from "path";
import sharp from "sharp";

const BRAND = {
  gradientStart: "#1e40af",
  gradientMid: "#2563eb",
  gradientEnd: "#0ea5e9",
  foreground: "#0f172a",
  white: "#ffffff",
  muted: "#94a3b8",
  glass: "rgba(255,255,255,0.12)",
};

const CANVAS_W = 1600;
const CANVAS_H = 900;

export type PortfolioImageSeed = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  features: string[];
  platforms?: string;
  images: string[];
  accent: string;
};

export const portfolioImageSeeds: PortfolioImageSeed[] = [
  {
    slug: "pacepal",
    title: "PacePal",
    subtitle: "Social running app with GPS tracking & rewards",
    category: "React Native",
    features: ["Group Runs", "GPS Tracking", "Leaderboards"],
    platforms: "iOS & Android",
    images: [
      "portfolio/pacepal/4F0ACD68-BFA8-44AA-9A63-E0F1A167F8AD.PNG",
      "portfolio/pacepal/9831D995-E93E-4D50-A85C-0C997035BC5D.PNG",
    ],
    accent: "#22c55e",
  },
  {
    slug: "whenn",
    title: "Whenn",
    subtitle: "Life admin organizer for families",
    category: "React Native",
    features: ["Secure Sharing", "AI Assistant", "Account Lists"],
    platforms: "iOS & Android",
    images: [
      "portfolio/whenn.com/8B143BD6-0702-4E22-B97E-240E6011B1AA.PNG",
      "portfolio/whenn.com/FB240C20-C549-46C9-9CFB-724F61DDAAD0.PNG",
    ],
    accent: "#10b981",
  },
  {
    slug: "shoof",
    title: "SHOOF | شوف",
    subtitle: "Security marketplace & technician booking",
    category: "React Native",
    features: ["Shop by Brand", "Agent Rewards", "Arabic / English"],
    platforms: "Google Play",
    images: [
      "portfolio/shoof/D951E405-D595-47C6-AE94-30F91A4D8E77.PNG",
      "portfolio/shoof/9FD17024-8517-406E-93D1-AAC859220D96.PNG",
      "portfolio/shoof/8560E19B-2265-4649-B15A-26FA7A82C866.PNG",
    ],
    accent: "#3b82f6",
  },
  {
    slug: "wafaa-pro",
    title: "Wafaa PRO",
    subtitle: "Digital loyalty wallet & merchant dashboard",
    category: "Mobile App",
    features: ["Loyalty Cards", "Visit Analytics", "Promotions"],
    platforms: "Consumer + Merchant",
    images: [
      "portfolio/wafaa/0123EC12-33DB-492F-BB05-844D40BD31E9.PNG",
      "portfolio/wafaa/73BBE7FD-9FD1-4A72-808F-8D0C75D6188C.PNG",
      "portfolio/wafaa/64CECA05-C9D0-4C91-849F-111A28428E05.PNG",
    ],
    accent: "#a67c52",
  },
];

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildBackgroundSvg(accent: string): Buffer {
  const grid = `
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M36 34v2H24v-2h12zM36 24v2H24v-2h12z" fill="#ffffff" fill-opacity="0.04"/>
    </pattern>
  `;

  const svg = `
    <svg width="${CANVAS_W}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${BRAND.gradientStart}"/>
          <stop offset="55%" stop-color="${BRAND.gradientMid}"/>
          <stop offset="100%" stop-color="${BRAND.gradientEnd}"/>
        </linearGradient>
        <radialGradient id="glow" cx="80%" cy="30%" r="50%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        ${grid}
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#glow)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <circle cx="120" cy="780" r="180" fill="#ffffff" fill-opacity="0.04"/>
      <circle cx="1450" cy="120" r="120" fill="#ffffff" fill-opacity="0.06"/>
    </svg>
  `;
  return Buffer.from(svg);
}

function buildTextOverlay(seed: PortfolioImageSeed): Buffer {
  const featureChips = seed.features
    .map(
      (f, i) => `
      <g transform="translate(0, ${i * 52})">
        <rect x="0" y="0" width="${Math.min(280, f.length * 11 + 48)}" height="40" rx="20"
          fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
        <circle cx="22" cy="20" r="5" fill="${seed.accent}"/>
        <text x="38" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="15"
          font-weight="600" fill="#ffffff">${escapeXml(f)}</text>
      </g>
    `
    )
    .join("");

  const svg = `
    <svg width="${CANVAS_W}" height="${CANVAS_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#dbeafe"/>
        </linearGradient>
      </defs>

      <!-- left content panel -->
      <rect x="0" y="0" width="620" height="${CANVAS_H}" fill="rgba(15,23,42,0.28)"/>

      <!-- category badge -->
      <rect x="72" y="88" width="${seed.category.length * 9 + 44}" height="36" rx="18"
        fill="${BRAND.gradientMid}" fill-opacity="0.95"/>
      <text x="94" y="111" font-family="system-ui, -apple-system, sans-serif" font-size="14"
        font-weight="700" fill="#ffffff" letter-spacing="0.5">${escapeXml(seed.category.toUpperCase())}</text>

      <!-- title -->
      <text x="72" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="58"
        font-weight="800" fill="url(#titleGrad)">${escapeXml(seed.title)}</text>

      <!-- subtitle -->
      <text x="72" y="252" font-family="system-ui, -apple-system, sans-serif" font-size="22"
        font-weight="500" fill="#bfdbfe">${escapeXml(seed.subtitle)}</text>

      <!-- accent line -->
      <rect x="72" y="278" width="72" height="4" rx="2" fill="${seed.accent}"/>

      <!-- feature chips -->
      <g transform="translate(72, 320)">
        ${featureChips}
      </g>

      ${
        seed.platforms
          ? `
      <rect x="72" y="520" width="${seed.platforms.length * 9 + 40}" height="32" rx="16"
        fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
      <text x="92" y="541" font-family="system-ui, -apple-system, sans-serif" font-size="13"
        font-weight="600" fill="#e2e8f0">${escapeXml(seed.platforms)}</text>
      `
          : ""
      }

      <!-- SoftPulse branding -->
      <text x="72" y="${CANVAS_H - 56}" font-family="system-ui, -apple-system, sans-serif" font-size="13"
        font-weight="600" fill="#94a3b8" letter-spacing="1">BUILT BY</text>
      <text x="72" y="${CANVAS_H - 28}" font-family="system-ui, -apple-system, sans-serif" font-size="22"
        font-weight="800" fill="#ffffff">SoftPulse</text>
      <text x="72" y="${CANVAS_H - 8}" font-family="system-ui, -apple-system, sans-serif" font-size="12"
        font-weight="500" fill="#64748b">Software House · Sargodha</text>

      <!-- decorative portfolio label -->
      <text x="520" y="${CANVAS_H - 40}" font-family="system-ui, -apple-system, sans-serif" font-size="11"
        font-weight="600" fill="rgba(255,255,255,0.35)" letter-spacing="3">PORTFOLIO</text>
    </svg>
  `;
  return Buffer.from(svg);
}

async function phoneFrame(screenshotPath: string, height: number): Promise<Buffer> {
  const bezel = 10;
  const corner = 36;
  const screenH = height - bezel * 2;
  const screenBuf = await sharp(screenshotPath)
    .resize({ height: screenH, fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 1 } })
    .png()
    .toBuffer();
  const screenMeta = await sharp(screenBuf).metadata();
  const screenW = screenMeta.width || 200;
  const frameW = screenW + bezel * 2;
  const frameH = height;

  const frameSvg = Buffer.from(`
    <svg width="${frameW}" height="${frameH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frame" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.45"/>
        </filter>
      </defs>
      <rect x="0" y="0" width="${frameW}" height="${frameH}" rx="${corner}" ry="${corner}"
        fill="url(#frame)" filter="url(#shadow)"/>
      <rect x="${bezel}" y="${bezel}" width="${screenW}" height="${screenH}" rx="${corner - 8}" ry="${corner - 8}"
        fill="#0f172a"/>
    </svg>
  `);

  const frameBase = await sharp(frameSvg).png().toBuffer();

  const roundedScreen = await sharp(screenBuf)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${screenW}" height="${screenH}"><rect width="100%" height="100%" rx="${corner - 8}" ry="${corner - 8}" fill="white"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  return sharp(frameBase)
    .composite([{ input: roundedScreen, left: bezel, top: bezel }])
    .png()
    .toBuffer();
}

export async function buildPortfolioImage(seed: PortfolioImageSeed, outputPath: string) {
  const phoneHeight = seed.images.length >= 3 ? 620 : 680;
  const gap = seed.images.length >= 3 ? 24 : 32;
  const phones = await Promise.all(
    seed.images.map((p) => phoneFrame(resolve(process.cwd(), p), phoneHeight))
  );
  const metas = await Promise.all(phones.map((b) => sharp(b).metadata()));
  const totalPhoneW =
    metas.reduce((s, m) => s + (m.width || 0), 0) + gap * (phones.length - 1);

  const phoneAreaLeft = CANVAS_W - totalPhoneW - 80;
  const phoneTop = Math.round((CANVAS_H - phoneHeight) / 2) + 20;

  const composites: { input: Buffer; left: number; top: number }[] = [
    { input: buildBackgroundSvg(seed.accent), left: 0, top: 0 },
  ];

  let x = phoneAreaLeft;
  for (let i = 0; i < phones.length; i++) {
    const offsetY = i % 2 === 1 ? -18 : 18;
    composites.push({ input: phones[i], left: x, top: phoneTop + offsetY });
    x += (metas[i].width || 0) + gap;
  }

  composites.push({ input: buildTextOverlay(seed), left: 0, top: 0 });

  mkdirSync(resolve(outputPath, ".."), { recursive: true });

  await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 3,
      background: { r: 30, g: 64, b: 175 },
    },
  })
    .composite(composites)
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(outputPath);
}

async function main() {
  const outDir = resolve(process.cwd(), "public/portfolio");
  mkdirSync(outDir, { recursive: true });

  console.log("Generating modern portfolio images...\n");

  for (const seed of portfolioImageSeeds) {
    for (const img of seed.images) {
      const p = resolve(process.cwd(), img);
      if (!existsSync(p)) {
        console.error(`Missing source screenshot: ${p}`);
        process.exit(1);
      }
    }

    const output = join(outDir, `${seed.slug}.jpg`);
    await buildPortfolioImage(seed, output);
    console.log(`  ✓ ${seed.slug}.jpg`);
  }

  // Legacy alternate filenames — map to same modern renders for any cached references
  const aliases: Record<string, string> = {
    "pacepal-social-running.jpg": "pacepal.jpg",
    "whenn-life-organizer.jpg": "whenn.jpg",
    "shoof-marketplace.jpg": "shoof.jpg",
    "shoof-services-platform.jpg": "shoof.jpg",
    "wafaa-digital-wallet.jpg": "wafaa-pro.jpg",
    "wafaa-pro-business.jpg": "wafaa-pro.jpg",
  };

  for (const [alias, source] of Object.entries(aliases)) {
    const src = join(outDir, source);
    const dest = join(outDir, alias);
    if (existsSync(src)) {
      const buf = readFileSync(src);
      await sharp(buf).jpeg({ quality: 93 }).toFile(dest);
      console.log(`  ✓ ${alias} (alias)`);
    }
  }

  console.log("\nDone! Portfolio images updated in public/portfolio/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
