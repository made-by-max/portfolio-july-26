type Props = {
  publicId: string;
  width: number;
  height: number;
  alt: string;
};

export function CloudinaryImage({ publicId, width, height, alt }: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const src = `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_auto,f_auto/${publicId}`;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} width={width} height={height} alt={alt} />;
}
