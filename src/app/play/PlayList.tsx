"use client";

import { useState } from "react";
import type { PlayItem } from "@/lib/content";
import { Tag } from "@/components/ui";
// Imported directly (not via the layout barrel) — this is a client
// component, and re-exporting through components/layout/index.ts would
// pull in Image/Video's server-only Cloudinary Admin SDK import.
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Column } from "@/components/layout/Column";
import { GridSpacer } from "@/components/layout/GridSpacer";
import { ListStack } from "@/components/layout/ListStack";
import { PlayListRow } from "@/components/layout/PlayListRow";
import styles from "./PlayList.module.css";

type Props = {
  items: PlayItem[];
  allTags: string[];
};

// Filters and the list live in the same client component (rather than
// filters in the page's static header + list here) because both need the
// same selectedTags state — the header Section's filter row and the list
// Section below it are two halves of one interactive unit.
export default function PlayList({ items, allTags }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const filtered =
    selectedTags.length === 0
      ? items
      : items.filter((item) =>
          selectedTags.every((tag) => item.tags.includes(tag))
        );

  return (
    <>
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h1 className="display-xl">Play</h1>
            <div
              role="group"
              aria-label="Filter by tag"
              className={styles.filterRow}
            >
              {allTags.map((tag) => (
                <Tag
                  key={tag}
                  kind="tag"
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  className={styles.clear}
                  onClick={() => setSelectedTags([])}
                >
                  Clear
                </button>
              )}
            </div>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            {filtered.length > 0 ? (
              <ListStack>
                {filtered.map((item) => (
                  <PlayListRow
                    key={item.slug}
                    title={item.title}
                    href={`/play/${item.slug}/`}
                    tags={item.tags}
                    onTagClick={toggleTag}
                  />
                ))}
              </ListStack>
            ) : (
              <p className="body-m">No items match the selected filters.</p>
            )}
          </Column>
        </Grid>
      </Section>
    </>
  );
}
