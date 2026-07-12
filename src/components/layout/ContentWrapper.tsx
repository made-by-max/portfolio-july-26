import styles from "./ContentWrapper.module.css";

type Props = {
  children: React.ReactNode;
};

// Outer bordered container — owns the bottom, left, and right border.
// Not always the whole page: nav/footer may live outside it (decided per-page).
// The two corner marks are "corners of the page itself."
export function ContentWrapper({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <span
        className={`corner-mark ${styles.markTopLeft}`}
        aria-hidden="true"
      />
      <span
        className={`corner-mark ${styles.markTopRight}`}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
