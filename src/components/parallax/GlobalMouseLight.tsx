import { useEffect, useRef } from "react";

/**
 * Cahaya kursor global ambient (ultra-halus & performant)
 * Menggunakan requestAnimationFrame dan CSS variables untuk zero-React-re-render.
 */
export function GlobalMouseLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Matikan jika touch device atau reduced motion
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || reduced) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let isVisible = false;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const updatePosition = () => {
      // Damped spring interpolation (lerp 0.08)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        lightRef.current.style.opacity = isVisible ? "1" : "0";
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={lightRef}
      className="pointer-events-none fixed -top-[250px] -left-[250px] z-30 h-[500px] w-[500px] opacity-0 transition-opacity duration-700 will-change-transform"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle 250px at center, rgba(155, 130, 208, 0.09) 0%, rgba(216, 174, 74, 0.05) 40%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
