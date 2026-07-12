import { cloneElement, type ReactElement } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideProps } from "lucide-react";
import styles from "./Button.module.css";

type Size = "small" | "medium" | "large";
type Variant = "primary" | "secondary" | "ghost";

const ICON_SIZE: Record<Size, number> = {
  small: 14,
  medium: 16,
  large: 20,
};

type CommonProps = {
  variant: Variant;
  size?: Size;
  leadingIcon?: ReactElement<LucideProps>;
  children: React.ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
  /** Explicit so the arrow direction never depends on parsing the URL —
   * internal links get a right arrow, external links get an up-right arrow. */
  linkType: "internal" | "external";
  onClick?: undefined;
  type?: undefined;
  trailingIcon?: undefined;
};

type ActionProps = CommonProps & {
  href?: undefined;
  linkType?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  trailingIcon?: ReactElement<LucideProps>;
};

type Props = LinkProps | ActionProps;

function renderIcon(
  icon: ReactElement<LucideProps> | undefined,
  size: Size,
  position: "leading" | "trailing"
) {
  if (!icon) return null;
  return cloneElement(icon, {
    size: ICON_SIZE[size],
    "aria-hidden": true,
    className:
      position === "trailing" ? styles.trailingIcon : styles.leadingIcon,
  });
}

export function Button(props: Props) {
  const { variant, size = "medium", leadingIcon, children } = props;
  const className = `font-button ${styles.button}`;
  const leading = renderIcon(leadingIcon, size, "leading");

  if (props.linkType) {
    const trailing = renderIcon(
      props.linkType === "internal" ? <ArrowRight /> : <ArrowUpRight />,
      size,
      "trailing"
    );
    const content = (
      <>
        {leading}
        <span>{children}</span>
        {trailing}
      </>
    );

    if (props.linkType === "external") {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          data-variant={variant}
          data-size={size}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={props.href}
        className={className}
        data-variant={variant}
        data-size={size}
      >
        {content}
      </Link>
    );
  }

  const trailing = renderIcon(props.trailingIcon, size, "trailing");

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={className}
      data-variant={variant}
      data-size={size}
    >
      {leading}
      <span>{children}</span>
      {trailing}
    </button>
  );
}
