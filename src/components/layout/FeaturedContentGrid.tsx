import { Children } from "react";
import styles from "./FeaturedContentGrid.module.css";

type Props = {
  children: React.ReactNode;
};

// Auto-fit grid, so how many items land in a row depends on viewport
// width. Rather than measuring rendered positions to know which items
// need a divider, every item just draws its own bottom/right border (see
// FeaturedContentGrid.module.css) — draws a line at every boundary, in
// both directions, natively, with no JS, no re-measurement on resize, and
// no stray line/box left behind when the last row doesn't fill every
// column.
export function FeaturedContentGrid({ children }: Props) {
  const items = Children.toArray(children);

  return (
    <div className={styles.grid}>
      {items.map((child, index) => (
        <div key={index} className={styles.item}>
          {child}
        </div>
      ))}
    </div>
  );
}
