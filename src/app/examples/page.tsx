// Proof-of-concept page — delete or move behind isDraft once real design lands.
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { CloudinaryVideo } from "@/components/ui/CloudinaryVideo";
import { MotionExample } from "@/components/ui/MotionExample";
import { LucideExample } from "@/components/ui/LucideExample";

// Cloudinary sample assets — replace with real public IDs
const IMAGE_PUBLIC_ID = "samples/landscape_university";
const VIDEO_PUBLIC_ID = "samples/elephants";

const cloudinaryConfigured =
  !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

async function getCloudinaryDimensions() {
  if (!cloudinaryConfigured) return null;

  const { getImageDimensions, getVideoDimensions } = await import(
    "@/lib/cloudinary"
  );
  const [imgDims, vidDims] = await Promise.all([
    getImageDimensions(IMAGE_PUBLIC_ID),
    getVideoDimensions(VIDEO_PUBLIC_ID),
  ]);
  return { imgDims, vidDims };
}

export default async function ExamplesPage() {
  const dims = await getCloudinaryDimensions();

  return (
    <main>
      <h1>Examples</h1>

      <section>
        <h2>Cloudinary Image</h2>
        {dims ? (
          <>
            <p>
              Build-time dimensions: {dims.imgDims.width}×{dims.imgDims.height}
            </p>
            <CloudinaryImage
              publicId={IMAGE_PUBLIC_ID}
              width={dims.imgDims.width}
              height={dims.imgDims.height}
              alt="Example image from Cloudinary"
            />
          </>
        ) : (
          <p>
            Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and
            CLOUDINARY_API_SECRET to .env.local to test Cloudinary integration.
          </p>
        )}
      </section>

      <section>
        <h2>Cloudinary Video</h2>
        {dims ? (
          <>
            <p>
              Build-time dimensions: {dims.vidDims.width}×{dims.vidDims.height}
            </p>
            <CloudinaryVideo
              publicId={VIDEO_PUBLIC_ID}
              width={dims.vidDims.width}
              height={dims.vidDims.height}
              controls
            />
          </>
        ) : (
          <p>Configure Cloudinary credentials to see this example.</p>
        )}
      </section>

      <section>
        <h2>Motion (fade-in)</h2>
        <MotionExample />
      </section>

      <section>
        <h2>Lucide Icon</h2>
        <LucideExample />
      </section>
    </main>
  );
}
