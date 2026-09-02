import { useMemo } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Sparkle } from "lucide-react";

interface ParticleFieldProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isTouch?: boolean;
}

interface ParticleSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  delay: string;
  duration: string;
  color: string;
  glow: boolean;
  layer: "back" | "front";
}

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function ParticleField({ smoothX, smoothY, isTouch = false }: ParticleFieldProps) {
  // Background particles move very subtly (0.02)
  const backX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const backY = useTransform(smoothY, [-1, 1], [-14, 14]);

  // Foreground particles move with more depth (0.14)
  const frontX = useTransform(smoothX, [-1, 1], [-55, 55]);
  const frontY = useTransform(smoothY, [-1, 1], [-45, 45]);

  const { backParticles, frontParticles, magicalSparks } = useMemo(() => {
    const rand = seeded(303088);
    const colors = [
      "rgba(245, 241, 232, 0.85)", // ivory
      "rgba(216, 174, 74, 0.9)",   // gold
      "rgba(155, 130, 208, 0.85)", // lavender
      "rgba(240, 206, 112, 0.95)", // bright gold
    ];

    const all: ParticleSpec[] = [];
    const totalCount = isTouch ? 18 : 32;

    for (let i = 0; i < totalCount; i++) {
      const isFront = i % 4 === 0;
      all.push({
        id: i,
        left: `${(rand() * 96 + 2).toFixed(2)}%`,
        top: `${(rand() * 94 + 3).toFixed(2)}%`,
        size: isFront ? Number((2.5 + rand() * 2.2).toFixed(1)) : Number((1.2 + rand() * 1.6).toFixed(1)),
        opacity: isFront ? 0.85 : Number((0.35 + rand() * 0.45).toFixed(2)),
        delay: `${(rand() * 6).toFixed(2)}s`,
        duration: `${(4 + rand() * 5).toFixed(2)}s`,
        color: colors[Math.floor(rand() * colors.length)],
        glow: isFront || rand() > 0.5,
        layer: isFront ? "front" : "back",
      });
    }

    const sparks = [
      { left: "12%", top: "24%", size: 14, delay: "0.2s" },
      { left: "84%", top: "20%", size: 16, delay: "1.4s" },
      { left: "22%", top: "72%", size: 12, delay: "2.1s" },
      { left: "78%", top: "68%", size: 15, delay: "0.8s" },
      { left: "50%", top: "14%", size: 18, delay: "1.9s" },
    ];

    return {
      backParticles: all.filter((p) => p.layer === "back"),
      frontParticles: all.filter((p) => p.layer === "front"),
      magicalSparks: sparks,
    };
  }, [isTouch]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 1. Distant Star Layer (Back) */}
      <motion.div
        className="absolute inset-0"
        style={isTouch ? {} : { x: backX, y: backY }}
      >
        {backParticles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </motion.div>

      {/* 2. Magical Constellation Sparkles (Mid) */}
      <div className="absolute inset-0">
        {magicalSparks.map((s, idx) => (
          <Sparkle
            key={idx}
            className="absolute animate-pulse-soft text-gold/75"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* 3. Foreground Drifting Embers (Front) */}
      <motion.div
        className="absolute inset-0"
        style={isTouch ? {} : { x: frontX, y: frontY }}
      >
        {frontParticles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
