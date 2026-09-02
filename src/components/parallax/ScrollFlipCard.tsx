import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkle, Shield } from "lucide-react";

interface ScrollFlipCardProps {
  children: ReactNode;
  cardIndex?: number;
  chapterNumber?: string | number;
  cardTitle?: string;
  cardSubtitle?: string;
  className?: string;
  aspectRatio?: string;
}

/**
 * Ultra-Lightweight Scroll-Driven 3D Flip Card
 * Menggunakan ONE 3D transform (rotateY) dengan viewport once: true.
 * Membuka sekali saat masuk ke layar tanpa kalkulasi terus-menerus saat user scroll di section lain.
 */
export function ScrollFlipCard({
  children,
  cardIndex = 0,
  chapterNumber,
  cardTitle = "OSJUR 3.0",
  cardSubtitle = "CHRONICLES OF TOMORROW",
  className = "",
  aspectRatio = "aspect-[3/4.2]",
}: ScrollFlipCardProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouchDevice(isTouch || reduced);
  }, []);

  // Stagger trigger delay berdasarkan indeks kartu (0.06s per card di dalam baris)
  const staggerDelay = (cardIndex % 4) * 0.06;

  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateY: 180 }}
        whileInView={{ rotateY: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.65,
          delay: staggerDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* ============================================================
            SISI BELAKANG (CARD BACK) - MOTIF ARKANA OSJUR
            ============================================================ */}
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-between rounded-2xl border-2 border-gold/40 bg-gradient-to-b from-[#1f1444] via-[#120a2e] to-[#0a051c] p-5 text-center shadow-[0_12px_30px_rgba(0,0,0,0.6)] ${aspectRatio}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Ornamen Sudut Brass */}
          <span className="absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-gold/70" />
          <span className="absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-gold/70" />
          <span className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-gold/70" />
          <span className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-gold/70" />

          {/* Header Kartu Belakang */}
          <div className="flex w-full items-center justify-between pt-1 text-gold/70">
            <Sparkle className="h-3 w-3" fill="currentColor" />
            <span className="font-display text-[8px] tracking-[0.3em] uppercase text-gold/80">
              CHRONICLE ARCHIVE
            </span>
            <Sparkle className="h-3 w-3" fill="currentColor" />
          </div>

          {/* Tengah Kartu Belakang */}
          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-royal/20">
              <Shield className="h-7 w-7 text-gold" strokeWidth={1.5} />
            </div>

            {chapterNumber && (
              <p className="font-display text-sm font-bold tracking-[0.25em] text-goldbright">
                NO. {String(chapterNumber).padStart(2, "0")}
              </p>
            )}

            <h4 className="font-display text-base font-black tracking-[0.15em] text-ivory">
              {cardTitle}
            </h4>

            <p className="font-serif text-[11px] italic text-mist/70">
              {cardSubtitle}
            </p>
          </div>

          {/* Footer Kartu Belakang */}
          <div className="flex w-full flex-col items-center border-t border-royal/20 pt-2">
            <span className="font-display text-[8px] tracking-[0.35em] text-gold/60 uppercase">
              ✦ KEEPERS OF TOMORROW ✦
            </span>
          </div>
        </div>

        {/* ============================================================
            SISI DEPAN (CARD FRONT) - FOTO & PROFIL PANITIA
            ============================================================ */}
        <div
          className="relative h-full w-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
