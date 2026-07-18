import styles from "./ContentWrapper.module.css";

type Props = {
  children: React.ReactNode;
};

// Outer bordered container — owns the bottom, left, and right border.
// Not always the whole page: nav/footer may live outside it (decided per-page).
// One corner mark, top-left — a top-left + top-right pair at the same
// corner read as a repeated pattern, not the sparse, hand-placed accent
// the mark is meant to be.
export function ContentWrapper({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <span
        className={`corner-mark ${styles.markTopLeft}`}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
