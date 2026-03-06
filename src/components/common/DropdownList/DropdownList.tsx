import { Check } from "lucide-react";
import { composeRenderProps, ListBoxItemProps, ListBoxProps } from "react-aria-components";
import { ListBox as AriaListBox } from "react-aria-components";
import { Text } from "../Content/Content";
import { ListBoxItem } from "../ListBox/ListBox";
import styles from "./DropdownList.module.css";

export function DropdownListBox<T extends object>(props: ListBoxProps<T>) {
  return <AriaListBox {...props} className={styles.dropdownListBox} />;
}

export function DropdownItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ?? (typeof props.children === "string" ? props.children : undefined);

  return (
    <ListBoxItem {...props} textValue={textValue}>
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          {typeof children === "string" ? (
            <Text className={styles.label} slot="label">
              {children}
            </Text>
          ) : (
            children
          )}
          {isSelected && <Check className={styles.checkIcon} />}
        </>
      ))}
    </ListBoxItem>
  );
}
