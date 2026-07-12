import styles from "./Tag.module.css";

type TagProps = {
  kind: "tag";
  children: string;
  /** Present on rows/cards (fires a filter toggle); omitted renders a static, non-interactive chip. */
  onClick?: () => void;
  /** Only meaningful when onClick is set — the dedicated /play filter UI needs to show which tags are active. */
  selected?: boolean;
};

type LabelProps = {
  kind: "label";
  children: string;
};

type TechStackProps = {
  kind: "tech-stack";
  name: string;
  icon: string;
};

type Props = TagProps | LabelProps | TechStackProps;

// Shared visual DNA for /play tags, case-study labels, and CodeHero's tech
// stack list — they differ in interactivity/semantics, not in being three
// separate components. `kind` picks the rendering branch.
export function Tag(props: Props) {
  if (props.kind === "label") {
    return (
      <span className={`font-tag ${styles.label}`}>{props.children}</span>
    );
  }

  if (props.kind === "tech-stack") {
    return (
      <span className={styles.techStackItem}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.techStackIcon}
          src={props.icon}
          alt=""
          aria-hidden="true"
        />
        <span className="font-tech-stack">{props.name}</span>
      </span>
    );
  }

  const { children, onClick, selected } = props;

  if (!onClick) {
    return (
      <span className={`font-tag ${styles.tag}`}>
        <span>{children}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`font-tag ${styles.tag}`}
      onClick={onClick}
      aria-pressed={selected === undefined ? undefined : selected}
      data-selected={selected || undefined}
    >
      {children}
    </button>
  );
}
