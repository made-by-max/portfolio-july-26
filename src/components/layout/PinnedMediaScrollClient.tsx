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

  useEffect(() => {
    const handleScroll = () => {
      let next = 0;
      for (let i = 0; i < blockRefs.current.length; i++) {
        const el = blockRefs.current[i];
        if (!el) continue;
        // A block becomes active when its top reaches the sticky inset offset.
        // 112px is --nav-height (80px) + --size-4 (32px) — keep in sync
        // with --sticky-offset in PinnedMediaScroll.module.css.
        if (el.getBoundingClientRect().top <= 112) {
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
            <div className={styles.blockContent}>
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
