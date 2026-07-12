import { Children } from "react";
import styles from "./ListStack.module.css";

type Props = {
  children: React.ReactNode;
};

// Flex column of freeform-MDX blocks. Structurally inferred — no explicit
// <ListStackItem> wrapper; every direct child gets a divider except the
// first. Dividers are full-bleed to the parent Column's edges.
export function ListStack({ children }: Props) {
  const items = Children.toArray(children);

  return (
    <div className={styles.stack}>
      {items.map((child, index) => (
        <div
          key={index}
          className={index === 0 ? styles.item : styles.itemDivided}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
