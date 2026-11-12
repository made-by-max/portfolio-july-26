"use client";

import { useEffect, useRef, useState } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { LightboxTrigger } from "@/components/ui/Lightbox";
import styles from "./PinnedMediaScroll.module.css";

export type ResolvedPinnedItem = {
  index: number;
  publicId: string;
  alt: string;
  width: number;
  height: number;
  content: React.ReactNode;
};

type Props = {
  items: ResolvedPinnedItem[];
};

// Fallback scroll-end delay for browsers without the `scrollend` event.
const SCROLL_END_FALLBACK_MS = 150;

export function PinnedMediaScrollClient({ items }: Props) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaPanelRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Reads the live crossfade state off the CSS transitions themselves
  // rather than mirroring it in React state.
  function canOpenLightbox() {
    if (isScrollingRef.current) return false;
    const panel = mediaPanelRef.current;
    if (!panel) return true;
    return !panel
      .getAnimations({ subtree: true })
      .some((animation) => animation.playState === "running");
  }

  useEffect(() => {
    // A block becomes active as soon as its text is pinned in place, not
    // once the previous block has fully scrolled away. Reading the real
    // computed `top` off a sticky blockContent (rather than duplicating
    // --sticky-offset as a hardcoded pixel value here) means this can
    // never drift out of sync with the CSS again.
    const firstContent = contentRefs.current[0];
    const offset = firstContent
      ? parseFloat(getComputedStyle(firstContent).top)
      : 0;

    const updateActive = () => {
      let next = 0;
      for (let i = 0; i < blockRefs.current.length; i++) {
        const el = blockRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          next = i;
        }
      }
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    // Lightbox gating: the pinned image only opens when the page isn't
    // mid-scroll and no crossfade is running. The panel gets data-busy
    // (cursor only — set directly on the DOM, so no re-render per scroll
    // event); canOpenLightbox() re-checks live state at click time.
    const panel = mediaPanelRef.current;
    const updateBusy = () => {
      panel?.toggleAttribute("data-busy", !canOpenLightbox());
    };

    // `scrollend` where supported; otherwise treat the scroll as ended once
    // no scroll event has fired for SCROLL_END_FALLBACK_MS.
    const supportsScrollEnd = "onscrollend" in window;
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

    const handleScrollEnd = () => {
      isScrollingRef.current = false;
      updateBusy();
    };

    const handleScroll = () => {
      updateActive();
      isScrollingRef.current = true;
      updateBusy();
      if (!supportsScrollEnd) {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(handleScrollEnd, SCROLL_END_FALLBACK_MS);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (supportsScrollEnd)
      window.addEventListener("scrollend", handleScrollEnd);
    // The crossfade is a CSS transition on the layers; these bubble up to
    // the panel, so busy state follows it starting and finishing.
    panel?.addEventListener("transitionrun", updateBusy);
    panel?.addEventListener("transitionend", updateBusy);
    panel?.addEventListener("transitioncancel", updateBusy);
    updateActive();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      panel?.removeEventListener("transitionrun", updateBusy);
      panel?.removeEventListener("transitionend", updateBusy);
      panel?.removeEventListener("transitioncancel", updateBusy);
      clearTimeout(scrollEndTimer);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.textColumn}>
        {items.map((item, i) => (
          <div
            key={item.publicId}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            className={styles.block}
          >
            <div
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className={styles.blockContent}
            >
              {item.content}
              <div className={styles.mobileMedia}>
                <CloudinaryImage
                  publicId={item.publicId}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mediaColumn}>
        <div ref={mediaPanelRef} className={styles.mediaPanel}>
          {items.map((item) => (
            <div
              key={item.publicId}
              className={`${styles.mediaLayer} ${item.index === active ? styles.mediaLayerActive : ""}`}
              // Layers are stacked; inert takes the invisible ones out of
              // hit-testing and tab order so clicks/focus reach the
              // visible (active) layer's trigger.
              inert={item.index !== active}
            >
              <LightboxTrigger
                className={styles.mediaTrigger}
                canOpen={canOpenLightbox}
                image={{
                  publicId: item.publicId,
                  alt: item.alt,
                  width: item.width,
                  height: item.height,
                }}
              >
                <CloudinaryImage
                  publicId={item.publicId}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                />
              </LightboxTrigger>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
