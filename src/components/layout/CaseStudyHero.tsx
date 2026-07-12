import { Grid } from "./Grid";
import { Column } from "./Column";
import { Image } from "./Image";
import { Tag } from "@/components/ui";
import styles from "./Hero.module.css";

type Props = {
  title: string;
  overview: string;
  labels: string[];
  image: string;
  imageAlt: string;
};

// Props-driven from /work frontmatter, not freeform MDX. Lives inside a
// Section like other content — internally composed with Grid/Column so it
// satisfies the "content goes through a Grid" rule on its own.
export function CaseStudyHero({
  title,
  overview,
  labels,
  image,
  imageAlt,
}: Props) {
  return (
    <Grid columns={[1]}>
      <Column>
        <div className={`${styles.labels} text-in`}>
          {labels.map((label) => (
            <Tag key={label} kind="label">
              {label}
            </Tag>
          ))}
        </div>
        <h1 className="display-xxl text-in text-in-delay-1">{title}</h1>
        <p className={`body-l ${styles.overview} text-in text-in-delay-2`}>
          {overview}
        </p>
      </Column>
      <Column>
        <div className={`${styles.imageFrame} text-in text-in-delay-3`}>
          <span
            className={`corner-mark ${styles.imageMark}`}
            aria-hidden="true"
          />
          <Image publicId={image} alt={imageAlt} />
        </div>
      </Column>
    </Grid>
  );
}
