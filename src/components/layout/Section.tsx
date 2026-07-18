import styles from "./Section.module.css";

type Props = {
  background?: "default" | "dark";
  children: React.ReactNode;
};

// One per logical section of a page. Owns its own top border. All content
// inside must go through a Grid. No longer renders a mark of its own —
// intersection marks are now a handful of hand-placed, varied moments
// elsewhere on the page rather than a systematic per-section repeat.
export function Section({ background = "default", children }: Props) {
  return (
    <section className={styles.section} data-background={background}>
      {children}
    </section>
  );
}
