import type { Division } from "../data/divisions";

interface DivisionCardProps {
  division: Division;
  memberCount: number;
  isCouncil?: boolean;
  onSelect: (divisionId: string) => void;
}

export function DivisionCard({
  division,
  memberCount,
  isCouncil = false,
  onSelect,
}: DivisionCardProps) {
  const Icon = division.icon;

  return (
    <article
      onClick={() => onSelect(division.id)}
      className={`group relative cursor-pointer rounded-lg border bg-deep/40 p-4 transition-all duration-500 hover:-translate-y-1.5 hover:bg-deep/70 sm:p-6 ${
        isCouncil
          ? "border-gold/40 hover:border-goldbright hover:shadow-[0_20px_55px_-15px_rgba(240,206,112,0.35)]"
          : "border-royal/25 hover:border-gold/70 hover:shadow-[0_20px_55px_-15px_rgba(216,174,74,0.28)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <span
          className={`font-display text-[10px] tracking-[0.25em] transition-all duration-500 sm:text-[11px] sm:tracking-[0.3em] ${
            isCouncil
              ? "text-goldbright/90 group-hover:drop-shadow-[0_0_10px_rgba(240,206,112,0.9)]"
              : "text-gold/80 group-hover:text-gold group-hover:drop-shadow-[0_0_10px_rgba(240,206,112,0.9)]"
          }`}
        >
          {isCouncil ? "THE COUNCIL" : `CHAPTER ${division.number}`}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded border transition-colors duration-500 sm:h-10 sm:w-10 ${
            isCouncil
              ? "border-gold/40 text-goldbright group-hover:border-goldbright/70"
              : "border-royal/30 text-lavender group-hover:border-gold/50 group-hover:text-gold"
          }`}
          aria-hidden="true"
        >
          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={1.6} />
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg tracking-wide text-ivory sm:mt-5 sm:text-xl">
        {division.name}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-mist/75 sm:mt-2.5 sm:text-sm">
        {division.description}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-royal/15 pt-3 sm:mt-6 sm:pt-4">
        <span className="font-display text-[9px] tracking-[0.2em] text-mist/55 sm:text-[10px] sm:tracking-[0.25em]">
          {memberCount} {memberCount === 1 ? "NAME" : "NAMES"}
        </span>
        <button
          type="button"
          onClick={() => onSelect(division.id)}
          aria-label={`View members of ${division.name}`}
          className="flex items-center gap-1.5 font-display text-[9px] tracking-[0.2em] text-gold transition-colors hover:text-goldbright sm:text-[10px] sm:tracking-[0.25em]"
        >
          VIEW MEMBERS
          <span
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>
      </div>
    </article>
  );
}
