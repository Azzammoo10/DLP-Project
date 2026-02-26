import { useEffect } from "react";

/**
 * Intersection Observer hook — adds .visible to .fade-section elements
 * when they scroll into the viewport.
 */
export function useFadeOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".fade-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
