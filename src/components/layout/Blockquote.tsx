import { Children } from "react";
import styles from "./Blockquote.module.css";
import { BlockquoteCarousel } from "./BlockquoteCarousel";

type Props = {
  children: React.ReactNode;
};

// Minimal by design: quote text + a decorative open-quote mark only — no
// attribution fields, no header-color strip. Mode-switches on child count:
// a single child renders a plain quote, multiple children render a
// looping horizontal carousel.
export function Blockquote({ children }: Props) {
  const items = Children.toArray(children);

  if (items.length <= 1) {
    return (
      <blockquote className={styles.quote}>
        <div className={styles.quoteBody}>
          <span className={styles.mark} aria-hidden="true" />
          <div className={`body-l ${styles.content}`}>{children}</div>
        </div>
      </blockquote>
    );
  }

  return <BlockquoteCarousel>{children}</BlockquoteCarousel>;
}
