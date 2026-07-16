import { Grid } from "./Grid";
import { Column } from "./Column";
import { Image } from "./Image";
import { Video } from "./Video";
import { Tag, Button } from "@/components/ui";
import styles from "./Hero.module.css";

type TechStackEntry = {
  name: string;
  icon: string;
};

type ButtonEntry = {
  label: string;
  url: string;
  variant?: "primary" | "secondary" | "ghost";
};

type BaseProps = {
  title: string;
  description?: string;
  date: string;
  tags: string[];
  techStack?: TechStackEntry[];
  buttons?: ButtonEntry[];
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

// Props-driven from /play frontmatter (type: "project" | "experiment").
// Media is optional, matching the underlying PlayFrontmatter schema.
export function CodeHero({
  title,
  description,
  date,
  tags,
  techStack,
  buttons,
  image,
  video,
  videoAutoplay,
  alt,
}: Props) {
  const eyebrow = (
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
  );

  const renderTechStack = (extraClassName?: string) =>
    techStack && techStack.length > 0 ? (
      <div
        className={`${styles.techStack} ${extraClassName ?? ""} text-in text-in-delay-3`}
      >
        {techStack.map((tech) => (
          <Tag
            key={tech.name}
            kind="tech-stack"
            name={tech.name}
            icon={tech.icon}
          />
        ))}
      </div>
    ) : null;

  const buttonRow =
    buttons && buttons.length > 0 ? (
      <div className={`${styles.buttonRow} text-in text-in-delay-3`}>
        {buttons.map((btn) => (
          <Button
            key={btn.url}
            variant={btn.variant ?? "primary"}
            size="small"
            linkType="external"
            href={btn.url}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    ) : null;

  const text = (
    <>
      {eyebrow}
      <h1 className="display-xl text-in text-in-delay-1">{title}</h1>
      {description ? (
        <p className={`body-l ${styles.overview} text-in text-in-delay-2`}>
          {description}
        </p>
      ) : null}
      {buttonRow}
    </>
  );

  if (!image && !video) {
    return (
      <Grid columns={[1]}>
        <Column>
          {text}
          {renderTechStack()}
        </Column>
      </Grid>
    );
  }

  const media = video ? (
    <Video publicId={video} alt={alt} autoplay={videoAutoplay ?? false} />
  ) : image ? (
    <Image publicId={image} alt={alt} />
  ) : null;

  return (
    <Grid columns={[1, 2]}>
      <Column>{text}</Column>
      <Column className={styles.mediaColumn}>
        <div className="text-in text-in-delay-2">{media}</div>
        {renderTechStack(styles.mediaTechStack)}
      </Column>
    </Grid>
  );
}
