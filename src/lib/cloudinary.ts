// Server-only — imports the Cloudinary Node SDK for Admin API calls.
// Never import this file in client components.
import fs from "fs";
import path from "path";
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

// getImageDimensions/getVideoDimensions call the Cloudinary Admin API,
// which is rate-limited (a free-tier account gets 500 calls/hour) — every
// dev-server reload and every build re-fetches dimensions for every image
// on the site, which exhausts that quota fast. A Cloudinary asset's
// dimensions never change once uploaded, so the result is cached to disk
// here, keyed by resource type + public ID: once an asset's dimensions
// are known, they're never re-fetched. Committed to the repo (not
// gitignored) so a fresh clone or CI build doesn't need to hit the API
// for any asset that's already been seen.
type DimensionsCache = Record<string, CloudinaryDimensions>;

const CACHE_PATH = path.join(process.cwd(), "cloudinary-cache.json");

let cache: DimensionsCache | null = null;

function readCacheFromDisk(): DimensionsCache {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeCacheEntry(key: string, dimensions: CloudinaryDimensions) {
  // Re-reads from disk before writing so concurrent build workers (each
  // with their own in-memory cache) don't clobber each other's entries —
  // worst case on a write collision is one entry re-fetched next build,
  // not data loss.
  const onDisk = readCacheFromDisk();
  onDisk[key] = dimensions;
  cache = onDisk;
  fs.writeFileSync(CACHE_PATH, JSON.stringify(onDisk, null, 2) + "\n");
}

async function getDimensions(
  publicId: string,
  resourceType: "image" | "video"
): Promise<CloudinaryDimensions> {
  const key = `${resourceType}:${publicId}`;

  cache ??= readCacheFromDisk();
  if (cache[key]) return cache[key];

  const result = await cloudinary.api.resource(publicId, {
    resource_type: resourceType,
  });
  const dimensions = { width: result.width, height: result.height };
  writeCacheEntry(key, dimensions);
  return dimensions;
}

export async function getImageDimensions(
  publicId: string
): Promise<CloudinaryDimensions> {
  return getDimensions(publicId, "image");
}

export async function getVideoDimensions(
  publicId: string
): Promise<CloudinaryDimensions> {
  return getDimensions(publicId, "video");
}

export { buildImageUrl, buildVideoUrl } from "./cloudinary-urls";
