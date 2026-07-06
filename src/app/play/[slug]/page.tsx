import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPlayItems, getPlayBySlug } from "@/lib/content";
import { buildImageUrl } from "@/lib/cloudinary";

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

  return (
    <main>
      <h1>{item.title}</h1>
      <Content />
    </main>
  );
}
