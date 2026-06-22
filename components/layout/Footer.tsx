import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Globe,
  ExternalLink,
} from "lucide-react";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { servicePages, trainingPages } from "@/lib/data/pages";
import { socialProfiles } from "@/lib/seo";
import type { SiteSettings } from "@/lib/types";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const caseStudyLinks = [
  { label: "Karzame Fintech", href: "/case-study-karzame" },
  { label: "Shopify App", href: "/case-study-shopify-app" },
  { label: "Loyalty Wallet", href: "/case-study-loyalty-app" },
];

const externalLinks = [
  { label: "Fiverr", href: socialProfiles.fiverr },
  { label: "Upwork", href: socialProfiles.upwork },
  { label: "Google Maps", href: socialProfiles.googleMaps },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-6 [&_span]:text-white [&_span_span]:text-blue-400">
              <SiteLogo settings={settings} variant="light" />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Software house & IT training institute — building web and mobile
              products while training the next generation of developers.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href={`mailto:${settings.contact_email}`} className="hover:text-blue-400 transition-colors">
                  {settings.contact_email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href={`tel:${settings.contact_phone.replace(/\s/g, "")}`} className="hover:text-blue-400 transition-colors">
                  {settings.contact_phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{settings.contact_address}</span>
              </div>
              <a
                href={socialProfiles.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {settings.contact_phone}</span>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {servicePages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="text-sm hover:text-blue-400 transition-colors">
                    {page.headline}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  All Services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Training</h3>
            <ul className="space-y-2">
              {trainingPages.slice(0, 5).map((page) => (
                <li key={page.slug}>
                  <Link href={`/${page.slug}`} className="text-sm hover:text-blue-400 transition-colors">
                    {page.headline}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/training" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  All Courses →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mb-3 text-sm">Case Studies</h3>
            <ul className="space-y-2">
              {caseStudyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} {settings.site_name}. All rights reserved.</p>
          {settings.website_url && (
            <a
              href={settings.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {settings.website_url.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
