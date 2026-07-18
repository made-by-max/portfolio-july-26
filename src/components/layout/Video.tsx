import { getVideoDimensions, buildVideoUrl } from "@/lib/cloudinary";
import styles from "./Media.module.css";

type Props = {
  publicId: string;
  alt: string;
  autoplay?: boolean;
  /** Case-study body content only — adds padding-block around the media
   * (and caption, if present) for an image/video sitting inline with
   * surrounding text. Default false — no change from current behavior. */
  padded?: boolean;
  children?: React.ReactNode;
};

// Same public-ID + build-time-dimensions pattern as Image. Native <video>
// has no alt attribute, so alt is applied as the accessible name via
// aria-label instead.
export async function Video({
  publicId,
  alt,
  autoplay = false,
  padded = false,
  children,
}: Props) {
  const { width, height } = await getVideoDimensions(publicId);
  const src = buildVideoUrl(publicId);

  return (
    <figure
      className={padded ? `${styles.figure} ${styles.padded}` : styles.figure}
    >
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
