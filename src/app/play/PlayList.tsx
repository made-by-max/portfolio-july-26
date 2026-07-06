"use client";

import { useState } from "react";
import type { PlayItem } from "@/lib/content";

type Props = {
  items: PlayItem[];
  allTags: string[];
};

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
    <div>
      <div role="group" aria-label="Filter by tag">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            aria-pressed={selectedTags.includes(tag)}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button onClick={() => setSelectedTags([])}>Clear</button>
        )}
      </div>

      <ul>
        {filtered.map((item) => (
          <li key={item.slug}>
            <a href={`/play/${item.slug}/`}>
              <strong>{item.title}</strong>
              <span>{item.type}</span>
              <p>{item.description}</p>
            </a>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && <p>No items match the selected filters.</p>}
    </div>
  );
}
