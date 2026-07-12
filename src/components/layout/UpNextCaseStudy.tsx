import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Grid } from "./Grid";
import { Column } from "./Column";
import styles from "./UpNextCaseStudy.module.css";

type Props = {
  title: string;
  href: string;
};

// Rendered by work/[slug]/page.tsx after the case study's own content —
// caller wraps it in a Section, same as CaseStudyHero/CaseStudyCard.
export function UpNextCaseStudy({ title, href }: Props) {
  return (
    <Grid columns={[1]}>
      <Column>
        <Link href={href} className={styles.link}>
          <span className={`font-tag ${styles.eyebrow}`}>Up Next</span>
          <span className={`display-l ${styles.title}`}>
            {title}
            <ArrowRight className={styles.arrow} aria-hidden="true" />
          </span>
        </Link>
      </Column>
    </Grid>
  );
}
