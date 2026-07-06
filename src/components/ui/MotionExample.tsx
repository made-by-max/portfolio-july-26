"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/motion";

export function MotionExample() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
    >
      This text fades in via Motion.
    </motion.p>
  );
}
