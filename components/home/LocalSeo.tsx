import Link from "next/link";
import { ArrowRight } from "lucide-react";

const serviceLinks = [
  { href: "/react-native-development", label: "React Native Development" },
  { href: "/mern-stack-development", label: "MERN Stack Development" },
  { href: "/shopify-app-development", label: "Shopify App Development" },
  { href: "/mobile-app-development", label: "Mobile App Development" },
  { href: "/web-development-services", label: "Web Development Services" },
];

const courseLinks = [
  { href: "/react-native-course-sargodha", label: "React Native Course" },
  { href: "/mern-stack-course-sargodha", label: "MERN Stack Course" },
  { href: "/react-js-course-sargodha", label: "React JS Course" },
  { href: "/web-development-course-sargodha", label: "Web Development Course" },
];

export function LocalSeo() {
  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Software House &amp; IT Training in Sargodha
        </h2>
        <p className="text-muted leading-relaxed mb-8">
          SoftPulse is a leading software house in Sargodha providing professional{" "}
          <Link href="/mobile-app-development" className="text-primary hover:underline">
            mobile app development
          </Link>
          ,{" "}
          <Link href="/react-native-development" className="text-primary hover:underline">
            React Native development
          </Link>
          , and{" "}
          <Link href="/mern-stack-development" className="text-primary hover:underline">
            MERN stack development
          </Link>{" "}
          for startups and businesses across Pakistan. We also run an IT training
          institute offering{" "}
          <Link href="/react-native-course-sargodha" className="text-primary hover:underline">
            React Native courses
          </Link>
          ,{" "}
          <Link href="/mern-stack-course-sargodha" className="text-primary hover:underline">
            MERN stack courses
          </Link>
          , and hands-on programming classes for students and developers.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Our Courses</h3>
            <ul className="space-y-2">
              {courseLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
