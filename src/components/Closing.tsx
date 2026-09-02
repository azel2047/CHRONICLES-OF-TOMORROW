import { ArrowUp } from "lucide-react";
import logoVertical from "../assets/logo-vertical.png";
import mascotFull from "../assets/mascot.png";
import { DecorativeStars } from "./DecorativeStars";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";
import { Card3D } from "./parallax/Card3D";

export function Closing() {
  return (
    <section className="relative overflow-hidden py-20 text-center sm:py-28 md:py-36">
      {/* Background Portal Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(111,85,165,0.25), transparent 70%), radial-gradient(ellipse 50% 40% at 50% 60%, rgba(216,174,74,0.1), transparent 60%)",
        }}
      />
      <DecorativeStars count={40} sparkles={4} />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <div className="relative mx-auto w-40 sm:w-52 md:w-64">
            <div
              className="pointer-events-none absolute inset-0 -top-4 rounded-full bg-gradient-to-t from-royal/40 via-gold/20 to-transparent blur-3xl"
              aria-hidden="true"
            />
            <img
              src={mascotFull}
              alt="Two OSJUR owl mascots in wizard outfits"
              className="relative z-10 w-full animate-float object-contain drop-shadow-[0_15px_40px_rgba(111,85,165,0.6)]"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-2xl font-bold leading-tight text-ivory sm:mt-12 sm:text-3xl md:text-4xl lg:text-5xl">
            THE STORY DOESN'T
            <br />
            END HERE.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-xl font-serif text-base italic leading-relaxed text-mist/85 sm:mt-6 sm:text-lg md:text-2xl">
            "Every chapter leaves a mark.
            <br />
            Every person becomes part of the story."
          </p>
        </Reveal>

        <Ornament className="mt-8 sm:mt-10" />

        <Reveal delay={0.3}>
          <div className="relative mx-auto mt-8 flex justify-center sm:mt-12">
            <img
              src={logoVertical}
              alt="OSJUR 3.0 vertical emblem"
              className="h-28 w-auto object-contain glow-royal drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)] sm:h-36 md:h-44"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-8 flex justify-center sm:mt-12">
            <Card3D maxTilt={6} depth={20} scale={1.04} enableGlare={false}>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group relative inline-flex min-h-[48px] items-center gap-3 overflow-hidden rounded-sm border border-gold/60 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 px-8 py-3.5 font-display text-[10px] tracking-[0.3em] text-gold shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-400 hover:border-gold hover:bg-gold hover:text-midnight hover:shadow-[0_0_40px_rgba(216,174,74,0.5)] sm:px-10 sm:py-4 sm:text-[11px] sm:tracking-[0.35em]"
              >
                <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
                <span className="font-bold">BACK TO TOP</span>
              </button>
            </Card3D>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
