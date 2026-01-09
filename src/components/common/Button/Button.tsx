import clsx from "clsx";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import style from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, className, type = "button", ...props }, ref) => {
    const buttonClass = clsx(style.button, style[variant], className);

    return (
      <button ref={ref} type={type} className={buttonClass} {...props}>
        {children}
      </button>
    );
  },
);

export default Button;
