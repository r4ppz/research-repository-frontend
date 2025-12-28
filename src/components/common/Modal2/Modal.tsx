import React, { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { X } from "lucide-react";
import { useModalBodyClass } from "@/hooks/useModalBodyClass";
import style from "./Modal.module.css";

// TODO: replace original modal using redix ui primitive
// this is AI generated and it doesnt work. Fix later

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  useModalBodyClass(isOpen);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only trigger onClose if the click happened outside the modal content
    if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal container={document.getElementById("modal-root") || undefined}>
        <Dialog.Overlay className={style.overlay} onClick={handleOverlayClick} />

        <Dialog.Content
          ref={contentRef}
          className={clsx(style.modal, className)}
          onEscapeKeyDown={onClose}
        >
          <Dialog.Close asChild>
            <button className={style.closeButton} aria-label="Close modal">
              <X className={style.iconClose} />
            </button>
          </Dialog.Close>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
