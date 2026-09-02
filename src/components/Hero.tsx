import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Sparkle } from "lucide-react";
import mascotLeft from "../assets/mascot-left.png";
import mascotRight from "../assets/mascot-right.png";
import { Ornament } from "./Ornament";
import { InteractiveLighting } from "./parallax/InteractiveLighting";
import { ParticleField } from "./parallax/ParticleField";

const easeCustom = [0.22, 1, 0.36, 1] as const;

function scrollToChronicles() {
  document.getElementById("chronicles")?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ── Desktop Raw Motion Values (-1 to 1) ─────────────────
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // ── Desktop Smooth Spring Interpolation (Damped Lerp) ────
  const springConfig = { damping: 28, stiffness: 110, mass: 0.5 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  // ── Desktop 3D Scene Tilt (subtle ±2deg X, ±3deg Y) ──────
  const rotateX = useTransform(smoothY, [-1, 1], [2, -2]);
  const rotateY = useTransform(smoothX, [-1, 1], [-3, 3]);

  // ── Desktop Layer Translation Parallax ───────────────────
  const titleX = useTransform(smoothX, [-1, 1], [-26, 26]);
  const titleY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const textX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const textY = useTransform(smoothY, [-1, 1], [-15, 15]);
  const ctaX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const ctaY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const mascotLeftX = useTransform(smoothX, [-1, 1], [-42, 42]);
  const mascotLeftY = useTransform(smoothY, [-1, 1], [-30, 30]);
  const mascotLeftRotate = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);
  const mascotRightX = useTransform(smoothX, [-1, 1], [-42, 42]);
  const mascotRightY = useTransform(smoothY, [-1, 1], [-30, 30]);
  const mascotRightRotate = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);

  // ── Mobile 2.5D Scroll-Driven Depth (Pure MotionValues, 0 React State) ──
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const mobileBgY = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const mobileBrandingY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const mobileContentY = useTransform(scrollYProgress, [0, 1], [0, -26]);

  // Mobile Foreground 3D Mascots (Step forward towards viewer on scroll)
  const mobileLeftMascotZ = useTransform(scrollYProgress, [0, 1], [75, 140]);
  const mobileLeftMascotY = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const mobileLeftMascotScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const mobileRightMascotZ = useTransform(scrollYProgress, [0, 1], [105, 175]);
  const mobileRightMascotY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const mobileRightMascotScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  // ── Device & Motion Preferences ──────────────────────────
  useEffect(() => {
    const checkDevice = () => {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 1024;
      setIsTouchDevice(isTouch);

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setPrefersReducedMotion(reduced);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // ── Mouse Move Handler on Hero Scene ─────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice || prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

    rawMouseX.set(Math.max(-1, Math.min(1, x)));
    rawMouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  const enable3D = !isTouchDevice && !prefersReducedMotion;

  return (
    <section
      ref={heroRef}
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
      style={{
        perspective: "1000px",
      }}
    >
      {/* ============================================================
          LAYER 1 (BACK): GRADIENT BACKGROUND + INTERACTIVE LIGHTING
          ============================================================ */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={
          isTouchDevice
            ? {
                y: mobileBgY,
                background:
                  "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(111,85,165,0.35), transparent 60%), radial-gradient(ellipse 70% 45% at 50% 108%, rgba(216,174,74,0.12), transparent 60%), linear-gradient(180deg, #0b0721 0%, #120d2e 55%, #0e0926 100%)",
              }
            : {
                background:
                  "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(111,85,165,0.35), transparent 60%), radial-gradient(ellipse 70% 45% at 50% 108%, rgba(216,174,74,0.12), transparent 60%), linear-gradient(180deg, #0b0721 0%, #120d2e 55%, #0e0926 100%)",
              }
        }
      />

      {/* Interactive Aura Lighting */}
      <InteractiveLighting
        smoothX={smoothX}
        smoothY={smoothY}
        isTouch={isTouchDevice || prefersReducedMotion}
      />

      {/* Decorative Gold Side Borders */}
      <div
        className="pointer-events-none absolute inset-x-6 top-24 hidden justify-between lg:flex"
        aria-hidden="true"
      >
        <span className="h-px w-40 bg-gradient-to-r from-gold/40 to-transparent" />
        <span className="h-px w-40 bg-gradient-to-l from-gold/40 to-transparent" />
      </div>

      {/* ============================================================
          LAYER 2 (MIDDLE-BACK): DUAL-PLANE PARTICLES & CONSTELLATIONS
          ============================================================ */}
      <ParticleField
        smoothX={smoothX}
        smoothY={smoothY}
        isTouch={isTouchDevice || prefersReducedMotion}
      />

      {/* ============================================================
          LAYER 3 & 4 (MIDDLE & FRONT): 3D PARALLAX STAGE CONTAINER
          ============================================================ */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8 will-change-transform"
        style={{
          transformStyle: enable3D ? "preserve-3d" : "flat",
          rotateX: enable3D ? rotateX : 0,
          rotateY: enable3D ? rotateY : 0,
        }}
      >
        {/* ── LEFT OWL MASCOT (DESKTOP FRONT LAYER) ────────────── */}
        <motion.div
          className="pointer-events-none absolute bottom-[-10px] left-0 hidden lg:block xl:left-8 2xl:left-14"
          style={{
            transformStyle: enable3D ? "preserve-3d" : "flat",
            translateZ: enable3D ? 70 : 0,
            x: enable3D ? mascotLeftX : 0,
            y: enable3D ? mascotLeftY : 0,
            rotateZ: enable3D ? mascotLeftRotate : 0,
          }}
        >
          <motion.img
            src={mascotLeft}
            alt="OSJUR owl wizard mascot waving"
            className="w-[min(23vw,310px)] animate-float object-contain opacity-95 drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] drop-shadow-[0_0_30px_rgba(111,85,165,0.4)]"
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 0.95, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.85, ease: easeCustom }}
          />
        </motion.div>

        {/* ── RIGHT OWL MASCOT (DESKTOP FRONT LAYER) ───────────── */}
        <motion.div
          className="pointer-events-none absolute bottom-[-10px] right-0 hidden lg:block xl:right-8 2xl:right-14"
          style={{
            transformStyle: enable3D ? "preserve-3d" : "flat",
            translateZ: enable3D ? 70 : 0,
            x: enable3D ? mascotRightX : 0,
            y: enable3D ? mascotRightY : 0,
            rotateZ: enable3D ? mascotRightRotate : 0,
          }}
        >
          <motion.img
            src={mascotRight}
            alt="OSJUR owl wizard mascot standing proudly"
            className="w-[min(23vw,310px)] animate-float-delayed object-contain opacity-95 drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] drop-shadow-[0_0_30px_rgba(216,174,74,0.35)]"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 0.95, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.85, ease: easeCustom }}
          />
        </motion.div>

        {/* ── CENTER CORE CONTENT (MIDDLE LAYER) ───────────────── */}
        <motion.div
          className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-36"
          style={{
            transformStyle: enable3D ? "preserve-3d" : "flat",
          }}
        >
          {/* Top Pre-title Banner (Layer 3: Branding) */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            style={{
              transformStyle: enable3D ? "preserve-3d" : "flat",
              translateZ: enable3D ? 20 : 0,
              y: isTouchDevice ? mobileBrandingY : 0,
            }}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: easeCustom }}
          >
            <Sparkle className="h-2.5 w-2.5 text-gold/80 sm:h-3 sm:w-3" fill="currentColor" />
            <p className="font-display text-[9px] tracking-[0.45em] text-gold/90 sm:text-[10px] sm:tracking-[0.55em] md:text-xs">
              THE GRAND CHRONICLE OF
            </p>
            <Sparkle className="h-2.5 w-2.5 text-gold/80 sm:h-3 sm:w-3" fill="currentColor" />
          </motion.div>

          {/* Gold Diamond Ornament (Layer 3: Branding) */}
          <motion.div
            className="mt-4 w-full sm:mt-6"
            style={{
              transformStyle: enable3D ? "preserve-3d" : "flat",
              translateZ: enable3D ? 25 : 0,
              y: isTouchDevice ? mobileBrandingY : 0,
            }}
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: easeCustom }}
          >
            <Ornament className="w-full" />
          </motion.div>

          {/* Monumental Hero Heading: OSJUR 3.0 (Layer 4: Main Content) */}
          <motion.h1
            className="text-gold-gradient glow-gold mt-6 font-display text-[clamp(2.2rem,8vw,5.5rem)] font-black leading-none tracking-wide sm:mt-8"
            style={{
              transformStyle: enable3D ? "preserve-3d" : "flat",
              translateZ: enable3D ? 50 : 0,
              x: enable3D ? titleX : 0,
              y: enable3D ? titleY : isTouchDevice ? mobileContentY : 0,
              textShadow:
                "0 4px 12px rgba(0,0,0,0.85), 0 0 45px rgba(216,174,74,0.45)",
            }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: easeCustom }}
          >
            OSJUR 3.0
          </motion.h1>

          {/* Subtitle (Layer 4: Main Content) */}
          <motion.p
            className="mt-3 font-display text-[10px] tracking-[0.3em] text-gold/90 sm:mt-4 sm:pl-[0.5em] sm:text-xs sm:tracking-[0.5em] md:text-base lg:text-lg"
            style={{
              transformStyle: enable3D ? "preserve-3d" : "flat",
              translateZ: enable3D ? 30 : 0,
              x: enable3D ? textX : 0,
              y: enable3D ? textY : isTouchDevice ? mobileContentY : 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.8, ease: easeCustom }}
          >
            CHRONICLES OF TOMORROW
          </motion.p>

          {/* Story Quote (Layer 4: Main Content) */}
          <motion.p
            className="mt-5 max-w-lg px-2 font-serif text-base italic text-mist/90 sm:mt-6 sm:text-xl md:text-2xl"
            style={{
              transformStyle: enable3D ? "preserve-3d" : "flat",
              translateZ: enable3D ? 25 : 0,
              x: enable3D ? textX : 0,
              y: enable3D ? textY : isTouchDevice ? mobileContentY : 0,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.95, ease: easeCustom }}
          >
            "Every chapter begins with a story."
          </motion.p>

          {/* 3D Elevated CTA Button (Layer 4: Main Content) */}
          <motion.div
            style={{
              transformStyle: enable3D ? "preserve-3d" : "flat",
              translateZ: enable3D ? 55 : 0,
              x: enable3D ? ctaX : 0,
              y: enable3D ? ctaY : isTouchDevice ? mobileContentY : 0,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: easeCustom }}
          >
            <motion.button
              type="button"
              onClick={scrollToChronicles}
              whileHover={{
                scale: 1.035,
                y: -2,
                boxShadow:
                  "0 0 35px rgba(216,174,74,0.5), 0 14px 28px rgba(0,0,0,0.55)",
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              className="group relative mt-8 min-h-[48px] overflow-hidden rounded-sm border border-gold/60 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 px-8 py-3.5 font-display text-[10px] tracking-[0.3em] text-gold transition-colors duration-400 hover:border-gold hover:bg-gold hover:text-midnight sm:mt-11 sm:px-12 sm:py-4 sm:text-[11px] sm:tracking-[0.35em] sm:text-xs"
            >
              {/* Subtle shining light sweep */}
              <span className="pointer-events-none absolute -inset-full top-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
              <span className="relative z-10 font-bold">EXPLORE THE CHRONICLES</span>
            </motion.button>
          </motion.div>

          {/* Mobile Foreground Mascots (Layer 5: Foreground 3D Centerpiece) */}
          <motion.div
            className="relative z-40 mt-6 flex w-[88vw] max-w-[380px] items-end justify-center -space-x-5 sm:mt-8 sm:max-w-[440px] sm:-space-x-8 lg:hidden"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Subtle ground aura glow (static radial gradient, 0% CPU cost) */}
            <div
              className="pointer-events-none absolute -bottom-4 h-16 w-56 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(216,174,74,0.4), transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Left Mascot: Layered at translateZ ~75px with slight -4deg tilt */}
            <motion.div
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                translateZ: isTouchDevice ? mobileLeftMascotZ : 75,
                y: isTouchDevice ? mobileLeftMascotY : 0,
                scale: isTouchDevice ? mobileLeftMascotScale : 1,
                rotateY: -4,
              }}
            >
              <motion.img
                src={mascotLeft}
                alt="OSJUR owl wizard mascot waving"
                className="w-[42vw] max-w-[175px] animate-float object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_25px_rgba(111,85,165,0.45)] sm:max-w-[210px]"
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: easeCustom }}
              />
            </motion.div>

            {/* Right Mascot: Closer to viewer at translateZ ~105px with slight +4deg tilt */}
            <motion.div
              className="relative z-10"
              style={{
                transformStyle: "preserve-3d",
                translateZ: isTouchDevice ? mobileRightMascotZ : 105,
                y: isTouchDevice ? mobileRightMascotY : 0,
                scale: isTouchDevice ? mobileRightMascotScale : 1.02,
                rotateY: 4,
              }}
            >
              <motion.img
                src={mascotRight}
                alt="OSJUR owl wizard mascot standing proudly"
                className="w-[42vw] max-w-[175px] animate-float-delayed object-contain drop-shadow-[0_22px_38px_rgba(0,0,0,0.95)] drop-shadow-[0_0_25px_rgba(216,174,74,0.45)] sm:max-w-[210px]"
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: easeCustom }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ============================================================
          SCROLL CUE
          ============================================================ */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
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
