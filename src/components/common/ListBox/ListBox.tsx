import { Check } from "lucide-react";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxLoadMoreItem as AriaListBoxLoadMoreItem,
  ListBoxSection as AriaListBoxSection,
  composeRenderProps,
  ListBoxItemProps,
  ListBoxLoadMoreItemProps,
  ListBoxProps,
  ListBoxSectionProps,
} from "react-aria-components";
import { Text } from "../Content/Content";
import { ProgressCircle } from "../ProgressCircle/ProgressCircle";
import styles from "./ListBox.module.css";

/*
 * A listbox displays a list of options and allows a user to select one or more of them.
 */
export function ListBox<T extends object>({ children, ...props }: ListBoxProps<T>) {
  return (
    <AriaListBox {...props} className={styles.listBox}>
      {children}
    </AriaListBox>
  );
}

/*
 * A ListBoxItem represents an individual option in a ListBox.
 */
export function ListBoxItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ?? (typeof props.children === "string" ? props.children : undefined);

  return (
    <AriaListBoxItem {...props} textValue={textValue} className={styles.listBoxItem}>
      {composeRenderProps(props.children, (children) =>
        typeof children === "string" ? <Text slot="label">{children}</Text> : children,
      )}
    </AriaListBoxItem>
  );
}

/*
 *  A ListBoxSection represents a section within a ListBox.
 */
export function ListBoxSection<T extends object>(props: ListBoxSectionProps<T>) {
  return <AriaListBoxSection {...props} className={styles.listBoxSection} />;
}

export function ListBoxLoadMoreItem(props: ListBoxLoadMoreItemProps) {
  return (
    <AriaListBoxLoadMoreItem {...props}>
      <ProgressCircle isIndeterminate aria-label="Loading more..." />
    </AriaListBoxLoadMoreItem>
  );
}

/*
 *  A listbox displays a list of options and allows a user to select one or more of them.
 */
export function DropdownListBox<T extends object>(props: ListBoxProps<T>) {
  return <AriaListBox {...props} className={styles.dropdownListBox} />;
}

export function DropdownItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ?? (typeof props.children === "string" ? props.children : undefined);

  return (
    <ListBoxItem {...props} textValue={textValue} className={styles.dropdownItem}>
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          {isSelected && <Check className="checkIcon" />}
          {typeof children === "string" ? <Text slot="label">{children}</Text> : children}
        </>
      ))}
    </ListBoxItem>
  );
}
