import Link from "next/link";
import { Grid } from "./Grid";
import { Column } from "./Column";
import { FooterCopyButton } from "./FooterCopyButton";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Footer.module.css";

const EMAIL = "hi@maxtaylor.design";

const PAGE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/play", label: "Side Quests" },
  { href: "/about", label: "About" },
];

// Placeholder profile URLs — swap in the real ones.
const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/madebymax/", label: "LinkedIn" },
  { href: "https://github.com/made-by-max", label: "GitHub" },
];

// Lives outside ContentWrapper, no border of its own. Reuses the layout
// system's Grid/Column for the 2:1:1 column split — kept for consistency
// with the divider language used everywhere else on the site, even though
// the footer itself sits outside the ContentWrapper/Section framing.
export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Oversized, low-opacity, clipped at the footer's edge — a one-time
          signature flourish, not a pattern reused elsewhere. */}
      <span className={styles.watermark} aria-hidden="true">
        made by max
      </span>
      <div className={styles.inner}>
        <Grid columns={[2, 1, 1]}>
          <Column className={styles.noDivider}>
            <div className={styles.emailRow}>
              <a
                href={`mailto:${EMAIL}`}
                className={`display-l ${styles.email}`}
              >
                {EMAIL}
              </a>
              <FooterCopyButton email={EMAIL} />
            </div>
          </Column>
          <Column className={styles.noDivider}>
            <nav className={styles.linkList} aria-label="Footer">
              {PAGE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </Column>
          <Column className={styles.noDivider}>
            <nav className={styles.linkList} aria-label="Social">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </Column>
        </Grid>
        <p className={`body-s ${styles.copyright}`}>
          © {new Date().getFullYear()} Max Taylor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
