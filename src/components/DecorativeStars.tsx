import { useMemo } from "react";
import { Sparkle } from "lucide-react";

interface StarSpec {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  tone: string;
}

interface SparkSpec {
  left: string;
  top: string;
  size: number;
  delay: string;
}

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Props {
  count?: number;
  sparkles?: number;
  className?: string;
}

/** Bintang + sparkle halus, murni CSS — ringan dan deterministik. */
export function DecorativeStars({ count = 60, sparkles = 5, className = "" }: Props) {
  const stars = useMemo<StarSpec[]>(() => {
    const rand = seeded(20260826);
    const tones = ["bg-ivory", "bg-lavender", "bg-gold"];
    return Array.from({ length: count }, () => ({
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      size: 1 + rand() * 1.8,
      delay: `${(rand() * 6).toFixed(2)}s`,
      duration: `${(3.5 + rand() * 4).toFixed(2)}s`,
      tone: tones[Math.floor(rand() * tones.length)],
    }));
  }, [count]);

  const sparks = useMemo<SparkSpec[]>(() => {
    const rand = seeded(777);
    return Array.from({ length: sparkles }, () => ({
      left: `${(rand() * 88 + 6).toFixed(2)}%`,
      top: `${(rand() * 88 + 6).toFixed(2)}%`,
      size: Math.round(10 + rand() * 12),
      delay: `${(rand() * 4).toFixed(2)}s`,
    }));
  }, [sparkles]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${s.tone} animate-twinkle`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
      {sparks.map((s, i) => (
        <Sparkle
          key={`sparkle-${i}`}
          className="absolute animate-pulse-soft text-gold/70"
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
  );
}
