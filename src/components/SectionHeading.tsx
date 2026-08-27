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
      <p className="font-display text-[10px] tracking-[0.4em] text-gold/90 sm:text-[11px] sm:tracking-[0.5em]">
        {folio}
      </p>
      <h2 className="mt-3 font-display text-2xl leading-tight text-ivory sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-serif text-base italic text-mist/85 sm:mt-4 sm:text-lg md:text-xl">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 flex items-center gap-2 sm:mt-7 sm:gap-3 ${centered ? "justify-center" : ""}`}
        aria-hidden="true"
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60 sm:w-14" />
        <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60 sm:w-14" />
      </div>
    </Reveal>
  );
}
