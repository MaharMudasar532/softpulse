import {
  BookOpen,
  Code,
  Globe,
  Smartphone,
  Server,
  ArrowRight,
  Clock,
  BarChart,
  Palette,
  Megaphone,
  Video,
  ShoppingBag,
  Layers,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { trainingPages } from "@/lib/data/pages";
import { courses } from "@/lib/data/static";

const courseIcons: Record<string, typeof Code> = {
  "react-native-course-sargodha": Smartphone,
  "react-js-course-sargodha": Code,
  "mern-stack-course-sargodha": Server,
  "nodejs-course-sargodha": Server,
  "web-development-course-sargodha": Globe,
  "mobile-app-development-course-sargodha": Smartphone,
  "shopify-course-sargodha": ShoppingBag,
  "graphic-design-course-sargodha": Palette,
  "digital-marketing-course-sargodha": Megaphone,
  "youtube-automation-course-sargodha": Video,
  "flutter-course-sargodha": Layers,
};

const courseImages: Record<string, string> = {
  "react-native-course-sargodha": "/blog/react-native-course-guide-hero.png",
  "web-development-course-sargodha": "/blog/web-development-course-hero.png",
  "shopify-course-sargodha": "/blog/shopify-course-hero.png",
  "graphic-design-course-sargodha": "/blog/graphic-design-course-hero.png",
  "digital-marketing-course-sargodha": "/blog/digital-marketing-course-hero.png",
  "youtube-automation-course-sargodha": "/blog/youtube-automation-course-hero.png",
  "flutter-course-sargodha": "/blog/react-native-vs-flutter-hero.png",
  "mern-stack-course-sargodha": "/blog/web-development-course-hero.png",
  "mobile-app-development-course-sargodha": "/blog/react-native-course-guide-hero.png",
};

export function Courses() {
  return (
    <section id="courses" className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Learn With Us"
          title="IT Training & Programming Courses"
          description="Project-based courses with live mentorship — from beginner to job-ready developer."
        />

        <p className="max-w-3xl mx-auto text-center text-muted leading-relaxed mb-12 -mt-8">
          Enroll in our{" "}
          <Link href="/react-native-course-sargodha" className="text-primary hover:underline font-medium">
            React Native
          </Link>
          ,{" "}
          <Link href="/web-development-course-sargodha" className="text-primary hover:underline font-medium">
            web development
          </Link>
          ,{" "}
          <Link href="/graphic-design-course-sargodha" className="text-primary hover:underline font-medium">
            graphic design
          </Link>
          ,{" "}
          <Link href="/digital-marketing-course-sargodha" className="text-primary hover:underline font-medium">
            digital marketing
          </Link>
          ,{" "}
          <Link href="/flutter-course-sargodha" className="text-primary hover:underline font-medium">
            Flutter
          </Link>
          , and more — all with real projects and certificate on completion.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingPages.map((page) => {
            const course = courses.find((c) => c.slug === page.courseSlug);
            const Icon = courseIcons[page.slug] || BookOpen;

            return (
              <article
                key={page.slug}
                className="group relative bg-white rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {courseImages[page.slug] && (
                  <Link href={`/${page.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src={courseImages[page.slug]}
                      alt={`${page.headline} at Soft Pulse Sargodha`}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </Link>
                )}
                <div className="p-8">
                {!courseImages[page.slug] && (
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                )}
                {courseImages[page.slug] && (
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                )}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  <Link href={`/${page.slug}`}>{page.headline}</Link>
                </h3>
                <p className="text-muted leading-relaxed mb-4 text-sm">
                  {page.subheadline}
                </p>

                {course && (
                  <div className="flex items-center gap-4 text-sm text-muted mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart className="w-4 h-4 text-primary" aria-hidden="true" />
                      {course.level}
                    </span>
                  </div>
                )}

                {course && (
                  <ul className="space-y-2 mb-6">
                    {course.highlights.slice(0, 3).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/${page.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  View course <ArrowRight className="w-4 h-4" />
                </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/training"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View all courses <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
