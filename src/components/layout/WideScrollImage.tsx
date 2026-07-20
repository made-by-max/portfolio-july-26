import { getImageDimensions } from "@/lib/cloudinary";
import { WideScrollImageClient } from "./WideScrollImageClient";

type Props = {
  publicId: string;
  alt: string;
  children?: React.ReactNode;
};

// For very wide, short-aspect-ratio exports (e.g. a full Figma user-flow
// board around 32768×2940px) that would be unreadably short scaled to fit
// the column, or enormous shown at native size. Rendered at a fixed
// height with the real aspect ratio intact instead — width overflows and
// scrolls horizontally rather than shrinking to fit or getting cropped.
//
// Full-bleed like PinnedMediaScroll: expected to be used as a direct
// child of Section (not wrapped in Grid/Column), so it isn't constrained
// by Column's own inset/max-inline-size, while still getting Section's
// usual top border/mark treatment.
export async function WideScrollImage({ publicId, alt, children }: Props) {
  const { width, height } = await getImageDimensions(publicId);

  return (
    <WideScrollImageClient
      publicId={publicId}
      alt={alt}
      width={width}
      height={height}
    >
      {children}
    </WideScrollImageClient>
  );
}
