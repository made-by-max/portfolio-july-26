import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkItems, getWorkBySlug, getNextWorkItem } from "@/lib/content";
import { buildImageUrl } from "@/lib/cloudinary";
import {
  ContentWrapper,
  Section,
  GridSpacer,
  UpNextCaseStudy,
} from "@/components/layout";
import styles from "./page.module.css";

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

  const ogImage = item.image
    ? buildImageUrl(item.image, { width: 1200, quality: 80 })
    : undefined;

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
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
      <div className={styles.content}>
        <Content />
      </div>
      {nextItem && (
        <>
          {/* The case study content above ends with whatever column
              structure that particular case study happens to use — no
              single shared shape to match, so this falls back to
              UpNextCaseStudy's own [1] column, per GridSpacer's own
              guidance for mismatched neighbors. */}
          <GridSpacer columns={[1]} />
          <Section>
            <UpNextCaseStudy
              title={nextItem.title}
              href={`/work/${nextItem.slug}/`}
            />
          </Section>
        </>
      )}
    </ContentWrapper>
  );
}
