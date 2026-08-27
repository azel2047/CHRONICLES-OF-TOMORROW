import type { Member } from "../data/members";
import { MemberPhoto } from "./MemberPhoto";

interface MemberCardProps {
  member: Member;
  onViewProfile: (member: Member) => void;
}

export function MemberCard({ member, onViewProfile }: MemberCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-royal/25 bg-deep/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:bg-deep/70 hover:shadow-[0_20px_50px_-15px_rgba(216,174,74,0.3)]">
      <div className="aspect-[3/4] overflow-hidden">
        <MemberPhoto
          member={member}
          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-4 text-center sm:p-5">
        <h3 className="font-display text-xs leading-snug text-ivory sm:text-sm md:text-base">
          {member.name}
        </h3>
        <p className="mt-1 font-serif text-xs italic text-gold/85 sm:text-sm">
          "{member.nickname}"
        </p>
        <p className="mt-1.5 font-display text-[8px] uppercase tracking-[0.25em] text-gold sm:text-[10px] sm:tracking-[0.3em]">
          {member.position}
        </p>
        <p className="mt-1 font-display text-[8px] tracking-[0.2em] text-mist/65 sm:text-[9px] sm:tracking-[0.25em]">
          {member.division}
        </p>
        <p className="mt-0.5 font-display text-[8px] tracking-[0.2em] text-mist/40 sm:text-[9px] sm:tracking-[0.25em]">
          ANGKATAN {member.generation}
        </p>
        <button
          type="button"
          onClick={() => onViewProfile(member)}
          aria-label={`View profile of ${member.name}`}
          className="mt-3 min-h-[40px] w-full border border-royal/40 py-2 font-display text-[9px] tracking-[0.25em] text-mist transition-all duration-300 hover:border-gold hover:bg-gold/5 hover:text-gold sm:mt-4 sm:py-2.5 sm:text-[10px] sm:tracking-[0.3em]"
        >
          VIEW PROFILE
        </button>
      </div>
    </article>
  );
}
