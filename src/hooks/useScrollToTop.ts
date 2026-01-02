import { RefObject, useEffect } from "react";

interface ScrollOptions<T> {
  trigger: T;
  isLoading: boolean;
  behavior?: ScrollBehavior;
  delay?: number;
}

export function useScrollToTop<E extends HTMLElement, T>(
  ref: RefObject<E | null>,
  { trigger, isLoading, behavior = "smooth", delay = 50 }: ScrollOptions<T>,
): void {
  useEffect(() => {
    // Only scroll when loading is finished
    if (isLoading) return;

    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    // Wait for the next paint cycle
    const rafId = requestAnimationFrame(() => {
      // Small delay allows the browser to finish layout and
      // ensures the smooth-scroll engine can initialize properly.
      timeoutId = setTimeout(() => {
        el.scrollTo({
          top: 0,
          behavior,
        });
      }, delay);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [trigger, isLoading, ref, behavior, delay]);
}
