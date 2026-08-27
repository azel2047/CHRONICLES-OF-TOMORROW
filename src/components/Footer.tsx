import logoHorizontal from "../assets/logo-horizontal.png";
import { DecorativeStars } from "./DecorativeStars";

const links = [
  { label: "CHRONICLES", href: "#chronicles" },
  { label: "LEADERS", href: "#leaders" },
  { label: "DIVISIONS", href: "#divisions" },
  { label: "CREW", href: "#crew" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-royal/20 bg-abyss/80 py-10 sm:py-16">
      <DecorativeStars count={26} sparkles={3} className="opacity-70" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
        <img
          src={logoHorizontal}
          alt="OSJUR 3.0 — Chronicles of Tomorrow logo"
          className="mx-auto h-10 w-auto object-contain sm:h-12 md:h-14"
          loading="lazy"
        />

        <p className="mt-4 font-display text-[9px] tracking-[0.35em] text-gold/90 sm:mt-6 sm:text-[11px] sm:tracking-[0.45em]">
          OSJUR 3.0 — CHRONICLES OF TOMORROW
        </p>
        <p className="mt-3 font-serif text-base italic text-mist/75 sm:mt-4 sm:text-lg">
          "Every chapter begins with a story."
        </p>

        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mt-10 sm:gap-x-9 sm:gap-y-3"
          aria-label="Footer"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[9px] tracking-[0.25em] text-mist/70 transition-colors hover:text-gold sm:text-[10px] sm:tracking-[0.3em]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-royal/40 to-transparent sm:mt-10 sm:w-40" aria-hidden="true" />

        <p className="mt-5 font-display text-[8px] tracking-[0.25em] text-mist/45 sm:mt-7 sm:text-[10px] sm:tracking-[0.3em]">
          © 2026 OSJUR 3.0 · ALL CHAPTERS RESERVED
        </p>
      </div>
    </footer>
  );
}
