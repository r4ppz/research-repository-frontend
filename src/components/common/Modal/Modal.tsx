import { clsx } from "clsx";
import { X } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";

import { useModalBodyClass } from "@/hooks/useModalBodyClass";

import style from "./Modal.module.css";

// pls help me fix this shitty modal

// TODO: use radix primitive modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  useModalBodyClass(isOpen);

  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    throw new Error("Modal root element not found");
  }

  return ReactDOM.createPortal(
    <div className={style.overlay} onClick={onClose}>
      <div
        className={clsx(style.modal, className)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="dialog"
        aria-modal="true"
      >
        <button className={style.closeButton} onClick={onClose} aria-label="Close modal">
          <X className={style.iconClose} />
        </button>

        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
