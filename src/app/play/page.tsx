import type { Metadata } from "next";
import { getPublishedPlayItems } from "@/lib/content";
import { ContentWrapper } from "@/components/layout";
import PlayList from "./PlayList";

export const metadata: Metadata = {
  title: "Play",
  description: "Blog posts, notes, projects, and experiments",
};

export default function PlayPage() {
  const items = getPublishedPlayItems();

  const allTags = Array.from(
    new Set(items.flatMap((item) => item.tags))
  ).sort();

  return (
    <ContentWrapper>
      <PlayList items={items} allTags={allTags} />
    </ContentWrapper>
  );
}
