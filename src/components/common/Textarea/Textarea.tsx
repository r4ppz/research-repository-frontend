import clsx from "clsx";
import { type ComponentType, forwardRef, type TextareaHTMLAttributes } from "react";
import style from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  icon?: ComponentType<{ className?: string }>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <div className={clsx(style.textareaContainer, className)}>
        {Icon && <Icon className={style.icon} />}
        <textarea {...props} ref={ref} className={style.textarea} />
      </div>
    );
  },
);
