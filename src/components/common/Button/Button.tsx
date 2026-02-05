import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import clsx from "clsx";
import style from "./Button.module.css";
import { Loader2 } from "lucide-react";

interface ButtonProps extends RACButtonProps {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", ...props }: ButtonProps) {
  const classNameRenderProp = composeRenderProps(props.className, (className) =>
    clsx(style.button, style[variant], className),
  );

  const childrenRenderProp = composeRenderProps(props.children, (children, { isPending }) => (
    <>
      <span className={clsx(style.inner, isPending && style.hiddenText)}>{children}</span>
      {isPending && (
        <div className={style.spinner} aria-hidden="true">
          <Loader2 className={style.animateSpin} />
        </div>
      )}
    </>
  ));

  return (
    <RACButton {...props} className={classNameRenderProp}>
      {childrenRenderProp}
    </RACButton>
  );
}
