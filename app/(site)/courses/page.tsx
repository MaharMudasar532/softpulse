import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BarChart } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { courses } from "@/lib/data/static";
import { buildPageMetadata, coursesPageJsonLd, seoKeywords } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Courses in Sargodha — Web, React, MERN & Shopify Training",
  description:
    "Join SoftPulse for the best IT courses in Sargodha. Learn React.js, React Native, MERN Stack, and Shopify with hands-on projects at our training institute in Al Rehman Trade Center, Sargodha, Pakistan.",
  path: "/courses",
  keywords: seoKeywords.courses,
});

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={coursesPageJsonLd()} />
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            IT Courses in Sargodha
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Pakistan&apos;s trusted IT training institute in Sargodha — learn
            React, MERN Stack, React Native, and Shopify with live mentors at
            Al Rehman Trade Center.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <SectionHeader
              label="Learn With Us"
              title="Choose Your Path"
              description="Whether you're just starting out or leveling up, we have a course designed for you."
            />
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, i) => (
              <AnimateIn key={course.slug} delay={i * 80}>
              <Link
                href={`/courses/${course.slug}`}
                className="group block bg-white rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {course.title}
                  </h2>
                  <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
                <p className="text-muted leading-relaxed mb-6">
                  {course.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart className="w-4 h-4 text-primary" />
                    {course.level}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center text-muted leading-relaxed text-sm">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Best IT Training Institute for Courses in Sargodha
          </h2>
          <p>
            Searching for IT courses in Sargodha or programming courses near
            you? SoftPulse offers the most practical tech courses in Sargodha —
            including React.js, React Native, MERN Stack, and Shopify
            development. Our coding classes in Sargodha are project-based, taught
            by working developers, and designed to get you job-ready. Visit us
            at Al Rehman Trade Center, Sargodha, or apply online today.
          </p>
        </div>
      </section>
    </>
  );
}
