import { Grid } from "./Grid";
import { Column } from "./Column";
import { Image } from "./Image";
import { Video } from "./Video";
import { Tag, Button } from "@/components/ui";
import styles from "./CaseStudyCard.module.css";

type BaseProps = {
  title: string;
  description: string;
  labels: string[];
  href: string;
};

// Same image/video split as CaseStudyHero — at most one of image/video is
// ever passed (call sites branch on which the case study has), and alt is
// required whenever either is present. The underlying CaseStudyMeta schema
// enforces "at least one of image/video" at build time, but that isn't
// visible to the TS type, so the "neither" arm still exists here.
type MediaProps =
  | { image?: undefined; video?: undefined; alt?: undefined }
  | { image: string; video?: undefined; alt: string }
  | { image?: undefined; video: string; alt: string };

type Props = BaseProps & MediaProps;

// /work only — no card border of its own, it's meant to sit inside a
// Section and inherit that Section's top border. Mobile explicitly
// reorders the image above the text column (opposite of Grid's default
// DOM-order stacking), so the image column carries its own order/divider
// override rather than relying on Grid's built-in mobile divider.
export function CaseStudyCard({
  title,
  description,
  labels,
  image,
  video,
  alt,
  href,
}: Props) {
  // Video always autoplays here (muted/looped, no controls) — a thumbnail
  // card behaves like a preview loop regardless of the case study's own
  // videoAutoplay setting, which governs the full-size CaseStudyHero instead.
  const media = video ? (
    <Video publicId={video} alt={alt} autoplay />
  ) : image ? (
    <Image publicId={image} alt={alt} />
  ) : null;

  return (
    <div className="scroll-reveal">
      <Grid columns={[1, 1]}>
        <Column className={styles.textColumn}>
          <div className={styles.labels}>
            {labels.map((label) => (
              <Tag key={label} kind="label">
                {label}
              </Tag>
            ))}
          </div>
          <h3 className={`display-l ${styles.title}`}>{title}</h3>
          <p className={`body-m ${styles.description}`}>{description}</p>
          <Button variant="primary" href={href} linkType="internal">
            View case study
          </Button>
        </Column>
        <Column className={styles.imageColumn}>
          <div className={styles.imageFrame}>
            <a href={href}>{media}</a>
          </div>
        </Column>
      </Grid>
    </div>
  );
}
