import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Member } from "../data/members";
import { MemberPhoto } from "./MemberPhoto";

interface MemberModalProps {
  member: Member | null;
  onClose: () => void;
}

export function MemberModal({ member, onClose }: MemberModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!member) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-abyss/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Profile of ${member.name}`}
            className="relative flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-gold/40 bg-gradient-to-b from-deep to-midnight shadow-[0_0_90px_rgba(111,85,165,0.4)] sm:max-h-[88vh]"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close profile"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-royal/40 bg-midnight/70 text-mist transition-colors hover:border-gold hover:text-gold sm:right-4 sm:top-4"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col overflow-y-auto md:grid md:grid-cols-[300px_1fr]">
              <div className="relative aspect-[3/4] w-full shrink-0 sm:aspect-[4/5] md:aspect-auto md:min-h-[480px]">
                <MemberPhoto member={member} className="h-full w-full" eager />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-transparent md:bg-gradient-to-r"
                  aria-hidden="true"
                />
              </div>

              <div className="p-5 sm:p-7 md:p-10">
                <p className="font-display text-[9px] tracking-[0.35em] text-gold/90 sm:text-[10px] sm:tracking-[0.45em]">
                  CHRONICLE OF
                </p>
                <h3 className="mt-2 font-display text-xl leading-tight text-ivory sm:mt-3 sm:text-2xl md:text-3xl">
                  {member.name}
                </h3>
                <p className="mt-1.5 font-serif text-base italic text-gold/85 sm:mt-2 sm:text-lg">
                  "{member.nickname}"
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                  <span className="rounded-full border border-gold/50 bg-gold/10 px-3 py-1 font-display text-[8px] uppercase tracking-[0.2em] text-gold sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.25em]">
                    {member.position}
                  </span>
                  <span className="rounded-full border border-royal/50 bg-royal/10 px-3 py-1 font-display text-[8px] tracking-[0.2em] text-lavender sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.25em]">
                    {member.division}
                  </span>
                </div>

                {member.quote && (
                  <blockquote className="mt-4 border-l-2 border-gold/50 pl-3 font-serif text-base italic text-mist/90 sm:mt-6 sm:pl-4 sm:text-lg">
                    "{member.quote}"
                  </blockquote>
                )}

                <dl className="mt-5 space-y-3 border-t border-royal/20 pt-5 text-xs sm:mt-7 sm:space-y-3.5 sm:pt-6 sm:text-sm">
                  {(
                    [
                      ["Nama Lengkap", member.name],
                      ["Nama Panggilan", member.nickname],
                      ["Jabatan", member.position],
                      ["Divisi", member.division],
                      ["Angkatan", member.generation],
                      ["Domisili", member.domicile],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="flex gap-3 sm:gap-5">
                      <dt className="w-20 shrink-0 pt-0.5 font-display text-[8px] uppercase tracking-[0.2em] text-mist/50 sm:w-28 sm:text-[10px] sm:tracking-[0.25em]">
                        {label}
                      </dt>
                      <dd className="text-ivory/90">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 border-t border-royal/20 pt-5 sm:mt-6 sm:pt-6">
                  <p className="font-display text-[9px] tracking-[0.3em] text-gold/90 sm:text-[10px] sm:tracking-[0.35em]">
                    BIODATA
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-mist/85 sm:mt-3 sm:text-sm">
                    {member.bio ?? "Profile details coming soon."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
