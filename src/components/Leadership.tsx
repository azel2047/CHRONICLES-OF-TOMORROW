import { divisions } from "../data/divisions";
import { members } from "../data/members";
import type { Member } from "../data/members";
import { MemberPhoto } from "./MemberPhoto";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface LeadershipProps {
  onViewProfile: (member: Member) => void;
}

interface LeaderCardProps {
  member: Member;
  featured?: boolean;
  onViewProfile: (member: Member) => void;
}

function LeaderCard({ member, featured = false, onViewProfile }: LeaderCardProps) {
  return (
    <div
      className={`group h-full rounded-xl bg-gradient-to-b from-gold/45 via-royal/25 to-royal/10 p-[1px] transition-all duration-500 hover:from-goldbright/70 hover:shadow-[0_25px_60px_-20px_rgba(216,174,74,0.35)] ${
        featured ? "mx-auto w-full max-w-xs sm:max-w-sm" : ""
      }`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl bg-[#161033]">
        <div className="aspect-[4/5] overflow-hidden">
          <MemberPhoto
            member={member}
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
            eager={featured}
          />
        </div>
        <div className="flex flex-1 flex-col p-4 text-center sm:p-6">
          <p className="font-display text-[9px] uppercase tracking-[0.3em] text-gold sm:text-[10px] sm:tracking-[0.35em]">
            {member.position}
          </p>
          <h3
            className={`mt-2 font-display leading-snug text-ivory sm:mt-3 ${
              featured ? "text-xl sm:text-2xl" : "text-sm sm:text-lg"
            }`}
          >
            {member.name}
          </h3>
          <p className="mt-1 font-serif text-xs italic text-gold/80 sm:mt-1.5 sm:text-sm">
            "{member.nickname}"
          </p>
          <p className="mt-1.5 flex-1 font-display text-[8px] tracking-[0.25em] text-mist/60 sm:mt-2 sm:text-[9px] sm:tracking-[0.3em]">
            {member.division} · ANGKATAN {member.generation}
          </p>
          <button
            type="button"
            onClick={() => onViewProfile(member)}
            className="mt-3 inline-flex min-h-[40px] items-center justify-center gap-2 self-center border border-gold/40 px-5 py-2 font-display text-[9px] tracking-[0.25em] text-gold transition-all duration-300 hover:bg-gold hover:text-midnight hover:shadow-[0_0_30px_rgba(216,174,74,0.4)] sm:mt-5 sm:px-6 sm:py-2.5 sm:text-[10px] sm:tracking-[0.3em]"
          >
            VIEW PROFILE
          </button>
        </div>
      </article>
    </div>
  );
}

export function Leadership({ onViewProfile }: LeadershipProps) {
  const officer = members.find((m) => m.position === "Project Officer");
  const divisionOrder = (name: string) =>
    divisions.findIndex((d) => d.name === name);
  const piCouncil = members
    .filter((m) => m.position === "PI")
    .sort((a, b) => divisionOrder(a.division) - divisionOrder(b.division));

  return (
    <section id="leaders" className="relative scroll-mt-20 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
        <SectionHeading
          folio="FOLIO II"
          title="THE LEADERS"
          subtitle='"The ones who shape the journey."'
        />

        {officer && (
          <Reveal delay={0.1} className="mt-10 sm:mt-16">
            <LeaderCard member={officer} featured onViewProfile={onViewProfile} />
            <p className="mt-4 text-center font-display text-[9px] tracking-[0.4em] text-gold/80 sm:mt-5 sm:text-[10px] sm:tracking-[0.5em]">
              PROJECT OFFICER
            </p>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div className="mx-auto mt-8 max-w-sm rounded-xl border border-dashed border-royal/40 bg-deep/30 px-5 py-4 text-center sm:px-6 sm:py-5">
            <p className="font-display text-[9px] tracking-[0.35em] text-mist/60 sm:text-[10px] sm:tracking-[0.4em]">
              STEERING COMMITTEE
            </p>
            <p className="mt-2 font-serif text-sm italic text-mist/75 sm:text-base">
              "Data segera diperbarui."
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-14 text-center sm:mt-20">
          <p className="font-display text-[10px] tracking-[0.4em] text-gold/90 sm:text-[11px] sm:tracking-[0.5em]">
            THE PI COUNCIL
          </p>
          <h3 className="mt-2 font-display text-xl text-ivory sm:text-2xl md:text-3xl">
            THE GUARDIANS OF EVERY CHAPTER
          </h3>
          <Ornament className="mt-5 sm:mt-6" />
        </Reveal>

        <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {piCouncil.map((member, i) => (
            <Reveal key={member.id} delay={(i % 4) * 0.08}>
              <LeaderCard member={member} onViewProfile={onViewProfile} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
