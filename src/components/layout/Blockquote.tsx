import { Children } from "react";
import styles from "./Blockquote.module.css";
import { BlockquoteStack } from "./BlockquoteStack";

type Props = {
  children: React.ReactNode;
};

// Minimal by design: quote text + a decorative open-quote mark only — no
// attribution fields, no header-color strip. Mode-switches on child count:
// a single child renders a plain quote, multiple children render an
// interactive looping stack.
export function Blockquote({ children }: Props) {
  const items = Children.toArray(children);

  if (items.length <= 1) {
    return (
      <blockquote className={styles.quote}>
        <span className={styles.mark} aria-hidden="true">
          “
        </span>
        <div className={styles.content}>{children}</div>
      </blockquote>
    );
  }

  return <BlockquoteStack items={items} />;
}
