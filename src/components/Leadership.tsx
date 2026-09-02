import { useMemo } from "react";
import { divisions } from "../data/divisions";
import { members } from "../data/members";
import type { Member } from "../data/members";
import { useSectionPreload } from "../hooks/useSectionPreload";
import { MemberPhoto } from "./MemberPhoto";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ScrollFlipCard } from "./parallax/ScrollFlipCard";

interface LeadershipProps {
  onViewProfile: (member: Member) => void;
}

interface LeaderCardProps {
  member: Member;
  cardIndex?: number;
  featured?: boolean;
  onViewProfile: (member: Member) => void;
}

function LeaderCard({ member, cardIndex = 0, featured = false, onViewProfile }: LeaderCardProps) {
  const divIndex = divisions.findIndex((d) => d.name === member.division);
  const chapterNumber = divIndex !== -1 ? divIndex + 1 : undefined;

  return (
    <ScrollFlipCard
      cardIndex={cardIndex}
      chapterNumber={chapterNumber}
      cardTitle={member.name}
      cardSubtitle={`${member.position} · ${member.division}`}
      className={featured ? "mx-auto w-full max-w-xs sm:max-w-sm" : "h-full"}
    >
      <div
        className={`group h-full rounded-2xl bg-gradient-to-b from-gold/45 via-royal/25 to-royal/15 p-[1px] shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1.5`}
      >
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#1c1342]/95 via-[#130b2e]/95 to-[#0b061d]/95">
          {/* Portrait with 3D Depth Layer */}
          <div className="aspect-[4/5] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#130b2e] via-transparent to-transparent z-10 opacity-70" />
            <MemberPhoto
              member={member}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              eager={featured}
            />
          </div>

          <div className="relative z-20 flex flex-1 flex-col p-4 text-center sm:p-6">
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
            <p className="mt-1 font-serif text-xs italic text-gold/85 sm:mt-1.5 sm:text-sm">
              "{member.nickname}"
            </p>
            <p className="mt-1.5 flex-1 font-display text-[8px] tracking-[0.25em] text-mist/60 sm:mt-2 sm:text-[9px] sm:tracking-[0.3em]">
              {member.division} · ANGKATAN {member.generation}
            </p>
            <button
              type="button"
              onClick={() => onViewProfile(member)}
              className="mt-3 inline-flex min-h-[40px] items-center justify-center gap-2 self-center rounded-sm border border-gold/45 bg-gold/5 px-5 py-2 font-display text-[9px] tracking-[0.25em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-midnight sm:mt-5 sm:px-6 sm:py-2.5 sm:text-[10px] sm:tracking-[0.3em]"
            >
              VIEW PROFILE
            </button>
          </div>
        </article>
      </div>
    </ScrollFlipCard>
  );
}

export function Leadership({ onViewProfile }: LeadershipProps) {
  const officer = members.find((m) => m.position === "Project Officer");
  const steeringCommittee = members.find((m) => m.position === "SC");
  const divisionOrder = (name: string) =>
    divisions.findIndex((d) => d.name === name);
  const piCouncil = useMemo(
    () =>
      members
        .filter((m) => m.position === "PI")
        .sort((a, b) => divisionOrder(a.division) - divisionOrder(b.division)),
    []
  );

  const leaderPhotos = useMemo(
    () =>
      [
        steeringCommittee?.photo,
        officer?.photo,
        ...piCouncil.map((m) => m.photo),
      ].filter(Boolean) as string[],
    [steeringCommittee, officer, piCouncil]
  );

  const sectionRef = useSectionPreload(leaderPhotos, "400px 0px");

  return (
    <section
      ref={sectionRef}
      id="leaders"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-24 md:py-32"
    >
      {/* Background Character Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 20%, rgba(111,85,165,0.18), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 80%, rgba(216,174,74,0.08), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
        <SectionHeading
          folio="FOLIO II"
          title="THE LEADERS"
          subtitle='"The ones who shape the journey."'
        />

        {steeringCommittee && (
          <Reveal delay={0.1} className="mt-10 sm:mt-16">
            <LeaderCard member={steeringCommittee} cardIndex={0} featured onViewProfile={onViewProfile} />
            <p className="mt-4 text-center font-display text-[9px] tracking-[0.4em] text-gold/80 sm:mt-5 sm:text-[10px] sm:tracking-[0.5em]">
              STEERING COMMITTEE
            </p>
          </Reveal>
        )}

        {officer && (
          <Reveal delay={0.15} className="mt-8 sm:mt-10">
            <LeaderCard member={officer} cardIndex={1} featured onViewProfile={onViewProfile} />
            <p className="mt-4 text-center font-display text-[9px] tracking-[0.4em] text-gold/80 sm:mt-5 sm:text-[10px] sm:tracking-[0.5em]">
              PROJECT OFFICER
            </p>
          </Reveal>
        )}

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
              <LeaderCard member={member} cardIndex={i} onViewProfile={onViewProfile} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
