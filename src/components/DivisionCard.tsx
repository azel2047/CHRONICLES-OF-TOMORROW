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
      className={`group relative cursor-pointer rounded-lg border bg-deep/40 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:bg-deep/70 ${
        isCouncil
          ? "border-gold/40 hover:border-goldbright hover:shadow-[0_20px_55px_-15px_rgba(240,206,112,0.35)]"
          : "border-royal/25 hover:border-gold/70 hover:shadow-[0_20px_55px_-15px_rgba(216,174,74,0.28)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`font-display text-[11px] tracking-[0.3em] transition-all duration-500 ${
            isCouncil
              ? "text-goldbright/90 group-hover:drop-shadow-[0_0_10px_rgba(240,206,112,0.9)]"
              : "text-gold/80 group-hover:text-gold group-hover:drop-shadow-[0_0_10px_rgba(240,206,112,0.9)]"
          }`}
        >
          {isCouncil ? "THE COUNCIL" : `CHAPTER ${division.number}`}
        </span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border transition-colors duration-500 ${
            isCouncil
              ? "border-gold/40 text-goldbright group-hover:border-goldbright/70"
              : "border-royal/30 text-lavender group-hover:border-gold/50 group-hover:text-gold"
          }`}
          aria-hidden="true"
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={1.6} />
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl tracking-wide text-ivory">
        {division.name}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-mist/75">
        {division.description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-royal/15 pt-4">
        <span className="font-display text-[10px] tracking-[0.25em] text-mist/55">
          {memberCount} {memberCount === 1 ? "NAME" : "NAMES"}
        </span>
        <button
          type="button"
          onClick={() => onSelect(division.id)}
          aria-label={`View members of ${division.name}`}
          className="flex items-center gap-1.5 font-display text-[10px] tracking-[0.25em] text-gold transition-colors hover:text-goldbright"
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
