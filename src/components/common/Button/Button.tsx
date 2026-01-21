import clsx from "clsx";
import type { ButtonHTMLAttributes, Ref } from "react";
import style from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = "primary",
  children,
  className,
  type = "button",
  ref,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(style.button, style[variant], className);

  return (
    <button ref={ref} type={type} className={buttonClass} {...props}>
      {children}
    </button>
  );
}
