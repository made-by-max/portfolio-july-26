"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  autoplay: boolean;
};

// Split from Video (an async server component) since prefers-reduced-motion
// can only be read client-side. Autoplay is triggered imperatively via
// .play() instead of the HTML autoplay attribute — reading the preference
// straight into the attribute would mismatch between server and client
// render and let playback flash on before this could stop it. muted/loop
// stay tied to the `autoplay` prop only, so they're identical on server and
// client; only whether .play() actually fires depends on the visitor's
// motion preference. Controls are always shown so a visitor can pause an
// autoplaying video, or manually start one that reduced-motion held back.
export function VideoClient({ src, alt, width, height, autoplay }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!autoplay || prefersReducedMotion) return;
    videoRef.current?.play().catch(() => {});
  }, [autoplay, prefersReducedMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      width={width}
      height={height}
      aria-label={alt}
      muted={autoplay}
      loop={autoplay}
      controls
      playsInline
    />
  );
}
