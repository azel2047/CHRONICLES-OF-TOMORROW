import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import logoHorizontal from "../assets/logo-horizontal.png";
import mascotFull from "../assets/mascot.png";
import mascotLeft from "../assets/mascot-left.png";
import mascotRight from "../assets/mascot-right.png";
import { DecorativeStars } from "./DecorativeStars";
import { Ornament } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

function scrollToChronicles() {
  document.getElementById("chronicles")?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* Latar: gradasi radial + vignette */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(111,85,165,0.30), transparent 60%), radial-gradient(ellipse 70% 45% at 50% 108%, rgba(216,174,74,0.10), transparent 60%), linear-gradient(180deg, #0b0721 0%, #120d2e 55%, #0e0926 100%)",
        }}
      />
      <DecorativeStars count={80} sparkles={6} />

      {/* Garis gold dekoratif di pinggir */}
      <div
        className="pointer-events-none absolute inset-x-6 top-24 hidden justify-between lg:flex"
        aria-hidden="true"
      >
        <span className="h-px w-40 bg-gradient-to-r from-gold/40 to-transparent" />
        <span className="h-px w-40 bg-gradient-to-l from-gold/40 to-transparent" />
      </div>

      {/* Maskot owl kiri & kanan (desktop) */}
      <motion.img
        src={mascotLeft}
        alt="OSJUR owl mascot wearing a wizard hat, waving"
        className="pointer-events-none absolute bottom-4 left-2 hidden w-[min(22vw,300px)] animate-float object-contain opacity-95 lg:block xl:left-10"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 0.95, x: 0 }}
        transition={{ duration: 1.2, delay: 0.9, ease }}
      />
      <motion.img
        src={mascotRight}
        alt="OSJUR owl mascot wearing a wizard hat, standing proudly"
        className="pointer-events-none absolute bottom-4 right-2 hidden w-[min(22vw,300px)] animate-float-delayed object-contain opacity-95 lg:block xl:right-10"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.95, x: 0 }}
        transition={{ duration: 1.2, delay: 0.9, ease }}
      />

      {/* Konten utama */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-36">
        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <Sparkle className="h-2.5 w-2.5 text-gold/70 sm:h-3 sm:w-3" fill="currentColor" />
          <p className="font-display text-[9px] tracking-[0.45em] text-gold/90 sm:text-[10px] sm:tracking-[0.55em] md:text-xs">
            THE GRAND CHRONICLE OF
          </p>
          <Sparkle className="h-2.5 w-2.5 text-gold/70 sm:h-3 sm:w-3" fill="currentColor" />
        </motion.div>

        <motion.img
          src={logoHorizontal}
          alt="OSJUR 3.0 — Chronicles of Tomorrow logo"
          className="mt-6 w-full max-w-[180px] object-contain glow-royal sm:mt-8 sm:max-w-[300px] md:max-w-[420px] lg:max-w-[480px]"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease }}
        />

        <Ornament className="mt-6 w-full sm:mt-9" />

        <motion.h1
          className="text-gold-gradient glow-gold mt-6 font-display text-[clamp(2rem,8vw,5.5rem)] font-black leading-none tracking-wide sm:mt-8"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
        >
          OSJUR 3.0
        </motion.h1>

        <motion.p
          className="mt-3 font-display text-[10px] tracking-[0.3em] text-gold/90 sm:mt-4 sm:pl-[0.5em] sm:text-xs sm:tracking-[0.5em] md:text-base lg:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
        >
          CHRONICLES OF TOMORROW
        </motion.p>

        <motion.p
          className="mt-5 max-w-lg px-2 font-serif text-base italic text-mist/90 sm:mt-6 sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
        >
          "Every chapter begins with a story."
        </motion.p>

        <motion.button
          type="button"
          onClick={scrollToChronicles}
          className="group mt-8 min-h-[48px] border border-gold/50 bg-gold/0 px-7 py-3.5 font-display text-[10px] tracking-[0.3em] text-gold transition-all duration-500 hover:bg-gold hover:text-midnight hover:shadow-[0_0_45px_rgba(216,174,74,0.4)] sm:mt-11 sm:px-12 sm:py-4 sm:text-[11px] sm:tracking-[0.35em] sm:text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease }}
        >
          EXPLORE THE CHRONICLES
        </motion.button>

        {/* Maskot penuh (mobile) */}
        <motion.img
          src={mascotFull}
          alt="Two OSJUR owl mascots in wizard outfits"
          className="mt-10 w-32 animate-float object-contain sm:mt-12 sm:w-44 lg:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease }}
        />
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        aria-hidden="true"
      >
        <span className="font-display text-[9px] tracking-[0.45em] text-mist/60">
          SCROLL
        </span>
        <span className="h-10 w-px animate-scroll-cue bg-gradient-to-b from-gold/70 to-transparent" />
      </motion.div>
    </section>
  );
}
