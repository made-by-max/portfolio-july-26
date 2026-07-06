// Custom image loader for next/image — used because output: 'export' disables
// Next's built-in image optimization server.
type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function cloudinaryLoader({
  src,
  width,
  quality = 75,
}: LoaderProps): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_${quality},f_auto/${src}`;
}
