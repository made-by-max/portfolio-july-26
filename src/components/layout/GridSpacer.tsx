import type { CSSProperties } from "react";
import styles from "./GridSpacer.module.css";

type Props = {
  /**
   * Same shape as Grid's own `columns` prop. Pass the same array as the
   * Grid immediately above or below to continue its dividers straight
   * through the gap; when the two sides don't share a column structure,
   * pass a generic evenly-spaced array instead (e.g. [1, 1, 1, 1]) — this
   * component has no way to inspect its neighbors, so the caller picks.
   */
  columns: number[];
};

// A visible blank spacer between Sections, or between stacked Grids within
// a Section — a real element with its own border-framed grid lines, not
// padding/margin standing in for whitespace. Purely decorative (no
// content), so it's hidden from assistive tech.
export function GridSpacer({ columns }: Props) {
  const gridTemplateColumns = columns.map((fr) => `${fr}fr`).join(" ");

  return (
    <div
      className={styles.spacer}
      style={{ "--grid-columns": gridTemplateColumns } as CSSProperties}
      aria-hidden="true"
    >
      {columns.map((_, index) => (
        <div key={index} className={styles.cell} />
      ))}
    </div>
  );
}
