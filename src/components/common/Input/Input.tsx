import clsx from "clsx";
import { type ComponentType, forwardRef, type InputHTMLAttributes } from "react";
import style from "./Input.module.css";

type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "search"
  | "url"
  | "tel"
  | "date"
  | "datetime-local";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", icon: Icon, className, disabled, ...props }, ref) => {
    return (
      <div
        className={clsx(style.inputWrapper, { [style.inputWrapperDisabled]: disabled }, className)}
      >
        {Icon && <Icon className={style.icon} />}
        <input ref={ref} type={type} className={style.input} disabled={disabled} {...props} />
      </div>
    );
  },
);
