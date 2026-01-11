import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { type ComponentProps, type ComponentRef, forwardRef } from "react";
import style from "./Dialog.module.css";

/**
 * Dialog component primitives based on Radix UI Dialog.
 * Provides accessible modal dialog functionality with custom styling.
 *
 * Components:
 * - Dialog: Root dialog state provider.
 * - DialogTrigger: Element that opens the dialog.
 * - DialogPortal: Portal for rendering dialog outside DOM hierarchy.
 * - DialogOverlay: Styled overlay behind the dialog.
 * - DialogContent: Main dialog content area with close button.
 * - DialogTitle: Dialog title element.
 * - DialogDescription: Dialog description element.
 * - DialogClose: Button to close the dialog.
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentProps<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay ref={ref} className={clsx(style.overlay, className)} {...props} />
  );
});
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentProps<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <div className={style.contentWrapper}>
        <DialogPrimitive.Content
          ref={ref}
          className={clsx(style.dialogContent, className)}
          {...props}
        >
          {children}
          <DialogPrimitive.Close className={style.closeButton} aria-label="Close">
            <Cross2Icon className={style.iconClose} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentProps<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return <DialogPrimitive.Title ref={ref} className={clsx(style.title, className)} {...props} />;
});
DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentProps<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={clsx(style.description, className)}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogPortal,
};
