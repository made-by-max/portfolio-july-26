import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPlayItems, getPlayBySlug } from "@/lib/content";
import { buildImageUrl } from "@/lib/cloudinary";
import {
  ContentWrapper,
  Section,
  Grid,
  Column,
  GridSpacer,
  WritingHero,
  CodeHero,
} from "@/components/layout";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedPlayItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPlayBySlug(slug);
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

export default async function PlayItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getPlayBySlug(slug);

  if (!item || item.isDraft) notFound();

  const { default: Content } = await import(
    `../../../../content/play/${slug}.mdx`
  );

  const isCode = item.type === "project" || item.type === "experiment";

  // PlayFrontmatter has no dedicated alt field yet — falling back to the
  // title until one is added to the schema.
  const alt = item.title;
  const codeProps = {
    title: item.title,
    description: item.description,
    date: item.date,
    tags: item.tags,
    techStack: item.techStack,
    buttons: item.buttons,
  };
  const writingProps = {
    title: item.title,
    description: item.description,
    date: item.date,
    tags: item.tags,
  };

  return (
    <ContentWrapper>
      <Section>
        {isCode ? (
          item.video ? (
            <CodeHero
              {...codeProps}
              video={item.video}
              videoAutoplay={item.videoAutoplay}
              alt={alt}
            />
          ) : item.image ? (
            <CodeHero {...codeProps} image={item.image} alt={alt} />
          ) : (
            <CodeHero {...codeProps} />
          )
        ) : item.video ? (
          <WritingHero
            {...writingProps}
            video={item.video}
            videoAutoplay={item.videoAutoplay}
            alt={alt}
          />
        ) : item.image ? (
          <WritingHero {...writingProps} image={item.image} alt={alt} />
        ) : (
          <WritingHero {...writingProps} />
        )}
      </Section>
      <GridSpacer columns={[1]} />
      <Section>
        <Grid columns={[1]}>
          <Column className={styles.content}>
            <Content />
          </Column>
        </Grid>
      </Section>
    </ContentWrapper>
  );
}
