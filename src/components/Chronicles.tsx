import { divisions } from "../data/divisions";
import { members } from "../data/members";
import { DecorativeStars } from "./DecorativeStars";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const stats = [
  { value: String(members.length), label: "CREW" },
  { value: String(divisions.length), label: "DIVISIONS" },
  { value: "1", label: "JOURNEY" },
];

export function Chronicles() {
  return (
    <section
      id="chronicles"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-24 md:py-32"
    >
      <DecorativeStars count={24} sparkles={2} className="opacity-60" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              folio="FOLIO I"
              title="THE CHRONICLES"
              subtitle='"Every journey has a story. Every story has its people."'
            />

            <Reveal delay={0.15} className="mt-6 space-y-4 text-sm leading-relaxed text-mist/85 sm:mt-8 sm:space-y-5 sm:text-base">
              <p>
                <span className="font-display text-gold">OSJUR 3.0 — Chronicles of
                Tomorrow</span> is a gathering of devoted souls who believe that
                every beginning deserves a grand telling. Bound by a single
                purpose, this committee stands as the keeper of this year's
                chapter — writing it together, one moment at a time.
              </p>
              <p>
                Behind every ceremony, every stage, and every spark of wonder,
                there stands a full council of chapters — each with its own
                craft, its own oath, and its own story to write into the annals
                of OSJUR.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <blockquote className="mt-7 border-l-2 border-gold/60 pl-4 font-serif text-base italic text-ivory/90 sm:mt-9 sm:pl-5 sm:text-lg md:text-xl">
                "We do not wait for tomorrow. We write it."
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="relative rounded-xl border border-gold/25 bg-deep/40 p-5 backdrop-blur-sm sm:p-8 md:p-10">
              {/* Sudut ornamen */}
              <span className="absolute left-2 top-2 h-4 w-4 border-l border-t border-gold/60" aria-hidden="true" />
              <span className="absolute right-2 top-2 h-4 w-4 border-r border-t border-gold/60" aria-hidden="true" />
              <span className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-gold/60" aria-hidden="true" />
              <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-gold/60" aria-hidden="true" />

              <p className="text-center font-display text-[9px] tracking-[0.35em] text-gold/80 sm:text-[10px] sm:tracking-[0.45em]">
                THE ANNALS RECORD
              </p>

              <dl className="mt-2 divide-y divide-royal/20">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center py-5 sm:py-7">
                    <dd className="text-gold-gradient glow-gold font-display text-4xl font-black leading-none sm:text-6xl md:text-7xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-2 font-display text-[9px] tracking-[0.35em] text-mist/75 sm:mt-3 sm:text-[11px] sm:tracking-[0.45em]">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
