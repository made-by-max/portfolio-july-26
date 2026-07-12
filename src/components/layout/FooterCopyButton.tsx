"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./Footer.module.css";

type Props = {
  email: string;
};

// Isolated interactive island inside the otherwise-static Footer, same
// split used for ImageTabs/PinnedMediaScroll's client-only pieces.
export function FooterCopyButton({ email }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={handleCopy}
      aria-label="Copy email address"
    >
      {/* Both icons stay mounted and cross-fade via CSS (transition, not a
          keyframe swap) so a second click mid-animation retargets smoothly
          instead of restarting. */}
      <span className={styles.iconSwap} data-state={copied ? "check" : "copy"}>
        <Check className={styles.iconCheck} size={24} aria-hidden="true" />
        <Copy className={styles.iconCopy} size={24} aria-hidden="true" />
      </span>
    </button>
  );
}
