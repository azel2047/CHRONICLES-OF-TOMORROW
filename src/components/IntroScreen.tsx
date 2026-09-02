import { useCallback, useEffect, useRef, useState } from "react";

export function IntroScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get("intro") === "1" || params.get("intro") === "true") {
      return true;
    }
    return sessionStorage.getItem("osjur_intro_seen") !== "true";
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFinish = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      sessionStorage.setItem("osjur_intro_seen", "true");
    } catch {
      // Ignore sessionStorage exceptions in private mode
    }

    // Smooth cinematic fade out
    window.setTimeout(() => {
      setIsVisible(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
      document.body.style.overflow = "";
    }, 950);
  }, [isExiting]);

  useEffect(() => {
    if (!isVisible) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      handleFinish();
      return;
    }

    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setAutoplayBlocked(true);
        });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible, handleFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#0b071d] transition-all duration-1000 ease-out ${
        isExiting ? "pointer-events-none scale-[1.03] opacity-0" : "scale-100 opacity-100"
      }`}
      style={{ isolation: "isolate" }}
      aria-label="Cinematic Intro"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/intro/sombilis-web.mp4"
        poster="/intro/poster.webp"
        muted
        playsInline
        autoPlay
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
        onEnded={handleFinish}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Subtle Cinematic Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b071d]/60 via-transparent to-[#0b071d]/40" />

      {/* Loading Placeholder */}
      {!isLoaded && !autoplayBlocked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0b071d]">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
            <span className="font-cinzel text-xs font-bold tracking-widest text-gold">III</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-ivory/90">
              OSJUR 3.0
            </span>
            <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-gold/60">
              Chronicles of Tomorrow
            </span>
          </div>
        </div>
      )}

      {/* Skip Button */}
      {!isExiting && (
        <div className="fixed top-5 right-5 z-[100000] sm:top-8 sm:right-8">
          <button
            type="button"
            onClick={handleFinish}
            className="group flex items-center gap-2 rounded-full border border-gold/30 bg-black/40 px-4 py-2 text-xs font-cinzel tracking-widest text-ivory/90 backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/15 hover:text-gold hover:shadow-[0_0_20px_rgba(230,175,46,0.35)] active:scale-95"
            aria-label="Skip Intro"
          >
            <span>SKIP INTRO</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      )}

      {/* Autoplay Fallback Prompt */}
      {autoplayBlocked && !isExiting && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0b071d]/85 p-6 backdrop-blur-md">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold shadow-[0_0_25px_rgba(230,175,46,0.3)]">
              <span className="font-cinzel text-sm font-bold">III</span>
            </div>
            <h2 className="font-cinzel text-xl font-bold tracking-wider text-ivory sm:text-2xl">
              CHRONICLES OF TOMORROW
            </h2>
            <p className="font-inter text-xs text-ivory/60 tracking-wider">
              The chronicle is ready to unfold.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setAutoplayBlocked(false);
              const video = videoRef.current;
              if (video) {
                video.play().catch(() => handleFinish());
              } else {
                handleFinish();
              }
            }}
            className="group flex items-center gap-3 rounded-full border border-gold/60 bg-gradient-to-r from-gold/20 to-gold/10 px-8 py-3.5 text-xs sm:text-sm font-cinzel font-semibold tracking-widest text-gold shadow-[0_0_30px_rgba(230,175,46,0.3)] transition-all duration-300 hover:border-gold hover:bg-gold hover:text-midnight hover:shadow-[0_0_40px_rgba(230,175,46,0.6)] active:scale-95"
          >
            <span>ENTER THE CHRONICLES</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
