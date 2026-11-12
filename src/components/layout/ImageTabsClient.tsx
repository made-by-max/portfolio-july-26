"use client";

import { useEffect, useState } from "react";
import {
  CloudinaryImage,
  getCloudinaryImageSrc,
} from "@/components/ui/CloudinaryImage";
import { LightboxTrigger } from "@/components/ui/Lightbox";
import styles from "./ImageTabs.module.css";

type ResolvedItem = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  content: React.ReactNode;
};

type Props = {
  items: ResolvedItem[];
};

export function ImageTabsClient({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  // Only the active image is in the DOM, so the other tabs' images would
  // otherwise start downloading on click. Warm the browser cache for them
  // in the background after mount, using the same URL CloudinaryImage
  // builds, so switching tabs renders from cache. decode() also does the
  // image decoding ahead of time so the swap doesn't stall on it.
  useEffect(() => {
    items.forEach((item, index) => {
      if (index === 0) return; // first tab's image is already rendered
      const img = new Image();
      img.src = getCloudinaryImageSrc(item.publicId, item.width);
      img.decode().catch(() => {
        // Preloading is best-effort — a failure here just means that tab
        // loads on click like before.
      });
    });
  }, [items]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageArea}>
        {/* key forces a hard cut on swap — no crossfade transition */}
        <LightboxTrigger
          key={active.publicId}
          image={{
            publicId: active.publicId,
            alt: active.alt,
            width: active.width,
            height: active.height,
            caption: active.content,
          }}
        >
          <CloudinaryImage
            publicId={active.publicId}
            width={active.width}
            height={active.height}
            alt={active.alt}
          />
        </LightboxTrigger>
      </div>
      <div className={styles.tabList}>
        {items.map((item, index) => (
          <button
            key={item.publicId}
            type="button"
            className={styles.tab}
            data-active={index === activeIndex || undefined}
            onClick={() => setActiveIndex(index)}
          >
            {item.content}
          </button>
        ))}
      </div>
    </div>
  );
}
