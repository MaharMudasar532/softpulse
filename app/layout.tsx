import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, rootMetadata, webSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...rootMetadata,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://softpulse.org"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PK" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[webSiteJsonLd(), localBusinessJsonLd()]} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
