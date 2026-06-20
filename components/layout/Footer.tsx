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
import { socialProfiles } from "@/lib/seo";
import type { SiteSettings } from "@/lib/types";

const footerLinks = {
  services: [
    { label: "Mobile App Development Sargodha", href: "/services#mobile-app" },
    { label: "React Native Development", href: "/services#react-native" },
    { label: "Shopify Development Sargodha", href: "/services#shopify" },
    { label: "Web Development Sargodha", href: "/services#web" },
    { label: "UI/UX Design", href: "/services#ui-ux" },
    { label: "All Services", href: "/services" },
  ],
  courses: [
    { label: "React.js Course Sargodha", href: "/courses/react" },
    { label: "React Native Course Sargodha", href: "/courses/react-native" },
    { label: "MERN Stack Course Sargodha", href: "/courses/mern-stack" },
    { label: "Shopify Course Sargodha", href: "/courses/shopify" },
    { label: "All IT Courses in Sargodha", href: "/courses" },
  ],
  company: [
    { label: "About SoftPulse Sargodha", href: "/about" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact", href: "/#contact" },
  ],
};

const externalLinks = [
  { label: "Fiverr Profile", href: socialProfiles.fiverr },
  { label: "Upwork Profile", href: socialProfiles.upwork },
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
              SoftPulse is a software house and IT training institute in
              Sargodha, Pakistan — offering web development services, mobile
              apps, and IT courses at Al Rehman Trade Center, Sargodha.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {settings.contact_email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a
                  href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {settings.contact_phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <a
                  href={socialProfiles.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  {settings.contact_address}
                </a>
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

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Find Us Online
              </p>
              <div className="flex flex-wrap gap-3">
                {externalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">
              Services in Sargodha
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">
              Courses in Sargodha
            </h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {settings.website_url && (
              <a
                href={settings.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
              >
                <Globe className="w-4 h-4 text-blue-400" />
                {settings.website_url.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {settings.site_name}. Software
            house & IT training institute in Sargodha, Pakistan.
          </p>
          <div className="flex gap-6">
            <Link href="/courses" className="hover:text-blue-400 transition-colors">
              IT Courses Sargodha
            </Link>
            <Link href="/services" className="hover:text-blue-400 transition-colors">
              Services Sargodha
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
