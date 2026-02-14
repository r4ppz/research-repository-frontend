import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  Input,
  ValidationResult,
} from "react-aria-components";
import { Description, FieldError, Label } from "../Form/Form";
import style from "./TextField.module.css";

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField className={style.textField} {...props}>
      {label && <Label>{label}</Label>}
      <Input className={style.input} placeholder={placeholder} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
