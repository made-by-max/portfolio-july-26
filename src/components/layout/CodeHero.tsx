import { Grid } from "./Grid";
import { Column } from "./Column";
import { Image } from "./Image";
import { Tag } from "@/components/ui";
import styles from "./Hero.module.css";

type TechStackEntry = {
  name: string;
  icon: string;
};

type BaseProps = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  techStack?: TechStackEntry[];
};

type Props =
  | (BaseProps & { image?: undefined; imageAlt?: undefined })
  | (BaseProps & { image: string; imageAlt: string });

// Props-driven from /play frontmatter (type: "project" | "experiment").
// Image is optional, matching the underlying PlayFrontmatter schema —
// imageAlt is only required when an image is actually passed.
export function CodeHero({
  title,
  description,
  date,
  tags,
  techStack,
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
      {techStack && techStack.length > 0 ? (
        <div className={`${styles.techStack} text-in text-in-delay-3`}>
          {techStack.map((tech) => (
            <Tag
              key={tech.name}
              kind="tech-stack"
              name={tech.name}
              icon={tech.icon}
            />
          ))}
        </div>
      ) : null}
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
