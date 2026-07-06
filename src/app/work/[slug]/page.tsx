import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedWorkItems, getWorkBySlug } from "@/lib/content";
import { buildImageUrl } from "@/lib/cloudinary";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedWorkItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
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
  const item = getWorkBySlug(slug);

  if (!item || item.isDraft) notFound();

  // Dynamic import of the MDX file
  const { default: Content } = await import(
    `../../../../content/work/${slug}.mdx`
  );

  return (
    <main>
      <h1>{item.title}</h1>
      <p>{item.overview}</p>
      <Content />
    </main>
  );
}
