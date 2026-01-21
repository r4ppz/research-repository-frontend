import clsx from "clsx";
import type { ComponentType, Ref, TextareaHTMLAttributes } from "react";
import style from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  icon?: ComponentType<{ className?: string }>;
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({ className, icon: Icon, ref, ...props }: TextareaProps) {
  return (
    <div className={clsx(style.textareaContainer, className)}>
      {Icon && <Icon className={style.icon} />}
      <textarea {...props} ref={ref} className={style.textarea} />
    </div>
  );
}
