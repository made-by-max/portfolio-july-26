"use client";

import { useEffect } from "react";

// CSS scroll-driven animations (animation-timeline/view()) are the primary
// implementation. This only loads the JS polyfill in browsers without
// native support (currently Safari/Firefox), so behavior stays consistent
// across browsers instead of degrading there.
export function ScrollTimelinePolyfillLoader() {
  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()")) {
      return;
    }
    // The package has no "main"/"exports" field, so the built file has to
    // be imported directly.
    import("scroll-timeline-polyfill/dist/scroll-timeline.js");
  }, []);

  return null;
}
