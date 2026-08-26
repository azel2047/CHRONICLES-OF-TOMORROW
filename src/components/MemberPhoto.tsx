import { useState } from "react";
import type { Member } from "../data/members";

interface MemberPhotoProps {
  member: Member;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Foto member. Jika photo null / gagal dimuat,
 * tampilkan placeholder monogram inisial yang elegan.
 */
export function MemberPhoto({
  member,
  className = "",
  imgClassName = "",
  eager = false,
}: MemberPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (member.photo === null || failed) {
    return (
      <div
        role="img"
        aria-label={`Portrait placeholder for ${member.name}`}
        className={`flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_top,rgba(111,85,165,0.4),rgba(18,13,46,0.95))] ${className}`}
      >
        <span className="text-gold-gradient font-display text-5xl font-bold">
          {initialsOf(member.name)}
        </span>
        <span className="h-px w-10 bg-gold/40" aria-hidden="true" />
        <span className="font-display text-[9px] tracking-[0.4em] text-mist/50">
          {member.division}
        </span>
      </div>
    );
  }

  return (
    <img
      src={member.photo}
      alt={`Portrait of ${member.name}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className} ${imgClassName}`}
    />
  );
}
