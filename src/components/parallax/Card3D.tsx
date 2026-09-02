import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  depth?: number;
  scale?: number;
  enableGlare?: boolean;
  onClick?: () => void;
}

/**
 * Ultra-High-Performance GPU 3D Tilt Card
 * Menggunakan direct CSS 3D transforms lokal pada elemen yang di-hover saja.
 * Zero background physics loops, zero state updates per frame, murni 60/120 FPS.
 */
export function Card3D({
  children,
  className = "",
  maxTilt = 6,
  depth = 20,
  scale = 1.025,
  enableGlare = true,
  onClick,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouchDevice(isTouch || reduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    const rotX = (0.5 - y) * maxTilt * 2;
    const rotY = (x - 0.5) * maxTilt * 2;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(
      2
    )}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(${depth}px) scale3d(${scale}, ${scale}, 1)`;

    if (enableGlare && glareRef.current) {
      glareRef.current.style.opacity = "0.4";
      glareRef.current.style.background = `radial-gradient(circle 220px at ${(
        x * 100
      ).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(240, 206, 112, 0.25), transparent 70%)`;
    }
  };

  const handleMouseEnter = () => {
    if (isTouchDevice || !cardRef.current) return;
    cardRef.current.style.transition = "transform 0.12s ease-out";
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || !cardRef.current) return;
    cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)";

    if (enableGlare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  if (isTouchDevice) {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        className="relative h-full w-full will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)",
        }}
      >
        {children}

        {/* Specular Glare Overlay */}
        {enableGlare && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
            style={{ mixBlendMode: "overlay" }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
