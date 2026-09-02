import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkle, ArrowUpRight, Users } from "lucide-react";
import { divisions, divisionIdOf } from "../data/divisions";
import { members, type Member } from "../data/members";
import { SectionHeading } from "./SectionHeading";

interface HorizontalChaptersProps {
  onSelect: (divisionId: string) => void;
}

/**
 * High-Performance Hardware-Accelerated Horizontal Chapters
 * - ONE Sticky Viewport
 * - ONE Horizontal Motion Track (GPU translate3d)
 * - Static lightweight card styling (low compositing & rasterization cost)
 * - Precomputed division members lookup
 * - Lazy & async decoded avatar previews
 */
export function HorizontalChapters({ onSelect }: HorizontalChaptersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(4200);

  // Precompute members mapped by division ID once (zero filtering per render)
  const membersByDivision = useMemo(() => {
    const map: Record<string, Member[]> = {};
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const divId = divisionIdOf(m.division);
      if (!map[divId]) {
        map[divId] = [];
      }
      map[divId].push(m);
    }
    return map;
  }, []);

  // Hitung & cache jarak horizontal saat mount dan resize
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const viewW = window.innerWidth;
        const totalDist = Math.max(0, scrollW - viewW + 120);
        setMaxDistance(totalDist);
      }
    };

    calculateDistance();
    window.addEventListener("resize", calculateDistance, { passive: true });
    return () => window.removeEventListener("resize", calculateDistance);
  }, []);

  // Track progress scroll vertikal murni
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Numeric pixel translation (GPU matrix murni, tanpa layout thrashing)
  const trackX = useTransform(scrollYProgress, [0, 1], [0, -maxDistance]);

  return (
    <section
      ref={containerRef}
      id="divisions"
      className="relative bg-abyss"
      style={{
        height: `calc(100vh + ${maxDistance}px)`,
      }}
    >
      {/* Sticky Viewport yang mengunci layar */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-4 py-8 sm:px-8 sm:py-12">
        {/* Background Haze Statis (Single shared atmospheric background on stage) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(111,85,165,0.18), transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Section Header */}
        <div className="relative z-20 mx-auto w-full max-w-7xl pt-2 text-center sm:pt-4">
          <SectionHeading
            folio="FOLIO III"
            title="THE CHAPTERS"
            subtitle="Scroll down to travel through all 14 divisions of OSJUR 3.0"
          />

          {/* Progress Indicator Bar */}
          <div className="mx-auto mt-4 flex max-w-xs items-center gap-3">
            <span className="font-display text-[9px] tracking-[0.25em] text-gold/70">
              EXP.
            </span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-royal/20 border border-royal/30">
              <motion.div
                className="h-full bg-gradient-to-r from-gold to-goldbright shadow-[0_0_8px_rgba(216,174,74,0.6)]"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>
            <span className="font-display text-[9px] tracking-[0.25em] text-gold/70">
              14 CH.
            </span>
          </div>
        </div>

        {/* ============================================================
            MAIN STAGE: SATU-SATUNYA TRACK YANG BERGERAK SECARA GPU TRANSLATE
            ============================================================ */}
        <div className="relative z-10 my-auto flex w-full items-center">
          <motion.div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 lg:gap-10 pl-4 sm:pl-12 lg:pl-20 will-change-transform"
            style={{ x: trackX }}
          >
            {divisions.map((division, idx) => {
              const Icon = division.icon;
              const isCouncil = division.id === "sc" || division.id === "po";
              const divisionMembers = membersByDivision[division.id] ?? [];
              const previewMembers = divisionMembers.slice(0, 3);
              const extraCount = divisionMembers.length - previewMembers.length;

              return (
                <div
                  key={division.id}
                  onClick={() => onSelect(division.id)}
                  className="w-[85vw] max-w-[380px] shrink-0 sm:w-[420px] lg:w-[460px] cursor-pointer"
                >
                  <div
                    className={`group relative flex h-[380px] sm:h-[420px] flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-8 transition-transform duration-300 sm:hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)] ${
                      isCouncil
                        ? "border-gold/50 bg-gradient-to-b from-[#25174e] via-[#180e38] to-[#0c0620] hover:border-goldbright"
                        : "border-royal/35 bg-gradient-to-b from-[#1c1240] via-[#130b30] to-[#0a051c] hover:border-gold/70"
                    }`}
                  >
                    {/* Card Content Top */}
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3.5 py-1 font-display text-[10px] font-bold tracking-widest uppercase border ${
                            isCouncil
                              ? "border-gold/60 bg-gold/20 text-goldbright"
                              : "border-royal/50 bg-royal/25 text-gold/95"
                          }`}
                        >
                          {isCouncil
                            ? "HIGH COUNCIL"
                            : `CHAPTER ${String(idx + 1).padStart(2, "0")}`}
                        </span>

                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                            isCouncil
                              ? "border-gold/60 bg-gold/15 text-goldbright group-hover:bg-gold group-hover:text-midnight"
                              : "border-royal/45 bg-[#251854]/80 text-lavender group-hover:border-gold/70 group-hover:bg-gold group-hover:text-midnight"
                          }`}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </div>
                      </div>

                      <h3 className="mt-5 font-display text-xl font-bold tracking-wide text-ivory transition-colors duration-200 group-hover:text-goldbright sm:text-2xl">
                        {division.name}
                      </h3>

                      <p className="mt-3 text-xs leading-relaxed text-mist/85 font-sans sm:text-sm">
                        {division.description}
                      </p>
                    </div>

                    {/* Card Content Bottom: Member Avatars + Link */}
                    <div className="border-t border-royal/30 pt-4">
                      <div className="flex items-center justify-between">
                        {/* Avatars Stack */}
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2.5 overflow-hidden">
                            {previewMembers.map((m) => (
                              <div
                                key={m.id}
                                className="inline-block h-8 w-8 rounded-full border border-gold/50 bg-deep overflow-hidden ring-2 ring-[#150d36]"
                                title={`${m.name} (${m.position})`}
                              >
                                {m.photo ? (
                                  <img
                                    src={m.photo}
                                    alt={m.name}
                                    width={32}
                                    height={32}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-royal/40 text-[10px] font-bold text-gold">
                                    {m.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                            ))}
                            {extraCount > 0 && (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-royal/40 text-[10px] font-bold text-ivory ring-2 ring-[#150d36]">
                                +{extraCount}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-mist/80">
                            <Users className="h-3.5 w-3.5 text-gold/90" />
                            <span>{divisionMembers.length} Personel</span>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1 font-display text-xs font-bold tracking-wider text-gold transition-all duration-300 group-hover:text-goldbright group-hover:translate-x-1">
                          <span>Jelajahi</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer Sparkle Cue */}
        <div className="pointer-events-none mx-auto flex items-center gap-2 text-gold/60 opacity-60">
          <Sparkle className="h-3 w-3" fill="currentColor" />
          <span className="font-display text-[9px] tracking-[0.3em]">
            SCROLL TO CONTINUE STORY
          </span>
          <Sparkle className="h-3 w-3" fill="currentColor" />
        </div>
      </div>
    </section>
  );
}
