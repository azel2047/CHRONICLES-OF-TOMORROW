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
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
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
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-gold/40 bg-gradient-to-b from-deep to-midnight shadow-[0_0_90px_rgba(111,85,165,0.4)]"
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
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-royal/40 bg-midnight/70 text-mist transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-[300px_1fr]">
              <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[480px]">
                <MemberPhoto member={member} className="h-full w-full" eager />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-transparent md:bg-gradient-to-r"
                  aria-hidden="true"
                />
              </div>

              <div className="p-7 sm:p-10">
                <p className="font-display text-[10px] tracking-[0.45em] text-gold/90">
                  CHRONICLE OF
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-ivory sm:text-3xl">
                  {member.name}
                </h3>
                <p className="mt-2 font-serif text-lg italic text-gold/85">
                  "{member.nickname}"
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gold/50 bg-gold/10 px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                    {member.position}
                  </span>
                  <span className="rounded-full border border-royal/50 bg-royal/10 px-4 py-1.5 font-display text-[10px] tracking-[0.25em] text-lavender">
                    {member.division}
                  </span>
                </div>

                {member.quote && (
                  <blockquote className="mt-6 border-l-2 border-gold/50 pl-4 font-serif text-lg italic text-mist/90">
                    "{member.quote}"
                  </blockquote>
                )}

                <dl className="mt-7 space-y-3.5 border-t border-royal/20 pt-6 text-sm">
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
                    <div key={label} className="flex gap-5">
                      <dt className="w-28 shrink-0 pt-0.5 font-display text-[10px] uppercase tracking-[0.25em] text-mist/50">
                        {label}
                      </dt>
                      <dd className="text-ivory/90">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 border-t border-royal/20 pt-6">
                  <p className="font-display text-[10px] tracking-[0.35em] text-gold/90">
                    BIODATA
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist/85">
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
