import type { Member } from "../data/members";
import { MemberPhoto } from "./MemberPhoto";
import { ScrollFlipCard } from "./parallax/ScrollFlipCard";

interface MemberCardProps {
  member: Member;
  cardIndex?: number;
  onViewProfile: (member: Member) => void;
}

export function MemberCard({
  member,
  cardIndex = 0,
  onViewProfile,
}: MemberCardProps) {
  return (
    <ScrollFlipCard
      cardIndex={cardIndex}
      chapterNumber={member.id}
      cardTitle={member.name}
      cardSubtitle={`${member.position} · ${member.division}`}
      className="h-full"
    >
      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-royal/30 bg-gradient-to-b from-[#1c1342]/90 via-[#130b2e]/90 to-[#0b061d]/95 p-4 text-center shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1.5 hover:border-gold/70 sm:p-5">
        <div>
          <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#130b2e]/80 via-transparent to-transparent z-10 opacity-60" />
            <MemberPhoto
              member={member}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>

          <div className="mt-3.5">
            <h3 className="font-display text-xs font-bold leading-snug text-ivory sm:text-sm md:text-base">
              {member.name}
            </h3>
            <p className="mt-1 font-serif text-xs italic text-gold/85 sm:text-sm">
              "{member.nickname}"
            </p>
            <p className="mt-1.5 font-display text-[8px] uppercase tracking-[0.25em] text-gold sm:text-[10px] sm:tracking-[0.3em]">
              {member.position}
            </p>
            <p className="mt-1 font-display text-[8px] tracking-[0.2em] text-mist/70 sm:text-[9px] sm:tracking-[0.25em]">
              {member.division}
            </p>
            <p className="mt-0.5 font-display text-[8px] tracking-[0.2em] text-mist/45 sm:text-[9px] sm:tracking-[0.25em]">
              ANGKATAN {member.generation}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onViewProfile(member)}
          aria-label={`View profile of ${member.name}`}
          className="mt-4 min-h-[38px] w-full rounded-sm border border-royal/40 bg-royal/10 py-2 font-display text-[9px] tracking-[0.25em] text-mist transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-midnight sm:mt-5 sm:py-2.5 sm:text-[10px] sm:tracking-[0.3em]"
        >
          VIEW PROFILE
        </button>
      </article>
    </ScrollFlipCard>
  );
}
