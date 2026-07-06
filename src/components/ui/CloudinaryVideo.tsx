type Props = {
  publicId: string;
  width: number;
  height: number;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export function CloudinaryVideo({
  publicId,
  width,
  height,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
}: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const src = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/${publicId}`;

  return (
    <video
      src={src}
      width={width}
      height={height}
      autoPlay={autoPlay}
      controls={controls}
      loop={loop}
      muted={muted || autoPlay}
      playsInline
    />
  );
}
