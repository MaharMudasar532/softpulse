import { getPageSeoContent } from "@/lib/data/page-seo";
import { FaqSection } from "@/components/seo/FaqSection";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { SeoContentBlock } from "@/components/seo/SeoContentBlock";

export function PageSeoBlocks({ slug }: { slug: string }) {
  const content = getPageSeoContent(slug);
  if (!content) return null;

  return (
    <>
      <SeoContentBlock content={content} />
      <FaqSection faqs={content.faqs} />
      <RelatedLinks links={content.relatedLinks} />
    </>
  );
}
