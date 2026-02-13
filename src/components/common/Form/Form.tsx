import {
  FieldErrorProps,
  FormProps,
  LabelProps,
  FieldError as RACFieldError,
  Form as RACForm,
  Label as RACLabel,
  TextProps,
} from "react-aria-components";
import style from "./Form.module.css";
import { Text } from "../Content/Content";

export function Form(props: FormProps) {
  return <RACForm className={style.form} {...props} />;
}

export function Label(props: LabelProps) {
  return <RACLabel className={style.label} {...props} />;
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError className={style.fieldError} {...props} />;
}

export function Description(props: TextProps) {
  return <Text slot="description" className={style.fieldDescription} {...props} />;
}
