// Cloudinary transformation dedicated to WideScrollImage only — kept
// separate from cloudinary-urls.ts's shared buildImageUrl() (used by
// Image, Video, cards, etc.) so tuning this component's quality/sharpening
// can never change any other component's image URLs or file sizes.
//
// Pure URL construction, no Node.js deps — safe to import in client
// components, same as cloudinary-urls.ts.

// Server-side resize target for the delivered image. Must match
// `.image { block-size: ... }` in WideScrollImage.module.css — there's no
// way to read a CSS value from here, so the two have to be kept in sync
// by hand (same category of coupling as --nav-height/PinnedMediaScroll's
// --sticky-offset elsewhere in this codebase).
export const WIDE_SCROLL_IMAGE_DISPLAY_HEIGHT = 800;

export function buildWideScrollImageUrl(publicId: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const transformations = [
    // Resize server-side to the actual rendered height instead of shipping
    // full original resolution and scaling down in CSS — width scales
    // proportionally since no crop mode/width is specified.
    `h_${WIDE_SCROLL_IMAGE_DISPLAY_HEIGHT}`,
    // Serves a higher-resolution version to high-density (retina) screens.
    "dpr_auto",
    // The shared loader's q_auto is too aggressive for this flat,
    // high-contrast, detail-heavy content (diagram exports) — this
    // content's file size is a secondary concern next to staying sharp,
    // so this requests maximum literal quality rather than an
    // algorithmic "auto" level (even auto:best still compresses some).
    "q_100",
    // Still lets Cloudinary pick the best modern format per requesting
    // browser — independent of, and combined with, the quality setting
    // above (f_auto doesn't control compression level itself).
    "f_auto",
    // Mild sharpening to counteract any softness from the server-side
    // resize. 100 is a starting point, not a load-bearing value — retune
    // if it reads over/under-sharpened once actually rendered.
    "e_sharpen:100",
  ].join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}
