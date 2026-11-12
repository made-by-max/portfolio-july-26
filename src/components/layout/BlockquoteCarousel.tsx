"use client";

import { Children, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Blockquote.module.css";

type Props = {
  children: React.ReactNode;
};

// Multi-quote mode of Blockquote. A native scroll-snap track (one snap
// point per quote) does the actual sliding, so touch swipe works with no
// extra code; the arrows just scroll the track. Slide motion comes from
// CSS `scroll-behavior: smooth`, which the global reduced-motion rule
// already forces to `auto`.
//
// Looping: the arrows wrap (next on the last quote → first, prev on the
// first → last). The wrap is a real scroll back across the track, so it
// reads as a quick rewind rather than a seamless infinite loop — true
// seamless looping would need cloned slides, which breaks the "one snap
// point per quote" model. Swiping stops at either end.
export function BlockquoteCarousel({ children }: Props) {
  const items = Children.toArray(children);
  const total = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Active slide follows the scroll position — covers arrows, swipe, and
  // resize re-snapping alike. Switches as soon as a slide is more than
  // half in view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => {
      // Math.abs: scrollLeft is negative in RTL.
      const index = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
      setActive(Math.min(Math.max(index, 0), total - 1));
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [total]);

  function goTo(index: number) {
    const track = trackRef.current;
    const slide = slideRefs.current[(index + total) % total];
    if (!track || !slide) return;
    // .track is position: relative, so offsetLeft is relative to it. No
    // `behavior` passed — the CSS scroll-behavior decides, which keeps
    // reduced motion handled by the global rule.
    track.scrollTo({ left: slide.offsetLeft });
  }

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Quotes"
    >
      <div ref={trackRef} className={styles.track} aria-live="polite">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`Quote ${index + 1} of ${total}`}
            // Off-screen quotes: out of the tab order and the
            // accessibility tree. Touch scrolling still works — inert
            // content doesn't block scrolling its (non-inert) container.
            inert={index !== active}
          >
            <blockquote className={styles.quoteBody}>
              <span className={styles.mark} aria-hidden="true" />
              <div className={`body-l ${styles.content}`}>{item}</div>
            </blockquote>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(active - 1)}
          aria-label="Previous quote"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(active + 1)}
          aria-label="Next quote"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
