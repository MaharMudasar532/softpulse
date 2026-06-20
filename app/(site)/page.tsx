import { FiverrPortfolio } from "@/components/home/FiverrPortfolio";
import { FreelancerProfile } from "@/components/home/FreelancerProfile";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Portfolio } from "@/components/home/Portfolio";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { AnimateIn } from "@/components/ui/AnimateIn";
import {
  getFiverrPortfolioItems,
  getPortfolioItems,
  getSiteSettings,
  getTestimonials,
} from "@/lib/data/queries";

export default async function Home() {
  const [portfolio, testimonials, settings, fiverrItems] = await Promise.all([
    getPortfolioItems(),
    getTestimonials(),
    getSiteSettings(),
    getFiverrPortfolioItems(),
  ]);

  return (
    <>
      <AnimateIn immediate>
        <Hero settings={settings} />
      </AnimateIn>
      <AnimateIn delay={100}>
        <Services />
      </AnimateIn>
      <AnimateIn delay={150}>
        <WhyChoose />
      </AnimateIn>
      <AnimateIn delay={200}>
        <Portfolio items={portfolio} />
      </AnimateIn>
      <AnimateIn delay={250}>
        <FreelancerProfile />
      </AnimateIn>
      <AnimateIn delay={300}>
        <FiverrPortfolio items={fiverrItems} />
      </AnimateIn>
      <AnimateIn delay={350}>
        <Testimonials items={testimonials} />
      </AnimateIn>
      <AnimateIn delay={400}>
        <CTA settings={settings} />
      </AnimateIn>
    </>
  );
}
