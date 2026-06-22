import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Globe } from "lucide-react";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { Button } from "@/components/ui/Button";
import { getPortfolioItemBySlug, getPortfolioSlugs } from "@/lib/data/queries";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, portfolioJsonLd, seoKeywords } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) return { title: "Project Not Found" };
  return buildPageMetadata({
    title: `${item.title} — Portfolio | SoftPulse`,
    description: `${item.description} Built by SoftPulse software house.`,
    path: `/portfolio/${slug}`,
    keywords: [...seoKeywords.services, item.category],
  });
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const website = item.website_url || item.link;
  const features = item.features?.length ? item.features : [];

  return (
    <>
      <JsonLd data={portfolioJsonLd(item)} />
      <section className="pt-28 pb-12 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Breadcrumbs
            light
            items={[
              { name: "Portfolio", path: "/#portfolio" },
              { name: item.title, path: `/portfolio/${slug}` },
            ]}
          />
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <span className="inline-block px-3 py-1 rounded-full glass text-sm font-medium text-blue-100 mb-4">
            {item.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {item.title}
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl leading-relaxed">
            {item.description}
          </p>
          <div className="mt-8">
            <StoreButtons
              googlePlayUrl={item.google_play_url}
              appleStoreUrl={item.apple_store_url}
            />
          </div>
        </div>
      </section>

      {item.image_url && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
              <Image
                src={item.image_url}
                alt={`${item.title} — ${item.category} by SoftPulse`}
                width={1600}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {item.long_description && (
              <div>
                <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                <div className="prose prose-slate max-w-none">
                  {item.long_description.split("\n\n").map((para, i) => (
                    <p key={i} className="text-muted leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-border"
                    >
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <div className="sticky top-24 bg-white rounded-2xl border border-border p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-bold">Get the App</h3>
              <StoreButtons
                googlePlayUrl={item.google_play_url}
                appleStoreUrl={item.apple_store_url}
                className="flex-col [&_a]:w-full [&_a]:justify-center"
              />
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  Visit website
                </a>
              )}
              <div className="pt-4 border-t border-border">
                <Button href="/#contact" className="w-full">
                  Build Something Similar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
