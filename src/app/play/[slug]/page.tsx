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

  return (
    <ContentWrapper>
      <Section texture>
        {isCode ? (
          item.image ? (
            <CodeHero
              title={item.title}
              description={item.description}
              date={item.date}
              tags={item.tags}
              techStack={item.techStack}
              image={item.image}
              // PlayFrontmatter has no dedicated alt field yet — falling
              // back to the title until one is added to the schema.
              imageAlt={item.title}
            />
          ) : (
            <CodeHero
              title={item.title}
              description={item.description}
              date={item.date}
              tags={item.tags}
              techStack={item.techStack}
            />
          )
        ) : item.image ? (
          <WritingHero
            title={item.title}
            description={item.description}
            date={item.date}
            tags={item.tags}
            image={item.image}
            imageAlt={item.title}
          />
        ) : (
          <WritingHero
            title={item.title}
            description={item.description}
            date={item.date}
            tags={item.tags}
          />
        )}
      </Section>
      <GridSpacer columns={[1]} />
      <Section>
        <Grid columns={[1]}>
          <Column>
            <Content />
          </Column>
        </Grid>
      </Section>
    </ContentWrapper>
  );
}
