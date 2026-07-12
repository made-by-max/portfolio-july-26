import Link from "next/link";
import { Tag } from "@/components/ui";
import styles from "./PlayListRow.module.css";

type Props = {
  title: string;
  href: string;
  tags: string[];
  /** Wires tag clicks to the same in-memory filter state the dedicated
   * /play filter UI uses — omit to render tags read-only. */
  onTagClick?: (tag: string) => void;
};

// A single row for the /play list view — a flex row, not a Grid, since we
// don't want a vertical divider between title and tags. Designed to be
// composed by a caller inside one shared Column for the whole list (no
// per-row Column/divider — see ListStack's per-item pattern for contrast).
export function PlayListRow({ title, href, tags, onTagClick }: Props) {
  return (
    <div className={styles.row}>
      <Link href={href} className={styles.title}>
        <span className="display-xs">{title}</span>
      </Link>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            kind="tag"
            onClick={onTagClick ? () => onTagClick(tag) : undefined}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}
