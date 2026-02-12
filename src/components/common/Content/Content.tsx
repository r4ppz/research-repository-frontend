import {
  Heading as AriaHeading,
  Text as AriaText,
  HeadingProps,
  TextProps,
} from "react-aria-components";

import style from "./Content.module.css";

export function Heading(props: HeadingProps) {
  return <AriaHeading className={style.heading} {...props} />;
}

export function Text(props: TextProps) {
  return <AriaText {...props} />;
}
