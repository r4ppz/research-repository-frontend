import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import styles from "./Dialog.module.css";

// Learn radix dialog api for more info since this is just a thin wrapper of it.

// Aliases
const { Root, Trigger, Portal, Overlay, Content, Title, Description, Close } = DialogPrimitive;

// Props
type OverlayProps = ComponentPropsWithoutRef<typeof Overlay> & {
  ref?: Ref<HTMLDivElement>;
};
type ContentProps = ComponentPropsWithoutRef<typeof Content> & {
  ref?: Ref<HTMLDivElement>;
};
type TitleProps = ComponentPropsWithoutRef<typeof Title>;
type DescriptionProps = ComponentPropsWithoutRef<typeof Description>;

// Components

// Overlay renders a <div>
function DialogOverlay({ className, ref, ...props }: OverlayProps) {
  return <Overlay ref={ref} className={clsx(styles.overlay, className)} {...props} />;
}

// Content renders a <div>
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

// Title renders an <h2> — no ref forwarding needed
function DialogTitle({ className, ...props }: TitleProps) {
  return <Title className={clsx(styles.title, className)} {...props} />;
}

// Description renders a <p> — no ref forwarding needed
function DialogDescription({ className, ...props }: DescriptionProps) {
  return <Description className={clsx(styles.description, className)} {...props} />;
}

/**
 * Public API exports.
 *
 * These are the only supported entry points.
 * Anything not exported here is considered internal and may change.
 */
export {
  Root as Dialog, // Root dialog state container
  Trigger as DialogTrigger, // Element that opens the dialog
  Portal as DialogPortal, // Portal target for dialog rendering
  Close as DialogClose, // Close button primitive
  DialogOverlay, // Styled overlay backdrop
  DialogContent, // Dialog container with overlay and close button
  DialogTitle, // Accessible dialog titles
  DialogDescription, // Accessible dialog description
};
