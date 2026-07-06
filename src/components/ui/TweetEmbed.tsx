"use client";

import { Tweet } from "react-tweet";
import { useState } from "react";
import { buildImageUrl } from "@/lib/cloudinary-urls";

type Props = {
  id: string;
  // Cloudinary public ID for a fallback screenshot if the tweet fails to load
  fallbackImage?: string;
};

export function TweetEmbed({ id, fallbackImage }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed && fallbackImage) {
    const src = buildImageUrl(fallbackImage, { width: 800, quality: 90 });
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={`Screenshot of tweet ${id}`} />;
  }

  return (
    <div
      onError={() => setFailed(true)}
    >
      <Tweet id={id} onError={() => setFailed(true)} />
    </div>
  );
}
