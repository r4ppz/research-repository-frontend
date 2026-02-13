import type { ReactNode } from "react";
import { Button } from "../Button/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";
import styles from "./AlertDialog.module.css";

interface ConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog = ({
  trigger,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>

        <div className={styles.actionContainer}>
          <AlertDialogCancel asChild>
            <Button variant="secondary">{cancelText}</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="primary" onClick={() => void onConfirm()}>
              {confirmText}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
