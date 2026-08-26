import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { allChapterTabs, divisionIdOf } from "../data/divisions";
import { members } from "../data/members";
import type { Member } from "../data/members";
import mascotFull from "../assets/mascot.png";
import { MemberCard } from "./MemberCard";
import { SearchBar } from "./SearchBar";
import { SectionHeading } from "./SectionHeading";

interface MemberShowcaseProps {
  filter: string;
  onFilterChange: (divisionId: string) => void;
  onViewProfile: (member: Member) => void;
}

export function MemberShowcase({
  filter,
  onFilterChange,
  onViewProfile,
}: MemberShowcaseProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      const inDivision = filter === "all" || divisionIdOf(m.division) === filter;
      const matchesQuery =
        q === "" ||
        m.name.toLowerCase().includes(q) ||
        m.nickname.toLowerCase().includes(q) ||
        m.position.toLowerCase().includes(q) ||
        m.division.toLowerCase().includes(q);
      return inDivision && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section
      id="crew"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(111,85,165,0.12), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          folio="FOLIO IV"
          title="THE CREW"
          subtitle="Every name inscribed in the chronicle."
        />

        <div className="mt-12">
          <SearchBar value={query} onChange={setQuery} />

          <div
            className="mt-8 flex flex-wrap justify-center gap-2.5"
            role="group"
            aria-label="Filter members by division"
          >
            {allChapterTabs.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onFilterChange(tab.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 font-display text-[10px] tracking-[0.22em] transition-all duration-300 sm:text-[11px] ${
                    active
                      ? "border-gold bg-gold/10 text-gold shadow-[0_0_20px_rgba(216,174,74,0.25)]"
                      : "border-royal/30 text-mist/75 hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <p className="mt-7 text-center font-display text-[10px] tracking-[0.35em] text-mist/50">
            SHOWING {filtered.length} OF {members.length} NAMES
          </p>
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((member, i) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
              >
                <MemberCard member={member} onViewProfile={onViewProfile} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center py-14 text-center">
              <img
                src={mascotFull}
                alt="Two OSJUR owl mascots looking curious"
                className="w-40 animate-float object-contain opacity-90"
                loading="lazy"
              />
              <p className="mt-8 font-serif text-xl italic text-mist/80 sm:text-2xl">
                "No names found in the chronicles..."
              </p>
              <p className="mt-2 text-sm text-mist/55">
                Try another name, nickname, position, or division.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  onFilterChange("all");
                }}
                className="mt-7 border border-gold/50 px-7 py-3 font-display text-[10px] tracking-[0.3em] text-gold transition-all duration-300 hover:bg-gold hover:text-midnight"
              >
                RESET THE SEARCH
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
