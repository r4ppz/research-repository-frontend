import { useEffect } from "react";

export function useScrollToTop<T extends HTMLElement>(
  ref: React.RefObject<T>,
  deps: ReadonlyArray<unknown>,
) {
  useEffect(() => {
    const el = ref.current;

    let timeoutId: number | undefined;
    const raf = requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
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
      }, 0);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
