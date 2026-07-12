import { getVideoDimensions, buildVideoUrl } from "@/lib/cloudinary";
import styles from "./Media.module.css";

type Props = {
  publicId: string;
  alt: string;
  autoplay?: boolean;
  children?: React.ReactNode;
};

// Same public-ID + build-time-dimensions pattern as Image. Native <video>
// has no alt attribute, so alt is applied as the accessible name via
// aria-label instead.
export async function Video({
  publicId,
  alt,
  autoplay = false,
  children,
}: Props) {
  const { width, height } = await getVideoDimensions(publicId);
  const src = buildVideoUrl(publicId);

  return (
    <figure className={styles.figure}>
      <video
        src={src}
        width={width}
        height={height}
        aria-label={alt}
        autoPlay={autoplay}
        muted={autoplay}
        loop={autoplay}
        controls={!autoplay}
        playsInline
      />
      {children ? (
        <figcaption className={styles.caption}>{children}</figcaption>
      ) : null}
    </figure>
  );
}
