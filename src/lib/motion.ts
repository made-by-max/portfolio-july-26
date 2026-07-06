// Shared animation variants that respect prefers-reduced-motion.
// Use reducedMotion variants in components instead of hardcoding durations.
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" },
};

// useReducedMotion() from motion/react returns true when the OS preference
// is set. Use it to swap full animations for instant transitions.
export { useReducedMotion } from "motion/react";
