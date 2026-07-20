import Link from "next/link";
import { Image } from "./Image";
import styles from "./FeaturedContentCard.module.css";

type Props = {
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  href: string;
};

// /play content only (homepage). Image and title are independently
// clickable — description is static, no whole-card click target.
export function FeaturedContentCard({
  title,
  description,
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
    </div>
  );
}
