"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { X } from "lucide-react";
import cloudinaryLoader from "@/lib/cloudinary-loader";
import styles from "./Lightbox.module.css";

export type LightboxImage = {
  publicId: string;
  alt: string;
  /** Intrinsic (original asset) dimensions, resolved at build time. */
  width: number;
  height: number;
  /** Rendered under the image. Falls back to `alt` when absent. */
  caption?: React.ReactNode;
};

type LightboxContextValue = {
  /** False on touch / coarse-pointer devices — triggers render nothing. */
  enabled: boolean;
  open: (image: LightboxImage, trigger: HTMLElement) => void;
};

const LightboxContext = createContext<LightboxContextValue>({
  enabled: false,
  open: () => {},
});

export function useLightbox() {
  return useContext(LightboxContext);
}

// --- Device gating -------------------------------------------------------

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeToPointerQuery(onChange: () => void) {
  const mql = window.matchMedia(FINE_POINTER_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

// Server snapshot is `false`, so the static HTML ships plain images and the
// triggers appear on hydration only where the query matches — no mismatch.
function useFinePointer() {
  return useSyncExternalStore(
    subscribeToPointerQuery,
    () => window.matchMedia(FINE_POINTER_QUERY).matches,
    () => false
  );
}

// --- Provider ------------------------------------------------------------

type Session = {
  // Bumped on every open so LightboxView remounts — resets zoom, pan and
  // loading state without any manual reset logic.
  id: number;
  image: LightboxImage;
  requestWidth: number;
  // The inline image's already-loaded URL, shown instantly while the
  // larger version loads. Undefined if the inline image hadn't loaded.
  placeholderSrc?: string;
};

// Requested width is rounded up to this step so viewport widths share a
// handful of Cloudinary derivatives (2000, 3000, 4000…) instead of one per
// 100px. Each new derivative is a slow cold transformation on first
// request, so fewer distinct URLs = far more cache hits.
const REQUEST_WIDTH_STEP = 1000;

function getPlaceholderSrc(trigger: HTMLElement) {
  const img = trigger.querySelector("img");
  return img?.complete && img.naturalWidth ? img.currentSrc : undefined;
}

function getRequestWidth(assetWidth: number) {
  const doubleViewport =
    Math.ceil((window.innerWidth * 2) / REQUEST_WIDTH_STEP) *
    REQUEST_WIDTH_STEP;
  // Never ask Cloudinary to upscale past the original asset.
  return Math.min(assetWidth, doubleViewport);
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const enabled = useFinePointer();
  const [session, setSession] = useState<Session | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const pointerDownOnBackdrop = useRef(false);

  const open = useCallback((image: LightboxImage, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSession((prev) => ({
      id: (prev?.id ?? 0) + 1,
      image,
      requestWidth: getRequestWidth(image.width),
      placeholderSrc: getPlaceholderSrc(trigger),
    }));
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (session && dialog && !dialog.open) dialog.showModal();
  }, [session]);

  // Native <dialog> already restores focus to the previously focused
  // element, but Safari doesn't focus buttons on mouse click — so that
  // element can be <body>. Focusing the stored trigger explicitly makes
  // "focus returns to the trigger" hold in every browser.
  function handleClose() {
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  }

  // The dialog fills the viewport, so ::backdrop is never the click target
  // — "backdrop" means the dialog's own empty areas, marked with
  // data-backdrop. `closedby="any"` can't help here for the same reason
  // (and Safari lacks it). Requiring pointerdown AND click on the backdrop
  // stops a pan that's released over empty space from closing it.
  function isBackdrop(target: EventTarget) {
    return (
      target instanceof HTMLElement && target.hasAttribute("data-backdrop")
    );
  }

  return (
    <LightboxContext.Provider value={{ enabled, open }}>
      {children}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={session?.image.alt || "Enlarged image"}
        data-backdrop=""
        onClose={handleClose}
        onPointerDown={(e) => {
          pointerDownOnBackdrop.current = isBackdrop(e.target);
        }}
        onClick={(e) => {
          if (pointerDownOnBackdrop.current && isBackdrop(e.target)) {
            dialogRef.current?.close();
          }
        }}
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
        >
          <X size={24} aria-hidden="true" />
        </button>
        {session ? (
          <LightboxView
            key={session.id}
            image={session.image}
            requestWidth={session.requestWidth}
            placeholderSrc={session.placeholderSrc}
          />
        ) : null}
      </dialog>
    </LightboxContext.Provider>
  );
}

// --- Image view: fit, zoom, pan ------------------------------------------

type View = { scale: number; x: number; y: number };

const FIT_VIEW: View = { scale: 1, x: 0, y: 0 };
// Movement (px) before a press counts as a drag rather than a click.
const DRAG_THRESHOLD = 4;
// Wheel delta → zoom factor. Trackpad pinch arrives as ctrl+wheel with much
// smaller deltas, so it gets a larger multiplier to feel equally responsive.
const WHEEL_ZOOM_SPEED = 0.002;
const PINCH_ZOOM_SPEED = 0.01;
// deltaMode 1 = lines (some mice / Firefox); approximate px per line.
const PX_PER_WHEEL_LINE = 16;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type LoadState = "loading" | "loaded" | "error";

function LightboxView({
  image,
  requestWidth,
  placeholderSrc,
}: {
  image: LightboxImage;
  requestWidth: number;
  placeholderSrc?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  // Placeholder stays until the large image has finished fading in over
  // it, then unmounts (so it can't show through transparent areas or sit
  // under a zoomed image).
  const [showPlaceholder, setShowPlaceholder] = useState(!!placeholderSrc);
  const [view, setView] = useState<View>(FIT_VIEW);
  // Max zoom = loaded asset pixels ÷ fit-size CSS pixels. 1 = not zoomable.
  const [maxScale, setMaxScale] = useState(1);
  const maxScaleRef = useRef(1);
  const [isDragging, setIsDragging] = useState(false);
  // Transform transitions only for click toggles — wheel and drag should
  // track the input directly with no easing lag.
  const [animateTransform, setAnimateTransform] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const src = cloudinaryLoader({ src: image.publicId, width: requestWidth });
  const caption = image.caption ?? null;
  const isZoomable = loadState === "loaded" && maxScale > 1;
  const isZoomed = view.scale > 1;

  const measure = useCallback(() => {
    const img = imgRef.current;
    // offsetWidth is 0 while the dialog is still display:none; the
    // ResizeObserver below re-runs this once it has real layout.
    if (!img || !img.complete || !img.naturalWidth || !img.offsetWidth) return;
    maxScaleRef.current = img.naturalWidth / img.offsetWidth;
    setMaxScale(maxScaleRef.current);
  }, []);

  // Keeps the scaled image covering the stage — no panning past its edges.
  const clampView = useCallback((scale: number, x: number, y: number) => {
    const img = imgRef.current;
    const stage = stageRef.current;
    if (!img || !stage) return FIT_VIEW;
    const maxX = Math.max(0, (img.offsetWidth * scale - stage.clientWidth) / 2);
    const maxY = Math.max(
      0,
      (img.offsetHeight * scale - stage.clientHeight) / 2
    );
    return { scale, x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
  }, []);

  // Zooms to `nextScale` keeping the point under the cursor fixed. The
  // image is centred in the stage, so its untransformed centre is the
  // stage's centre.
  const zoomAround = useCallback(
    (prev: View, nextScale: number, clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage) return prev;
      if (nextScale <= 1) return FIT_VIEW;
      const rect = stage.getBoundingClientRect();
      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height / 2);
      const localX = (dx - prev.x) / prev.scale;
      const localY = (dy - prev.y) / prev.scale;
      return clampView(
        nextScale,
        dx - nextScale * localX,
        dy - nextScale * localY
      );
    },
    [clampView]
  );

  // Viewport resize changes the fit size (and therefore max zoom) — reset
  // to fit rather than trying to preserve a zoom level that may no longer
  // be valid. Also fires once on open, which is when the first real
  // measurement happens.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => {
      setAnimateTransform(false);
      setView(FIT_VIEW);
      measure();
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [measure]);

  // React's onWheel is passive, so preventDefault (needed to stop browser
  // page-zoom on trackpad pinch) requires a native listener.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (maxScaleRef.current <= 1) return;
      const delta = e.deltaMode === 1 ? e.deltaY * PX_PER_WHEEL_LINE : e.deltaY;
      const speed = e.ctrlKey ? PINCH_ZOOM_SPEED : WHEEL_ZOOM_SPEED;
      setAnimateTransform(false);
      setView((prev) =>
        zoomAround(
          prev,
          clamp(prev.scale * Math.exp(-delta * speed), 1, maxScaleRef.current),
          e.clientX,
          e.clientY
        )
      );
    }
    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [zoomAround]);

  function handleLoad() {
    setLoadState("loaded");
    measure();
  }

  function handlePointerDown(e: React.PointerEvent<HTMLImageElement>) {
    if (e.button !== 0) return;
    suppressClickRef.current = false;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: view.x,
      originY: view.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLImageElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    drag.moved = true;
    if (!isZoomed) return;
    setIsDragging(true);
    setAnimateTransform(false);
    setView((prev) =>
      clampView(prev.scale, drag.originX + dx, drag.originY + dy)
    );
  }

  function endDrag() {
    // Any press that moved past the threshold is a drag — swallow the
    // click that follows so it doesn't also toggle zoom.
    if (dragRef.current?.moved) suppressClickRef.current = true;
    dragRef.current = null;
    setIsDragging(false);
  }

  function handleImageClick(e: React.MouseEvent<HTMLImageElement>) {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (!isZoomable) return;
    setAnimateTransform(true);
    setView((prev) =>
      prev.scale > 1
        ? FIT_VIEW
        : zoomAround(prev, maxScaleRef.current, e.clientX, e.clientY)
    );
  }

  let zoomCursor: "in" | "out" | "none" = "none";
  if (isZoomable) zoomCursor = isZoomed ? "out" : "in";

  return (
    <>
      <div ref={stageRef} className={styles.stage} data-backdrop="">
        {showPlaceholder ? (
          // Same box as the large image (same width/height attributes and
          // fit rule), so the swap is a pure sharpness change. Decorative
          // duplicate — hidden from assistive tech.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={`${styles.image} ${styles.placeholder}`}
            src={placeholderSrc}
            width={image.width}
            height={image.height}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={
              {
                "--lightbox-image-width": image.width,
                "--lightbox-image-height": image.height,
              } as React.CSSProperties
            }
          />
        ) : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={(img) => {
            imgRef.current = img;
            // Covers an image already in the HTTP cache that finished
            // loading before React attached onLoad.
            if (img?.complete && img.naturalWidth && loadState === "loading") {
              handleLoad();
            }
          }}
          className={styles.image}
          src={src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          decoding="async"
          draggable={false}
          style={
            {
              "--lightbox-image-width": image.width,
              "--lightbox-image-height": image.height,
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            } as React.CSSProperties
          }
          data-loaded={loadState === "loaded" || undefined}
          data-zoom={zoomCursor}
          data-dragging={isDragging || undefined}
          data-animate={animateTransform || undefined}
          onLoad={handleLoad}
          onError={() => setLoadState("error")}
          onTransitionEnd={(e) => {
            if (e.propertyName === "opacity" && loadState === "loaded") {
              setShowPlaceholder(false);
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClick={handleImageClick}
        />
        {loadState === "error" ? (
          <p className={`body-s ${styles.status}`} role="status">
            This image couldn&rsquo;t be loaded.
          </p>
        ) : null}
      </div>
      <div className={`body-s ${styles.caption}`}>
        {caption ?? <p>{image.alt}</p>}
      </div>
    </>
  );
}
