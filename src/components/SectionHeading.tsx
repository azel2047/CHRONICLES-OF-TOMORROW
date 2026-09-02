import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  folio: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

/** Kepala section: folio kecil, judul monumental, subtitle serif, ornamen. */
export function SectionHeading({
  folio,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : "text-left"}>
      <div className={`inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-[11px] font-bold tracking-widest text-gold uppercase ${centered ? "mx-auto" : ""}`}>
        <span>{folio}</span>
      </div>
      <h2 className="mt-3.5 font-display text-2xl font-extrabold tracking-tight text-ivory sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 font-sans text-sm sm:text-base text-mist/80 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 flex items-center gap-2 sm:mt-5 ${centered ? "justify-center" : ""}`}
        aria-hidden="true"
      >
        <span className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gold/60 to-gold sm:w-16 rounded-full" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="h-0.5 w-12 bg-gradient-to-l from-transparent via-gold/60 to-gold sm:w-16 rounded-full" />
      </div>
    </Reveal>
  );
}
