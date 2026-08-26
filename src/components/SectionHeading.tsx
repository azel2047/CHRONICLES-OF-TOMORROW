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
      <p className="font-display text-[11px] tracking-[0.5em] text-gold/90">
        {folio}
      </p>
      <h2 className="mt-4 font-display text-3xl leading-tight text-ivory sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-serif text-lg italic text-mist/85 sm:text-xl">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-7 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        aria-hidden="true"
      >
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/60" />
        <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/60" />
      </div>
    </Reveal>
  );
}
