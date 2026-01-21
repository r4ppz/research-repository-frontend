import clsx from "clsx";
import { useState } from "react";
import style from "./Avatar.module.css";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src?: string | null;
  alt: string;
  fallbackName: string;
  size?: AvatarSize;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === "") {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({ src, alt, fallbackName, size = "md", className }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const showImage = src && !hasError;
  const initials = getInitials(fallbackName);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={clsx(style.avatar, style[size], className)}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className={style.image}
          onError={handleError}
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className={style.initials}>{initials}</span>
      )}
    </div>
  );
}
