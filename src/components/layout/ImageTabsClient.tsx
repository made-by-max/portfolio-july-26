"use client";

import { useState } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageArea}>
        {/* key forces a hard cut on swap — no crossfade transition */}
        <CloudinaryImage
          key={active.publicId}
          publicId={active.publicId}
          width={active.width}
          height={active.height}
          alt={active.alt}
        />
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
