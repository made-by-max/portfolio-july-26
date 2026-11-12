import { getImageDimensions } from "@/lib/cloudinary";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { LightboxTrigger } from "@/components/ui/Lightbox";
import styles from "./Media.module.css";

type Props = {
  publicId: string;
  alt: string;
  /** Opens in the lightbox on click (fine-pointer devices only). Default
   * true — set false to opt a specific image out. */
  enlargeable?: boolean;
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
  enlargeable = true,
  padded = false,
  children,
}: Props) {
  const { width, height } = await getImageDimensions(publicId);

  return (
    <figure
      className={padded ? `${styles.figure} ${styles.padded}` : styles.figure}
    >
      <LightboxTrigger
        enabled={enlargeable}
        image={{ publicId, alt, width, height, caption: children }}
      >
        <CloudinaryImage
          publicId={publicId}
          width={width}
          height={height}
          alt={alt}
        />
      </LightboxTrigger>
      {children ? (
        <figcaption className={styles.caption}>{children}</figcaption>
      ) : null}
    </figure>
  );
}
