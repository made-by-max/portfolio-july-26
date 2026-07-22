import { Grid } from "./Grid";
import { Column } from "./Column";
import { Image } from "./Image";
import { Video } from "./Video";
import styles from "./Hero.module.css";

type BaseProps = {
  title: string;
  overview: string;
};

// Only one of image/video is ever expected — alt is required whenever
// either is present (renamed from imageAlt since it now applies to
// whichever media type actually renders). The underlying CaseStudyMeta
// schema enforces "at least one of image/video" at build time, but that
// isn't visible to the TS type, so the "neither" arm still exists here.
type MediaProps =
  | {
      image?: undefined;
      video?: undefined;
      videoAutoplay?: undefined;
      alt?: undefined;
    }
  | { image: string; video?: undefined; videoAutoplay?: undefined; alt: string }
  | { image?: undefined; video: string; videoAutoplay?: boolean; alt: string };

type Props = BaseProps & MediaProps;

// Props-driven from /work frontmatter, not freeform MDX. Lives inside a
// Section like other content — internally composed with Grid/Column so it
// satisfies the "content goes through a Grid" rule on its own.
export function CaseStudyHero({
  title,
  overview,
  image,
  video,
  videoAutoplay,
  alt,
}: Props) {
  const media = video ? (
    <Video publicId={video} alt={alt} autoplay={videoAutoplay ?? true} />
  ) : image ? (
    <Image publicId={image} alt={alt} />
  ) : null;

  return (
    <Grid columns={[1]}>
      <Column>
        <h1 className="display-xxl text-in text-in-delay-1">{title}</h1>
        <p className={`body-l ${styles.overview} text-in text-in-delay-2`}>
          {overview}
        </p>
      </Column>
      <Column>
        <div className={`${styles.imageFrame} text-in text-in-delay-3`}>
          {media}
        </div>
      </Column>
    </Grid>
  );
}
