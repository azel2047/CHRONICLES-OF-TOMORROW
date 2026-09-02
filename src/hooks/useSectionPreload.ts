import { useEffect, useRef } from "react";

/**
 * Lightweight progressive image preloader using IntersectionObserver.
 * Preloads the section's image URLs into browser cache when the user approaches within rootMargin.
 */
export function useSectionPreload(imageUrls: (string | null | undefined)[], rootMargin = "400px 0px") {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let preloaded = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !preloaded) {
          preloaded = true;
          for (let i = 0; i < imageUrls.length; i++) {
            const url = imageUrls[i];
            if (url) {
              const img = new Image();
              img.decoding = "async";
              img.src = url;
            }
          }
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [imageUrls, rootMargin]);

  return containerRef;
}
