import { motion, MotionValue, useTransform } from "framer-motion";

interface InteractiveLightingProps {
  smoothX: MotionValue<number>; // -1 to 1
  smoothY: MotionValue<number>; // -1 to 1
  isTouch?: boolean;
}

/**
 * Cahaya ambient interaktif (ultra-ringan & zero-jank)
 * Menggunakan multi-stop radial gradients murni tanpa filter blur berat untuk performa 60/120 FPS.
 */
export function InteractiveLighting({
  smoothX,
  smoothY,
  isTouch = false,
}: InteractiveLightingProps) {
  // Translasi halus mengikuti kursor
  const purpleX = useTransform(smoothX, [-1, 1], [-45, 45]);
  const purpleY = useTransform(smoothY, [-1, 1], [-35, 35]);

  const goldX = useTransform(smoothX, [-1, 1], [30, -30]);
  const goldY = useTransform(smoothY, [-1, 1], [25, -25]);

  if (isTouch) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[10%] left-1/2 h-[750px] w-[900px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(111,85,165,0.3) 0%, rgba(155,130,208,0.1) 40%, rgba(11,7,33,0) 70%)",
          }}
        />
        <div
          className="absolute -bottom-[15%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(216,174,74,0.15) 0%, rgba(216,174,74,0.04) 40%, transparent 65%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform" aria-hidden="true">
      {/* 1. Nebula Ungu Utama */}
      <motion.div
        className="absolute -top-[12%] left-1/2 h-[850px] w-[1050px] -translate-x-1/2 rounded-full will-change-transform"
        style={{
          x: purpleX,
          y: purpleY,
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(111,85,165,0.32) 0%, rgba(155,130,208,0.12) 45%, transparent 70%)",
        }}
      />

      {/* 2. Sinar Emas Magis Halus */}
      <motion.div
        className="absolute top-[28%] left-1/2 h-[550px] w-[700px] -translate-x-1/2 rounded-full will-change-transform"
        style={{
          x: goldX,
          y: goldY,
          background:
            "radial-gradient(circle 50% at 50% 50%, rgba(216,174,74,0.14) 0%, rgba(240,206,112,0.04) 40%, transparent 68%)",
        }}
      />

      {/* 3. Aura Vignette Lembut */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 55%, rgba(11,7,33,0.5) 100%)",
        }}
      />
    </div>
  );
}
