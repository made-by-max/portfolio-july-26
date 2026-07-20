"use client";

import { useEffect, useRef, useState } from "react";
import { buildWideScrollImageUrl } from "@/lib/wideScrollImageUrl";
import styles from "./WideScrollImage.module.css";

type Props = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  children?: React.ReactNode;
};

// Drag is mouse-only and moves scrollLeft 1:1 with pointer movement — no
// inertia/momentum simulation, so there's nothing for prefers-reduced-motion
// to need to disable here. Touch pointers are never captured, so native
// touch-scroll handles panning there untouched, and wheel/trackpad scroll
// and the native scrollbar are never intercepted either — only the
// drag-specific pointer events are.
export function WideScrollImageClient({
  publicId,
  alt,
  width,
  height,
  children,
}: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{ startX: number; startScrollLeft: number } | null>(
    null
  );
  const [dragging, setDragging] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  // Tracks scroll position to toggle each edge's fade dynamically — not a
  // static overlay, since it must disappear once there's nothing left to
  // reveal in that direction.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateFades = () => {
      // A small threshold rather than exactly 0 — sub-pixel scroll values
      // some browsers report at the very ends otherwise flicker the fade.
      const threshold = 1;
      setShowLeftFade(el.scrollLeft > threshold);
      setShowRightFade(
        el.scrollLeft < el.scrollWidth - el.clientWidth - threshold
      );
    };

    updateFades();
    el.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    return () => {
      el.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    // Touch falls through here untouched — dragState never gets set, so
    // handlePointerMove's own guard below no-ops for it too.
    if (!el || event.pointerType !== "mouse" || event.button !== 0) return;
    dragState.current = { startX: event.clientX, startScrollLeft: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !dragState.current) return;
    // Only reached during an active mouse drag (see above) — prevents the
    // native text-selection/image-drag-ghost that would otherwise fight
    // the pointer-driven scrollLeft below.
    event.preventDefault();
    const delta = event.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current) {
      scrollRef.current?.releasePointerCapture(event.pointerId);
    }
    dragState.current = null;
    setDragging(false);
  };

  return (
    <figure className={styles.wrapper}>
      <div className={styles.imageArea}>
        <div
          ref={scrollRef}
          className={styles.scrollContainer}
          data-dragging={dragging || undefined}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {/* Not CloudinaryImage — this needs its own quality/sharpening
              transform (see wideScrollImageUrl.ts), which the shared
              component/loader used by Image, Video, and cards doesn't
              apply. Intrinsic width/height (not the delivered/resized
              size) are passed as HTML attributes purely so the browser
              reserves the correct aspect ratio, same convention as
              CloudinaryImage itself. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.image}
            src={buildWideScrollImageUrl(publicId)}
            width={width}
            height={height}
            alt={alt}
            draggable={false}
          />
        </div>
        <div
          className={styles.fadeLeft}
          data-visible={showLeftFade || undefined}
          aria-hidden="true"
        />
        <div
          className={styles.fadeRight}
          data-visible={showRightFade || undefined}
          aria-hidden="true"
        />
      </div>
      {children ? (
        <figcaption className={styles.caption}>{children}</figcaption>
      ) : null}
    </figure>
  );
}
