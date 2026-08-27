import { ArrowUp } from "lucide-react";
import logoVertical from "../assets/logo-vertical.png";
import mascotFull from "../assets/mascot.png";
import { DecorativeStars } from "./DecorativeStars";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function Closing() {
  return (
    <section className="relative overflow-hidden py-20 text-center sm:py-28 md:py-36">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(111,85,165,0.18), transparent 65%)",
        }}
      />
      <DecorativeStars count={40} sparkles={4} />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <img
            src={mascotFull}
            alt="Two OSJUR owl mascots in wizard outfits"
            className="mx-auto w-40 animate-float object-contain drop-shadow-[0_0_40px_rgba(111,85,165,0.45)] sm:w-52 md:w-64"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-2xl leading-tight text-ivory sm:mt-12 sm:text-3xl md:text-4xl lg:text-5xl">
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
          <img
            src={logoVertical}
            alt="OSJUR 3.0 vertical emblem"
            className="mx-auto mt-8 h-28 w-auto object-contain glow-royal sm:mt-12 sm:h-36 md:h-44"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={0.4}>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 inline-flex min-h-[48px] items-center gap-3 border border-gold/50 px-7 py-3.5 font-display text-[10px] tracking-[0.3em] text-gold transition-all duration-500 hover:bg-gold hover:text-midnight hover:shadow-[0_0_45px_rgba(216,174,74,0.4)] sm:mt-12 sm:px-9 sm:py-4 sm:text-[11px] sm:tracking-[0.35em]"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            BACK TO TOP
          </button>
        </Reveal>
      </div>
    </section>
  );
}
