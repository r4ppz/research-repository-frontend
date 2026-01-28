import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import styles from "./Dialog.module.css";

const { Root, Trigger, Portal, Overlay, Content, Title, Description, Close } = DialogPrimitive;

type OverlayProps = ComponentPropsWithoutRef<typeof Overlay> & { ref?: Ref<HTMLDivElement> };
type ContentProps = ComponentPropsWithoutRef<typeof Content> & { ref?: Ref<HTMLDivElement> };
type TitleProps = ComponentPropsWithoutRef<typeof Title> & { ref?: Ref<HTMLHeadingElement> };
type DescriptionProps = ComponentPropsWithoutRef<typeof Description> & {
  ref?: Ref<HTMLParagraphElement>;
};

function DialogOverlay({ className, ref, ...props }: OverlayProps) {
  return <Overlay ref={ref} className={clsx(styles.overlay, className)} {...props} />;
}

function DialogContent({ className, children, ref, ...props }: ContentProps) {
  return (
    <Portal>
      <DialogOverlay />
      <div className={styles.contentWrapper}>
        <Content ref={ref} className={clsx(styles.dialogContent, className)} {...props}>
          {children}
          <Close className={styles.closeButton} aria-label="Close dialog">
            <Cross2Icon className={styles.iconClose} />
          </Close>
        </Content>
      </div>
    </Portal>
  );
}

function DialogTitle({ className, ref, ...props }: TitleProps) {
  return <Title ref={ref} className={clsx(styles.title, className)} {...props} />;
}

function DialogDescription({ className, ref, ...props }: DescriptionProps) {
  return <Description ref={ref} className={clsx(styles.description, className)} {...props} />;
}

export {
  Root as Dialog,
  Trigger as DialogTrigger,
  Portal as DialogPortal,
  Close as DialogClose,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
