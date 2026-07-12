import styles from "./Section.module.css";

type Props = {
  background?: "default" | "dark";
  /** Faint dot-grid background texture — for hero sections, used sparingly. */
  texture?: boolean;
  /** Single soft radial sweep — cap at one per page (the homepage hero). */
  glow?: boolean;
  children: React.ReactNode;
};

// One per logical section of a page. Owns its own top border. All content
// inside must go through a Grid. No longer renders a mark of its own —
// intersection marks are now a handful of hand-placed, varied moments
// elsewhere on the page rather than a systematic per-section repeat.
export function Section({
  background = "default",
  texture = false,
  glow = false,
  children,
}: Props) {
  const className = [
    styles.section,
    texture ? "bg-dot-grid" : null,
    glow ? "bg-radial-glow" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className} data-background={background}>
      {children}
    </section>
  );
}
