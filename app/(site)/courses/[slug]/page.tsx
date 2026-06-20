import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, BarChart, CheckCircle, ArrowLeft, Wrench, BookOpen } from "lucide-react";
import Link from "next/link";
import { CourseApplyForm } from "@/components/courses/CourseApplyForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { courses } from "@/lib/data/static";
import {
  buildPageMetadata,
  courseJsonLd,
  courseSeoDescription,
  courseSeoTitle,
  seoKeywords,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Course Not Found" };
  return buildPageMetadata({
    title: courseSeoTitle(course),
    description: courseSeoDescription(course),
    path: `/courses/${slug}`,
    keywords: [
      ...seoKeywords.courses,
      `${course.title} Sargodha`,
      `${course.slug.replace(/-/g, " ")} course Sargodha`,
    ],
  });
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const totalTopics = course.outline.reduce(
    (sum, m) => sum + m.topics.length,
    0
  );

  return (
    <>
      <JsonLd data={courseJsonLd(course)} />
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Courses
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {courseSeoTitle(course)}
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl leading-relaxed">
            {course.description} Available at SoftPulse training institute in
            Sargodha, Pakistan.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-6 text-blue-100">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart className="w-4 h-4" />
              {course.level}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {course.outline.length} modules · {totalTopics} topics
            </span>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-muted leading-relaxed">{course.long_description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Course Outline</h2>
              <div className="space-y-6">
                {course.outline.map((module, i) => (
                  <div
                    key={module.period}
                    className="rounded-2xl border border-border overflow-hidden"
                  >
                    <div className="gradient-bg px-6 py-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                          {module.period}
                        </span>
                        <h3 className="text-white font-bold">{module.title}</h3>
                      </div>
                    </div>
                    <ul className="p-6 space-y-3">
                      {module.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-3 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted leading-relaxed">
                            {topic}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((p) => (
                    <li key={p} className="text-sm text-muted flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="text-lg font-bold mb-4">Course Highlights</h3>
                <ul className="space-y-3 mb-6">
                  {course.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 text-sm text-muted pt-4 border-t border-border">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-medium text-foreground">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level</span>
                    <span className="font-medium text-foreground">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Modules</span>
                    <span className="font-medium text-foreground">
                      {course.outline.length}
                    </span>
                  </div>
                </div>
              </div>

              <CourseApplyForm
                courseSlug={course.slug}
                courseTitle={course.title}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
