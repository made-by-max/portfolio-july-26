import { getImageDimensions } from "@/lib/cloudinary";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import styles from "./Media.module.css";

type Props = {
  publicId: string;
  alt: string;
  /** Case-study body content only — adds padding-block around the media
   * (and caption, if present) for an image/video sitting inline with
   * surrounding text. Default false — no change from current behavior. */
  padded?: boolean;
  children?: React.ReactNode;
};

// Takes a Cloudinary public ID directly; resolves intrinsic dimensions at
// build time so the browser can size the box without a forced aspect-ratio.
// Caption is implicit MDX children — optional, no dedicated <Caption>.
export async function Image({
  publicId,
  alt,
  padded = false,
  children,
}: Props) {
  const { width, height } = await getImageDimensions(publicId);

  return (
    <figure
      className={padded ? `${styles.figure} ${styles.padded}` : styles.figure}
    >
      <CloudinaryImage
        publicId={publicId}
        width={width}
        height={height}
        alt={alt}
      />
      {children ? (
        <figcaption className={styles.caption}>{children}</figcaption>
      ) : null}
    </figure>
  );
}
