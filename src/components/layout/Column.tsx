import styles from "./Column.module.css";

type Props = {
  /** Only meaningful in a 2-column Grid. Automatically inert on mobile. */
  sticky?: boolean;
  /** Escape hatch for one-off overrides (e.g. a mobile order swap) — not
   * for reaching in to override Grid's own divider/padding mechanics. */
  className?: string;
  children: React.ReactNode;
};

// One per grid item. Owns content-side padding — Grid's own gap/dividers
// are full-bleed, so spacing lives here instead. No layout props of its
// own: width comes entirely from the parent Grid's columns array.
export function Column({ sticky = false, className, children }: Props) {
  return (
    <div
      className={className ? `${styles.column} ${className}` : styles.column}
      data-sticky={sticky || undefined}
    >
      {children}
    </div>
  );
}
