"use client";
import clsx from "clsx";
import React from "react";
import {
  Popover as AriaPopover,
  PopoverProps as AriaPopoverProps,
  OverlayArrow,
} from "react-aria-components";
import styles from "./Popover.module.css";

export interface PopoverProps extends Omit<AriaPopoverProps, "children"> {
  children: React.ReactNode;
  hideArrow?: boolean;
  className?: string;
}

export function Popover({ children, hideArrow, className, ...props }: PopoverProps) {
  return (
    <AriaPopover {...props} className={clsx(styles.popover, className)}>
      {!hideArrow && (
        <OverlayArrow className={styles.arrow}>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" stroke="currentColor" fill="none" strokeWidth={2} />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaPopover>
  );
}
