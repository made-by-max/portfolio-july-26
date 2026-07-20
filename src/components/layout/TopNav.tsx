"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import styles from "./TopNav.module.css";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/play", label: "Side Quests" },
  { href: "/about", label: "About" },
];

// Fixed, always-visible chrome. Mobile collapses the link list into a
// hamburger-triggered dropdown panel rather than a full-screen overlay.
export function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // "/work" should stay active on /work/[slug] too, but "/" must only
  // match the home page itself (every route starts with "/").
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Max Taylor
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              data-active={isActive(link.href) || undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={styles.mobilePanel}
        data-open={open || undefined}
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            data-active={isActive(link.href) || undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
