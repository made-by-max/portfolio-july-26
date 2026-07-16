import { Grid } from "./Grid";
import { Column } from "./Column";
import { Image } from "./Image";
import { Video } from "./Video";
import { Tag } from "@/components/ui";
import styles from "./Hero.module.css";

type BaseProps = {
  title: string;
  description?: string;
  date: string;
  tags: string[];
};

// Only one of image/video is ever expected — alt is required whenever
// either is present (renamed from imageAlt since it now applies to
// whichever media type actually renders).
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

// Props-driven from /play frontmatter (type: "blog" | "note"). Media is
// optional. Always a single column: unlike CodeHero, writing entries have
// no second column of content to sit alongside the image/video.
export function WritingHero({
  title,
  description,
  date,
  tags,
  image,
  video,
  videoAutoplay,
  alt,
}: Props) {
  const media = video ? (
    <Video publicId={video} alt={alt} autoplay={videoAutoplay ?? false} />
  ) : image ? (
    <Image publicId={image} alt={alt} />
  ) : null;

  return (
    <Grid columns={[1]}>
      <Column>
        <div className={`${styles.eyebrow} text-in`}>
          <p className={`font-tag ${styles.eyebrowDate}`}>{date}</p>
          <div className={styles.eyebrowTags}>
            {tags.map((tag) => (
              <Tag key={tag} kind="tag">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <h1 className="display-xl text-in text-in-delay-1">{title}</h1>
        {media ? <div className="text-in text-in-delay-2">{media}</div> : null}
        {description ? (
          <p className={`body-l ${styles.overview} text-in text-in-delay-3`}>
            {description}
          </p>
        ) : null}
      </Column>
    </Grid>
  );
}
