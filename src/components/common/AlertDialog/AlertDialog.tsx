import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import styles from "./AlertDialog.module.css";

const { Root, Trigger, Portal, Overlay, Content, Title, Description, Action, Cancel } =
  AlertDialogPrimitive;

type OverlayProps = ComponentPropsWithoutRef<typeof Overlay> & { ref?: Ref<HTMLDivElement> };
type ContentProps = ComponentPropsWithoutRef<typeof Content> & { ref?: Ref<HTMLDivElement> };
type TitleProps = ComponentPropsWithoutRef<typeof Title> & { ref?: Ref<HTMLHeadingElement> };
type DescriptionProps = ComponentPropsWithoutRef<typeof Description> & {
  ref?: Ref<HTMLParagraphElement>;
};

function AlertDialogOverlay({ className, ref, ...props }: OverlayProps) {
  return <Overlay ref={ref} className={clsx(styles.overlay, className)} {...props} />;
}

function AlertDialogContent({ className, children, ref, ...props }: ContentProps) {
  return (
    <Portal>
      <AlertDialogOverlay />
      <div className={styles.contentWrapper}>
        <Content ref={ref} className={clsx(styles.dialogContent, className)} {...props}>
          {children}
        </Content>
      </div>
    </Portal>
  );
}

function AlertDialogTitle({ className, ref, ...props }: TitleProps) {
  return <Title ref={ref} className={clsx(styles.title, className)} {...props} />;
}

function AlertDialogDescription({ className, ref, ...props }: DescriptionProps) {
  return <Description ref={ref} className={clsx(styles.description, className)} {...props} />;
}

export {
  Root as AlertDialog,
  Trigger as AlertDialogTrigger,
  Portal as AlertDialogPortal,
  Action as AlertDialogAction,
  Cancel as AlertDialogCancel,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
};
