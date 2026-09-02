import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { DecorativeStars } from "./DecorativeStars";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Sparkle, Feather } from "lucide-react";

const fullText1 =
  "OSJUR 3.0 — Chronicles of Tomorrow is a gathering of devoted souls who believe that every beginning deserves a grand telling. Bound by a single purpose, this committee stands as the keeper of this year's chapter — writing it together, one moment at a time.";

const fullText2 =
  "Behind every ceremony, every stage, and every spark of wonder, there stands a full council of chapters — each with its own craft, its own oath, and its own story to write into the annals of OSJUR.";

const fullQuote = "We do not wait for tomorrow. We write it.";

export function Chronicles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let idx1 = 0;
    let idx2 = 0;
    let idxQuote = 0;

    // Stage 1: Ketik Paragraf 1
    const timer1 = setInterval(() => {
      idx1++;
      if (idx1 <= fullText1.length) {
        setDisplayedText1(fullText1.slice(0, idx1));
      } else {
        clearInterval(timer1);

        // Stage 2: Jeda sebentar lalu ketik Paragraf 2
        setTimeout(() => {
          const timer2 = setInterval(() => {
            idx2++;
            if (idx2 <= fullText2.length) {
              setDisplayedText2(fullText2.slice(0, idx2));
            } else {
              clearInterval(timer2);

              // Stage 3: Jeda sebentar lalu ketik Quote
              setTimeout(() => {
                const timerQuote = setInterval(() => {
                  idxQuote++;
                  if (idxQuote <= fullQuote.length) {
                    setDisplayedQuote(fullQuote.slice(0, idxQuote));
                  } else {
                    clearInterval(timerQuote);
                    setIsTypingComplete(true);
                  }
                }, 28);
              }, 250);
            }
          }, 16);
        }, 200);
      }
    }, 16);

    return () => {
      clearInterval(timer1);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="chronicles"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-24 md:py-32"
    >
      {/* Background Atmosphere Transition */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 20%, rgba(111,85,165,0.22), transparent 65%), radial-gradient(ellipse 50% 30% at 80% 80%, rgba(216,174,74,0.08), transparent 60%)",
        }}
      />

      <DecorativeStars count={24} sparkles={2} className="opacity-60" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center">
          <SectionHeading
            align="center"
            folio="FOLIO I"
            title="THE CHRONICLES"
            subtitle='"Every journey has a story. Every story has its people."'
          />
        </div>

        {/* Full-width Storyboard with Typewriter Manuscript */}
        <div className="relative mt-8 rounded-3xl border border-gold/30 bg-gradient-to-b from-[#1c1340]/90 via-[#130b2c]/90 to-[#0b051e]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.65)] sm:mt-12 sm:p-10 md:p-14">
          {/* Ornamen Sudut Brass Arkana */}
          <span
            className="absolute left-3.5 top-3.5 h-4 w-4 border-l-2 border-t-2 border-gold/70 shadow-[0_0_10px_rgba(216,174,74,0.4)]"
            aria-hidden="true"
          />
          <span
            className="absolute right-3.5 top-3.5 h-4 w-4 border-r-2 border-t-2 border-gold/70 shadow-[0_0_10px_rgba(216,174,74,0.4)]"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-3.5 left-3.5 h-4 w-4 border-b-2 border-l-2 border-gold/70 shadow-[0_0_10px_rgba(216,174,74,0.4)]"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-3.5 right-3.5 h-4 w-4 border-b-2 border-r-2 border-gold/70 shadow-[0_0_10px_rgba(216,174,74,0.4)]"
            aria-hidden="true"
          />

          {/* Header Naskah Arkana */}
          <div className="mb-6 flex items-center justify-between border-b border-royal/30 pb-4 text-gold/75 sm:mb-8">
            <div className="flex items-center gap-2 font-display text-[10px] tracking-[0.3em] uppercase text-gold/90 sm:text-xs">
              <Feather className="h-4 w-4 text-gold" />
              <span>THE LIVING MANUSCRIPT</span>
            </div>
            <div className="flex items-center gap-1.5 font-display text-[9px] tracking-[0.25em] text-gold/60">
              <Sparkle className="h-3 w-3" fill="currentColor" />
              <span>RECORD OF 2026</span>
            </div>
          </div>

          {/* Teks Animasi Mengetik (Typewriter) */}
          <div className="space-y-5 text-base leading-relaxed text-mist/95 sm:space-y-6 sm:text-lg md:text-xl md:leading-loose font-serif">
            <p className="min-h-[4rem]">
              <span className="font-display font-bold text-gold">
                {displayedText1.slice(0, 39)}
              </span>
              {displayedText1.slice(39)}
              {displayedText1.length < fullText1.length && (
                <span className="inline-block w-2.5 translate-y-0.5 animate-pulse font-sans font-bold text-goldbright">
                  |
                </span>
              )}
            </p>

            {displayedText1.length >= fullText1.length && (
              <p className="min-h-[4rem]">
                {displayedText2}
                {displayedText2.length < fullText2.length && (
                  <span className="inline-block w-2.5 translate-y-0.5 animate-pulse font-sans font-bold text-goldbright">
                    |
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Quote Mengetik */}
          {displayedText2.length >= fullText2.length && (
            <Reveal delay={0.1}>
              <blockquote className="relative mt-8 border-l-2 border-gold/70 pl-5 font-serif text-lg italic text-ivory/95 sm:mt-10 sm:pl-6 sm:text-xl md:text-2xl">
                <Sparkle
                  className="absolute -left-2.5 -top-3 h-4 w-4 text-gold animate-pulse-soft"
                  fill="currentColor"
                />
                "{displayedQuote}"
                {!isTypingComplete && (
                  <span className="inline-block w-2.5 translate-y-0.5 animate-pulse font-sans font-bold text-goldbright">
                    |
                  </span>
                )}
              </blockquote>
            </Reveal>
          )}

          {/* Selesai Mengetik: Cap Tinta Arkana */}
          {isTypingComplete && (
            <div className="mt-8 flex items-center justify-end gap-2 border-t border-royal/20 pt-4 text-right sm:mt-10">
              <span className="font-display text-[9px] tracking-[0.35em] text-gold/70 uppercase sm:text-[10px]">
                ✦ INSCRIBED IN THE ARCHIVES ✦
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
