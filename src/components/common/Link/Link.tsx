import clsx from "clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import style from "./Link.module.css";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: ReactNode;
}

const Link = ({
  href,
  children,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: LinkProps) => {
  return (
    <a href={href} className={clsx(style.link, className)} target={target} rel={rel} {...props}>
      {children}
    </a>
  );
};

export default Link;
