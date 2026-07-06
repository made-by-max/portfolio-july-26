// Pure URL construction — no Node.js deps, safe to import in client components.

export function buildImageUrl(
  publicId: string,
  opts: {
    width?: number;
    quality?: number | "auto";
    format?: string;
  } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { width, quality = "auto", format = "auto" } = opts;

  const transformations = [
    width ? `w_${width}` : null,
    `q_${quality}`,
    `f_${format}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}

export function buildVideoUrl(
  publicId: string,
  opts: {
    width?: number;
    quality?: number | "auto";
    format?: string;
  } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { width, quality = "auto", format = "auto" } = opts;

  const transformations = [
    width ? `w_${width}` : null,
    `q_${quality}`,
    `f_${format}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${publicId}`;
}
