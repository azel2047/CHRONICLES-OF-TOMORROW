import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoHorizontal from "../assets/logo-horizontal.png";
import logoVertical from "../assets/logo-vertical.png";

const links = [
  { label: "CHRONICLES", href: "#chronicles" },
  { label: "LEADERS", href: "#leaders" },
  { label: "DIVISIONS", href: "#divisions" },
  { label: "CREW", href: "#crew" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/20 bg-midnight/80 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <a
            href="#top"
            aria-label="OSJUR 3.0 — back to top"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <img
              src={logoHorizontal}
              alt="OSJUR 3.0 — Chronicles of Tomorrow logo"
              className="h-9 w-auto object-contain sm:h-11"
            />
          </a>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-display text-[12px] tracking-[0.3em] text-mist transition-colors duration-300 hover:text-gold"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded border border-royal/40 text-mist transition-colors hover:border-gold/60 hover:text-gold md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-abyss/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute right-0 top-0 flex h-full w-[80%] max-w-xs flex-col border-l border-gold/25 bg-deep/95 p-8 backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <img
                  src={logoVertical}
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded border border-royal/40 text-mist transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-1" aria-label="Mobile">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-royal/15 py-4 font-display text-sm tracking-[0.35em] text-ivory transition-colors hover:text-gold"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <p className="mt-auto font-serif text-sm italic text-mist/60">
                "Every chapter begins with a story."
              </p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
