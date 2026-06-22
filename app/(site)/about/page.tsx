import type { Metadata } from "next";
import { Target, Heart, Rocket, Mail, Phone, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { teamMembers } from "@/lib/data/static";
import { getSiteSettings } from "@/lib/data/queries";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buildPageMetadata, seoKeywords } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About SoftPulse — Software House & IT Training",
  description:
    "Meet SoftPulse — software house & IT training institute. 50+ projects, 500+ students trained. Team led by Founder & CEO Mahar Mudassar.",
  path: "/about",
  keywords: [...seoKeywords.home, ...seoKeywords.services, ...seoKeywords.training],
});

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section className="pt-32 pb-16 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <div className="max-w-2xl mx-auto text-left mb-6">
            <Breadcrumbs light items={[{ name: "About Us", path: "/about" }]} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About SoftPulse
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            A software house and IT training institute — building digital
            products and training the next generation of developers.
          </p>
        </div>
      </section>

      <section id="story" className="py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Our Story"
                title="Your Story Starts Here"
                description=""
                className="text-left mx-0 mb-8"
              />
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  SoftPulse is a software house and IT training institute helping
                  startups ship faster and students build real-world skills. We
                  combine client projects with hands-on courses in React,
                  Laravel, MERN, Shopify, and React Native.
                </p>
                <p>
                  We&apos;ve delivered 50+ projects across web, mobile, and
                  e-commerce — from Laravel backends and React frontends to
                  React Native apps on the App Store and Play Store. Our team
                  brings the same practical expertise to every client engagement
                  and classroom session.
                </p>
                <p>
                  Through project-based training and mentorship, we&apos;ve
                  trained 500+ students — many now working as developers or
                  building their own products. Whether you need a product built
                  or want to learn how to build one, SoftPulse is your partner
                  worldwide.
                </p>
              </div>
            </div>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-60" />
              <div className="text-center relative z-10">
                <div className="text-6xl font-bold text-primary/30 mb-2">50+</div>
                <div className="text-lg font-semibold text-primary">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="py-24 bg-blue-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Our Mission"
            title="Mission & Values"
            description="Everything we do is guided by a commitment to excellence, integrity, and impact."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description:
                  "To empower businesses with technology that drives growth, delights users, and creates lasting value in the digital world.",
              },
              {
                icon: Heart,
                title: "Our Values",
                description:
                  "Quality over quantity. Transparency in every interaction. Continuous learning. Genuine care for our clients' success.",
              },
              {
                icon: Rocket,
                title: "Our Vision",
                description:
                  "To be the go-to partner for businesses and developers who want to build products that truly make a difference.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="The People"
            title="Meet Our Team"
            description="Talented individuals united by a shared passion for building exceptional digital experiences."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group text-center bg-white rounded-2xl p-8 border border-border hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            label="Visit Us"
            title="Get In Touch"
            description="Reach out for projects, course enrollment, or a free consultation."
            className="mb-10"
          />
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Office</h3>
              <p className="text-sm text-muted leading-relaxed">
                {settings.contact_address}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <a
                href="https://wa.me/923478787881"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                {settings.contact_phone}
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a
                href={`mailto:${settings.contact_email}`}
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                {settings.contact_email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Work With Us?</h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Whether you have a project in mind or want to join our team, we&apos;d
            love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/#contact" size="lg">
              Start a Project
            </Button>
            <Button href="/training" variant="secondary" size="lg">
              Explore Courses
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
