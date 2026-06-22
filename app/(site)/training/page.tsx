import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BarChart } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { trainingPages } from "@/lib/data/pages";
import { courses } from "@/lib/data/static";
import { buildPageMetadata, seoKeywords, trainingHubJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Training & Programming Courses | SoftPulse",
  description:
    "Hands-on IT training in React, React Native, MERN Stack, Node.js, and web development. Project-based courses with live mentorship and certification.",
  path: "/training",
  keywords: seoKeywords.training,
});

export default function TrainingPage() {
  return (
    <>
      <JsonLd data={trainingHubJsonLd()} />
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">IT Training</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Project-based programming courses taught by working developers —
            from beginner to job-ready.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Learn With Us"
            title="Programming Courses"
            description="Choose your path and build real portfolio projects with mentor support."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {trainingPages.map((page) => {
              const course = courses.find((c) => c.slug === page.courseSlug);
              return (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="group block bg-white rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {page.headline}
                    </h2>
                    <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                  <p className="text-muted leading-relaxed mb-6">
                    {page.subheadline}
                  </p>
                  {course && (
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
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
