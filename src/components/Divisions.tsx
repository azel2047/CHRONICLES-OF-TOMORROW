import { divisions } from "../data/divisions";
import { divisionIdOf } from "../data/divisions";
import { members } from "../data/members";
import { DivisionCard } from "./DivisionCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface DivisionsProps {
  onSelect: (divisionId: string) => void;
}

function countMembers(divisionId: string) {
  return members.filter((m) => divisionIdOf(m.division) === divisionId).length;
}

export function Divisions({ onSelect }: DivisionsProps) {
  return (
    <section
      id="divisions"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-24 md:py-32"
    >
      {/* Cahaya lembut di belakang grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(111,85,165,0.12), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        <SectionHeading
          folio="FOLIO III"
          title="THE CHAPTERS"
          subtitle="Struktur 14 divisi dan 40 panitia yang menggerakkan setiap agenda OSJUR 3.0."
        />

        <div className="mt-10 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {divisions.map((division, i) => (
            <Reveal key={division.id} delay={(i % 4) * 0.08}>
              <DivisionCard
                division={division}
                memberCount={countMembers(division.id)}
                isCouncil={division.id === "sc" || division.id === "po"}
                onSelect={onSelect}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
