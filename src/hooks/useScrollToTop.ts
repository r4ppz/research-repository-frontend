import { RefObject, useEffect } from "react";

export function useScrollToTop<T extends HTMLElement>(ref: RefObject<T | null>, trigger: unknown) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const raf = requestAnimationFrame(() => {
      timeoutId = setTimeout(() => {
        try {
          if (el.scrollTop === 0) {
            el.scrollTop = 1;
            requestAnimationFrame(() => {
              try {
                el.scrollTo({ top: 0, behavior: "smooth" });
              } catch {
                el.scrollTop = 0;
              }
            });
          } else {
            el.scrollTo({ top: 0, behavior: "smooth" });
          }
        } catch {
          el.scrollTop = 0;
        }
      }, 100);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [trigger, ref]);
}
