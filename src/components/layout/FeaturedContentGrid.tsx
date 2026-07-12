"use client";

import { Children, useEffect, useRef, useState } from "react";
import styles from "./FeaturedContentGrid.module.css";

type Props = {
  children: React.ReactNode;
};

// Auto-fit grid, so how many items land in the first row depends on
// viewport width — there's no pure-CSS way to know whether content wrapped
// to a second row on a dynamic auto-fit grid. Measures actual rendered
// positions instead (same DOM-geometry approach PinnedMediaScrollClient
// already uses for scroll position) and marks every item past the first
// row so it picks up a divider.
export function FeaturedContentGrid({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnsPerRow, setColumnsPerRow] = useState<number | null>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const cells = Array.from(el.children) as HTMLElement[];
      if (cells.length === 0) return;
      const firstTop = cells[0].offsetTop;
      const count = cells.filter((cell) => cell.offsetTop === firstTop).length;
      setColumnsPerRow(count);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div ref={containerRef} className={styles.grid}>
      {items.map((child, index) => (
        <div
          key={index}
          className={styles.item}
          data-row-divider={
            columnsPerRow !== null && index >= columnsPerRow
              ? "true"
              : undefined
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
