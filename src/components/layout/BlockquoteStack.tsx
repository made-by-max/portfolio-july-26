"use client";

import { useState } from "react";
import styles from "./Blockquote.module.css";

const MAX_VISIBLE = 4;

type Props = {
  items: React.ReactNode[];
};

// Loops both directions, no position indicator. Capped at 4 visible
// peeking layers regardless of total quote count. Cards are keyed by their
// stable item index (not stack position/depth) so a card animates smoothly
// from one depth to the next as it advances, rather than crossfading in
// place — depth changes drive both the opacity crossfade and the settle
// transform via CSS transitions.
export function BlockquoteStack({ items }: Props) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const goNext = () => setIndex((i) => (i + 1) % total);
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);

  const visibleCount = Math.min(total, MAX_VISIBLE);
  const cards = Array.from({ length: visibleCount }, (_, depth) => ({
    depth,
    itemIndex: (index + depth) % total,
  })).sort((a, b) => b.depth - a.depth); // back-to-front paint order

  return (
    <div className={styles.stackWrapper}>
      <button
        type="button"
        className={styles.arrow}
        onClick={goPrev}
        aria-label="Previous quote"
      >
        ‹
      </button>

      <div className={styles.stack}>
        {cards.map(({ depth, itemIndex }) => (
          <div
            key={itemIndex}
            className={styles.card}
            data-depth={depth}
            aria-hidden={depth !== 0}
          >
            <span className={styles.mark} aria-hidden="true">
              “
            </span>
            <div className={styles.content}>{items[itemIndex]}</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrow}
        onClick={goNext}
        aria-label="Next quote"
      >
        ›
      </button>
    </div>
  );
}
