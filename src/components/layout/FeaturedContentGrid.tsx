import { Children } from "react";
import styles from "./FeaturedContentGrid.module.css";

type Props = {
  children: React.ReactNode;
};

// Auto-fit grid, so how many items land in a row depends on viewport
// width. Rather than measuring rendered positions to know which items
// need a divider, .grid's own background shows through a 1px gap between
// items (each item paints over it with its own background) — draws a
// line at every internal boundary, in both directions, natively, with no
// JS and no re-measurement on resize.
export function FeaturedContentGrid({ children }: Props) {
  const items = Children.toArray(children);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {items.map((child, index) => (
          <div key={index} className={styles.item}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
