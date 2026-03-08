"use client";
import clsx from "clsx";
import React from "react";
import {
  Popover as AriaPopover,
  PopoverProps as AriaPopoverProps,
  composeRenderProps,
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
    <AriaPopover
      {...props}
      className={composeRenderProps(className, (className, _renderProps) =>
        clsx(styles.popover, className),
      )}
    >
      {(_renderProps) => {
        return (
          <>
            {!hideArrow && (
              <OverlayArrow className={styles.arrow}>
                <svg width={12} height={12} viewBox="0 0 12 12">
                  <path d="M0 0 L6 6 L12 0" />
                </svg>
              </OverlayArrow>
            )}
            {children}
          </>
        );
      }}
    </AriaPopover>
  );
}
