import Link from "next/link";
import { Clock, BarChart, CheckCircle, ArrowLeft, Wrench, BookOpen } from "lucide-react";
import { CourseApplyForm } from "@/components/courses/CourseApplyForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageSeoBlocks } from "@/components/seo/PageSeoBlocks";
import { JsonLd } from "@/components/seo/JsonLd";
import type { TrainingPage } from "@/lib/data/pages";
import { getCourseForTraining } from "@/lib/data/pages";
import { trainingJsonLd } from "@/lib/seo";

export function TrainingDetailView({ page }: { page: TrainingPage }) {
  const course = getCourseForTraining(page.slug);
  if (!course) return null;

  const totalTopics = course.outline.reduce((sum, m) => sum + m.topics.length, 0);

  return (
    <>
      <JsonLd data={trainingJsonLd(page, course)} />
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Breadcrumbs
            light
            items={[
              { name: "Training", path: "/training" },
              { name: page.headline, path: `/${page.slug}` },
            ]}
          />
          <Link
            href="/training"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Courses
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {page.headline}
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl leading-relaxed">
            {page.subheadline}
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
                    className="bg-white rounded-2xl border border-border p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-lg gradient-bg text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <span className="text-xs font-medium text-primary">
                          {module.period}
                        </span>
                        <h3 className="font-semibold">{module.title}</h3>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {module.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-primary" />
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg bg-white text-xs font-medium border border-border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 border border-border">
                <h3 className="font-semibold mb-3">Prerequisites</h3>
                <ul className="space-y-1 text-sm text-muted">
                  {course.prerequisites.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-bold mb-4">Course Highlights</h3>
                <ul className="space-y-2">
                  {course.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <CourseApplyForm
                courseSlug={page.slug}
                courseTitle={page.applyTitle}
              />
            </div>
          </div>
        </div>
      </section>

      <PageSeoBlocks slug={page.slug} />
    </>
  );
}
