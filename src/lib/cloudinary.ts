// Server-only — imports the Cloudinary Node SDK for Admin API calls.
// Never import this file in client components.
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryDimensions = {
  width: number;
  height: number;
};

export async function getImageDimensions(
  publicId: string
): Promise<CloudinaryDimensions> {
  const result = await cloudinary.api.resource(publicId, {
    resource_type: "image",
  });
  return { width: result.width, height: result.height };
}

export async function getVideoDimensions(
  publicId: string
): Promise<CloudinaryDimensions> {
  const result = await cloudinary.api.resource(publicId, {
    resource_type: "video",
  });
  return { width: result.width, height: result.height };
}

export { buildImageUrl, buildVideoUrl } from "./cloudinary-urls";
