import { ChevronDown } from "lucide-react";
import React from "react";
import {
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  ListBoxItemProps,
  ListBoxProps,
  SelectValue,
  ValidationResult,
} from "react-aria-components";
import { Button } from "../Button/Button";
import { Description, FieldError, Label } from "../Form/Form";
import { DropdownItem, DropdownListBox } from "../ListBox/ListBox";
import { Popover } from "../Popover/Popover";
import styles from "./Select.module.css";

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect {...props} className={styles.select}>
      {label && <Label>{label}</Label>}
      <Button className={styles.button}>
        <SelectValue className={styles.selectValue} />
        <ChevronDown className={styles.chevron} />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow className={styles.popover}>
        <SelectListBox items={items}>{children}</SelectListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectListBox<T extends object>(props: ListBoxProps<T>) {
  return <DropdownListBox {...props} />;
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}
