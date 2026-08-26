interface OrnamentProps {
  className?: string;
}

/** Pembatas dekoratif: garis gold tipis dengan wajik di tengah. */
export function Ornament({ className = "" }: OrnamentProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70 sm:w-20" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold/90 shadow-[0_0_10px_rgba(216,174,74,0.8)]" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70 sm:w-20" />
    </div>
  );
}
