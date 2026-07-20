"use client";

import { Children, useState } from "react";
import styles from "./Blockquote.module.css";

const MAX_VISIBLE = 4;

type Props = {
  children: React.ReactNode;
};

// Loops both directions, no position indicator. Capped at 4 visible
// peeking layers regardless of total quote count. Every quote is always
// rendered — not just the current 4-layer window — stacked in the same
// grid cell (see .stack/.card in Blockquote.module.css). That's what lets
// the box's height come from CSS grid auto-sizing against the tallest
// quote among ALL siblings, with no JS measurement and no resize jump as
// the active quote changes. Quotes outside the visible window render at
// data-depth="hidden": invisible, but still occupying the shared cell so
// they still count toward that height.
//
// Cards are keyed by their stable item index (not stack position/depth)
// so a card animates smoothly from one depth to the next as it advances,
// rather than crossfading in place. The outer card (border/shadow/
// position) settles into its new depth; the inner quote body crossfades
// independently and faster — see Blockquote.module.css for why.
export function BlockquoteStack({ children }: Props) {
  const items = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const total = items.length;

  if (total === 0) return null;

  const goNext = () => setIndex((i) => (i + 1) % total);
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);

  const visibleCount = Math.min(total, MAX_VISIBLE);

  const cards = items
    .map((item, itemIndex) => {
      const relative = (itemIndex - index + total) % total;
      const depth = relative < visibleCount ? relative : null;
      return { item, itemIndex, depth };
    })
    .sort((a, b) => (b.depth ?? -1) - (a.depth ?? -1)); // back-to-front paint order

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
        {cards.map(({ item, itemIndex, depth }) => (
          <div
            key={itemIndex}
            className={styles.card}
            data-depth={depth === null ? "hidden" : depth}
            aria-hidden={depth !== 0}
          >
            <div className={styles.quoteBody}>
              <span className={styles.mark} aria-hidden="true" />
              <div className={`body-l ${styles.content}`}>{item}</div>
            </div>
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
