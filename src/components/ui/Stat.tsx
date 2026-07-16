"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { useReducedMotion } from "@/lib/motion";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
};

// Decimal precision is inferred from however the value was authored
// (2.5 -> 1 place, 264 -> 0 places) so the in-progress count formats the
// same way throughout and lands exactly on the authored precision instead
// of a rounded-off integer.
function getDecimalPlaces(n: number): number {
  const str = n.toString();
  const dotIndex = str.indexOf(".");
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
}

// Inline count-up number — sits within freeform MDX prose (a heading, a
// sentence, a Column) wherever the author places it, inheriting whatever
// text style is already in effect rather than setting its own. Counts
// from 0 to `value` once, the first time it scrolls into view; prefix and
// suffix are static from the start, only the number itself animates.
export function Stat({ value, prefix = "", suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  const prefersReducedMotion = useReducedMotion();
  const decimalPlaces = getDecimalPlaces(value);
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(() => (0).toFixed(decimalPlaces));

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(latest.toFixed(decimalPlaces));
  });

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      motionValue.set(value);
      return;
    }

    // 0.9s is a judgment call — long enough to read as a deliberate count
    // rather than a flicker, short enough not to feel like a wait.
    const controls = animate(motionValue, value, {
      duration: 0.9,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value, motionValue]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
