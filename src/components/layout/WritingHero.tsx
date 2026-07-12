import { Grid } from "./Grid";
import { Column } from "./Column";
import { Image } from "./Image";
import styles from "./Hero.module.css";

type BaseProps = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

type Props =
  | (BaseProps & { image?: undefined; imageAlt?: undefined })
  | (BaseProps & { image: string; imageAlt: string });

// Props-driven from /play frontmatter (type: "blog" | "note"). Image is
// optional — imageAlt is only required when an image is actually passed.
export function WritingHero({
  title,
  description,
  date,
  tags,
  image,
  imageAlt,
}: Props) {
  const text = (
    <>
      <p className={`font-tag ${styles.tags} text-in`}>{tags.join(" / ")}</p>
      <h1 className="display-xl text-in text-in-delay-1">{title}</h1>
      <p className={`body-l ${styles.overview} text-in text-in-delay-2`}>
        {description}
      </p>
      <p className={`body-s ${styles.date} text-in text-in-delay-3`}>{date}</p>
    </>
  );

  if (!image) {
    return (
      <Grid columns={[1]}>
        <Column>{text}</Column>
      </Grid>
    );
  }

  return (
    <Grid columns={[3, 2]}>
      <Column>{text}</Column>
      <Column>
        <div className="text-in text-in-delay-2">
          <Image publicId={image} alt={imageAlt} />
        </div>
      </Column>
    </Grid>
  );
}
