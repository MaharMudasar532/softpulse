import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServicePage,
  getTrainingPage,
  allDynamicSlugs,
} from "@/lib/data/pages";
import {
  getServicePageMetadata,
  getTrainingPageMetadata,
} from "@/lib/seo";
import { ServiceDetailView } from "@/components/pages/ServiceDetailView";
import { TrainingDetailView } from "@/components/pages/TrainingDetailView";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allDynamicSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (service) return getServicePageMetadata(service);
  const training = getTrainingPage(slug);
  if (training) return getTrainingPageMetadata(training);
  return { title: "Not Found" };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (service) return <ServiceDetailView page={service} />;

  const training = getTrainingPage(slug);
  if (training) return <TrainingDetailView page={training} />;

  notFound();
}
