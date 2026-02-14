import clsx from "clsx";
import {
  Heading as AriaHeading,
  Text as AriaText,
  HeadingProps,
  TextProps,
} from "react-aria-components";

import style from "./Content.module.css";

export function Heading({ level = 3, ...props }: HeadingProps) {
  return (
    <AriaHeading
      level={level}
      className={clsx(style.heading, style[`h${String(level)}`])}
      {...props}
    />
  );
}

export function Text(props: TextProps) {
  return <AriaText className={style.text} {...props} />;
}
