"use client";

import { useState } from "react";
import type { PlayItem } from "@/lib/content";
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
// same selectedTag state — the header Section's filter row and the list
// Section below it are two halves of one interactive unit.
//
// Single-select, not multi — `null` means "All" (the default/reset state)
// rather than a separate empty-selection state. `items` is expected to
// already be sorted newest-first by getPublishedPlayItems().
export default function PlayList({ items, allTags }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered =
    selectedTag === null
      ? items
      : items.filter((item) => item.tags.includes(selectedTag));

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
              <button
                type="button"
                className={styles.filterButton}
                aria-pressed={selectedTag === null}
                data-selected={selectedTag === null || undefined}
                onClick={() => setSelectedTag(null)}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={styles.filterButton}
                  aria-pressed={selectedTag === tag}
                  data-selected={selectedTag === tag || undefined}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
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
                    onTagClick={setSelectedTag}
                  />
                ))}
              </ListStack>
            ) : (
              <p className="body-m">No items match the selected filter.</p>
            )}
          </Column>
        </Grid>
      </Section>
    </>
  );
}
