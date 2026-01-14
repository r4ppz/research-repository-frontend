import { type RefObject, useEffect } from "react";

export function useScrollToTop(ref: RefObject<HTMLElement | null>, deps: readonly unknown[]): void {
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.scrollTo({ top: 0, behavior: "smooth" });
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: < it's fine >
  }, deps);
}
