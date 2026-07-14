import { Grid } from "./Grid";
import { Column } from "./Column";
import { Image } from "./Image";
import { Tag, Button } from "@/components/ui";
import styles from "./CaseStudyCard.module.css";

type Props = {
  title: string;
  description: string;
  labels: string[];
  image: string;
  imageAlt: string;
  href: string;
};

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
  imageAlt,
  href,
}: Props) {
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
          <h3 className="display-s">{title}</h3>
          <p className={`body-m ${styles.description}`}>{description}</p>
          <Button variant="primary" href={href} linkType="internal">
            View case study
          </Button>
        </Column>
        <Column className={styles.imageColumn}>
          <div className={styles.imageFrame}>
            <Image publicId={image} alt={imageAlt} />
          </div>
        </Column>
      </Grid>
    </div>
  );
}
