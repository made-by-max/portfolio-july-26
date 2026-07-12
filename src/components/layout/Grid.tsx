import type { CSSProperties } from "react";
import styles from "./Grid.module.css";

type Props = {
  columns: number[];
  children: React.ReactNode;
};

// Structural layout shape (column count/ratio) is a prop; content semantics
// belong to separate named components (Image, Video, ListStack, ...).
export function Grid({ columns, children }: Props) {
  const gridTemplateColumns = columns.map((fr) => `${fr}fr`).join(" ");

  return (
    <div
      className={styles.grid}
      style={{ "--grid-columns": gridTemplateColumns } as CSSProperties}
    >
      {children}
    </div>
  );
}
