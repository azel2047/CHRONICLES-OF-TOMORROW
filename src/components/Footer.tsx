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
    <footer className="relative overflow-hidden border-t border-royal/20 bg-abyss/80 py-16">
      <DecorativeStars count={26} sparkles={3} className="opacity-70" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <img
          src={logoHorizontal}
          alt="OSJUR 3.0 — Chronicles of Tomorrow logo"
          className="mx-auto h-12 w-auto object-contain sm:h-14"
          loading="lazy"
        />

        <p className="mt-6 font-display text-[11px] tracking-[0.45em] text-gold/90">
          OSJUR 3.0 — CHRONICLES OF TOMORROW
        </p>
        <p className="mt-4 font-serif text-lg italic text-mist/75">
          "Every chapter begins with a story."
        </p>

        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-x-9 gap-y-3"
          aria-label="Footer"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[10px] tracking-[0.3em] text-mist/70 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-royal/40 to-transparent" aria-hidden="true" />

        <p className="mt-7 font-display text-[10px] tracking-[0.3em] text-mist/45">
          © 2026 OSJUR 3.0 · ALL CHAPTERS RESERVED
        </p>
      </div>
    </footer>
  );
}
