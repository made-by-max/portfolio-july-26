"use client";

import { useLightbox, type LightboxImage } from "./LightboxProvider";
import styles from "./Lightbox.module.css";

type Props = {
  image: LightboxImage;
  children: React.ReactNode;
  /** Per-instance opt-out (e.g. Image's `enlargeable={false}`). */
  enabled?: boolean;
  /** Checked on every activation — return false to ignore the click
   * (PinnedMediaScroll uses this while scrolling / crossfading). */
  canOpen?: () => boolean;
  className?: string;
};

// Wraps an inline image in a native button when the lightbox is available.
// On touch/coarse-pointer devices (or when opted out) it renders the image
// untouched — no wrapper, no cursor, no click behavior.
export function LightboxTrigger({
  image,
  children,
  enabled = true,
  canOpen,
  className,
}: Props) {
  const lightbox = useLightbox();

  if (!enabled || !lightbox.enabled) return <>{children}</>;

  return (
    <button
      type="button"
      className={className ? `${styles.trigger} ${className}` : styles.trigger}
      aria-label={image.alt ? `Enlarge image: ${image.alt}` : "Enlarge image"}
      aria-haspopup="dialog"
      onClick={(e) => {
        if (canOpen && !canOpen()) return;
        lightbox.open(image, e.currentTarget);
      }}
    >
      {children}
    </button>
  );
}
