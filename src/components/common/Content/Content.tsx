import clsx from "clsx";
import {
  Heading as AriaHeading,
  Text as AriaText,
  HeadingProps,
  TextProps,
} from "react-aria-components";

import style from "./Content.module.css";

export function Heading({ level = 3, className, ...props }: HeadingProps) {
  return (
    <AriaHeading
      level={level}
      className={clsx(style.heading, style[`h${String(level)}`], className)}
      {...props}
    />
  );
}

export function Text({ className, ...props }: TextProps) {
  return <AriaText className={clsx(style.text, className)} {...props} />;
}
