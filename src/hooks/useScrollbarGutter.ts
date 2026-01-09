import { useEffect } from "react";

/**
 * Custom hook to detect if the page is scrollable and add a CSS class to the html element accordingly
 * This is useful for handling layout adjustments when a scrollbar is present
 * The hook adds the 'scrollable' class to the html element when the page is scrollable
 */
export const useScrollbarGutter = () => {
  useEffect(() => {
    const update = () => {
      const isScrollable = document.body.scrollHeight > window.innerHeight;
      document.documentElement.classList.toggle("scrollable", isScrollable);
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);
};
