import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkItems, getWorkBySlug, getNextWorkItem } from "@/lib/content";
import { buildImageUrl } from "@/lib/cloudinary";
import { ContentWrapper, Section, UpNextCaseStudy } from "@/components/layout";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = await getWorkItems();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWorkBySlug(slug);
  if (!item) return {};

  const ogImage = buildImageUrl(item.image, { width: 1200, quality: 80 });

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      images: [{ url: ogImage }],
    },
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = await getWorkBySlug(slug);

  if (!item) notFound();

  // Dynamic import of the case study's .tsx module — it reads its own
  // `meta` export directly, so no props need to be threaded in here.
  const { default: Content } = await import(
    `../../../../content/work/${slug}.tsx`
  );

  const nextItem = await getNextWorkItem(slug);

  return (
    <ContentWrapper>
      <Content />
      {nextItem && (
        <Section>
          <UpNextCaseStudy
            title={nextItem.title}
            href={`/work/${nextItem.slug}/`}
          />
        </Section>
      )}
    </ContentWrapper>
  );
}
