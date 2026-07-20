"use client";

import { useEffect, useRef, useState } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
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

export function PinnedMediaScrollClient({ items }: Props) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
        <div className={styles.mediaPanel}>
          {items.map((item) => (
            <div
              key={item.publicId}
              className={`${styles.mediaLayer} ${item.index === active ? styles.mediaLayerActive : ""}`}
            >
              <CloudinaryImage
                publicId={item.publicId}
                width={item.width}
                height={item.height}
                alt={item.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
