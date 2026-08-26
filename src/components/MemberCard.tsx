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

      <div className="p-5 text-center">
        <h3 className="font-display text-sm leading-snug text-ivory sm:text-base">
          {member.name}
        </h3>
        <p className="mt-1 font-serif text-sm italic text-gold/85">
          "{member.nickname}"
        </p>
        <p className="mt-2 font-display text-[10px] uppercase tracking-[0.3em] text-gold">
          {member.position}
        </p>
        <p className="mt-1.5 font-display text-[9px] tracking-[0.25em] text-mist/65">
          {member.division}
        </p>
        <p className="mt-0.5 font-display text-[9px] tracking-[0.25em] text-mist/40">
          ANGKATAN {member.generation}
        </p>
        <button
          type="button"
          onClick={() => onViewProfile(member)}
          aria-label={`View profile of ${member.name}`}
          className="mt-4 w-full border border-royal/40 py-2.5 font-display text-[10px] tracking-[0.3em] text-mist transition-all duration-300 hover:border-gold hover:bg-gold/5 hover:text-gold"
        >
          VIEW PROFILE
        </button>
      </div>
    </article>
  );
}
