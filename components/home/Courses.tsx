import {
  BookOpen,
  Code,
  Globe,
  Smartphone,
  Server,
  ArrowRight,
  Clock,
  BarChart,
} from "lucide-react";
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
            React Native course
          </Link>
          ,{" "}
          <Link href="/mern-stack-course-sargodha" className="text-primary hover:underline font-medium">
            MERN stack course
          </Link>
          ,{" "}
          <Link href="/react-js-course-sargodha" className="text-primary hover:underline font-medium">
            React JS course
          </Link>
          , or{" "}
          <Link href="/web-development-course-sargodha" className="text-primary hover:underline font-medium">
            web development course
          </Link>{" "}
          — all with real projects, portfolio builds, and certificate on completion.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingPages.map((page) => {
            const course = courses.find((c) => c.slug === page.courseSlug);
            const Icon = courseIcons[page.slug] || BookOpen;

            return (
              <article
                key={page.slug}
                className="group relative bg-white rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
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
