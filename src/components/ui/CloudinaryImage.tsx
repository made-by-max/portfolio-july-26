type Props = {
  publicId: string;
  width: number;
  height: number;
  alt: string;
};

// Max width requested from Cloudinary's transformation pipeline. Keeps
// delivered image size well under the free-tier 25MP cap regardless of
// the asset's intrinsic resolution. Intrinsic width/height are still
// passed as HTML attributes so the browser reserves the correct aspect ratio.
const MAX_DELIVERY_WIDTH = 2000;

export function CloudinaryImage({ publicId, width, height, alt }: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const deliveryWidth = Math.min(width, MAX_DELIVERY_WIDTH);
  const src = `https://res.cloudinary.com/${cloudName}/image/upload/w_${deliveryWidth},q_auto,f_auto/${publicId}`;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} width={width} height={height} alt={alt} />;
}
