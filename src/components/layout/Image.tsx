import { getImageDimensions } from "@/lib/cloudinary";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import styles from "./Media.module.css";

type Props = {
  publicId: string;
  alt: string;
  children?: React.ReactNode;
};

// Takes a Cloudinary public ID directly; resolves intrinsic dimensions at
// build time so the browser can size the box without a forced aspect-ratio.
// Caption is implicit MDX children — optional, no dedicated <Caption>.
export async function Image({ publicId, alt, children }: Props) {
  const { width, height } = await getImageDimensions(publicId);

  return (
    <figure className={styles.figure}>
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
