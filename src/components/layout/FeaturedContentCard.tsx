import Link from "next/link";
import { Image } from "./Image";
import { Tag } from "@/components/ui";
import styles from "./FeaturedContentCard.module.css";

type Props = {
  title: string;
  description?: string;
  tags: string[];
  image: string;
  imageAlt: string;
  href: string;
};

// /play content only (homepage). Image and title are independently
// clickable — description and tags are static, no whole-card click
// target. Tags render read-only here; click-to-filter is a future
// enhancement, not wired up on this component.
export function FeaturedContentCard({
  title,
  description,
  tags,
  image,
  imageAlt,
  href,
}: Props) {
  return (
    <div className={`${styles.card} scroll-reveal`}>
      <Link href={href} className={styles.imageLink}>
        <Image publicId={image} alt={imageAlt} />
      </Link>
      <Link href={href} className={styles.titleLink}>
        <h3 className="display-xs">{title}</h3>
      </Link>
      {description ? (
        <p className={`body-s ${styles.description}`}>{description}</p>
      ) : null}
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Tag key={tag} kind="tag">
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}
