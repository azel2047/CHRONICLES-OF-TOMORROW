import { ArrowUpRight, Users } from "lucide-react";
import type { Division } from "../data/divisions";
import { divisionIdOf } from "../data/divisions";
import { members } from "../data/members";
import { Card3D } from "./parallax/Card3D";

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

  // Ambil list member divisi untuk preview avatar nyata
  const divisionMembers = members.filter(
    (m) => divisionIdOf(m.division) === division.id
  );
  const previewMembers = divisionMembers.slice(0, 3);
  const extraCount = divisionMembers.length - previewMembers.length;

  return (
    <Card3D
      maxTilt={6}
      depth={28}
      scale={1.03}
      onClick={() => onSelect(division.id)}
      className="h-full cursor-pointer"
    >
      <div
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-400 ${
          isCouncil
            ? "border-gold/40 bg-gradient-to-b from-[#25184f]/95 via-[#180f38]/95 to-[#0d0722]/95 hover:border-goldbright hover:shadow-[0_20px_50px_-10px_rgba(240,206,112,0.4)]"
            : "border-royal/30 bg-gradient-to-b from-[#1c1342]/90 via-[#140c33]/90 to-[#0b061d]/95 hover:border-gold/70 hover:shadow-[0_20px_45px_-12px_rgba(216,174,74,0.3)]"
        }`}
      >
        {/* Glow highlight di sudut atas */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:bg-gold/30"
          aria-hidden="true"
        />

        <div>
          {/* Header Kartu: Badge Nomor + Icon Floating 3D */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-0.5 font-display text-[10px] font-bold tracking-wider uppercase border ${
                  isCouncil
                    ? "border-gold/60 bg-gold/20 text-goldbright"
                    : "border-royal/50 bg-royal/20 text-gold/90"
                }`}
              >
                {isCouncil ? "COUNCIL" : `DIVISI ${division.number}`}
              </span>
            </div>

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 ${
                isCouncil
                  ? "border-gold/50 bg-gold/15 text-goldbright group-hover:scale-110 group-hover:bg-gold group-hover:text-midnight group-hover:shadow-[0_0_20px_rgba(216,174,74,0.6)]"
                  : "border-royal/40 bg-[#22174c]/80 text-lavender group-hover:scale-110 group-hover:border-gold/60 group-hover:bg-gold group-hover:text-midnight group-hover:shadow-[0_0_20px_rgba(216,174,74,0.5)]"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </div>
          </div>

          {/* Judul Divisi & Deskripsi */}
          <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ivory transition-colors duration-200 group-hover:text-goldbright sm:text-xl">
            {division.name}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-mist/85 font-sans sm:text-sm">
            {division.description}
          </p>

          {/* Preview Avatar Anggota Nyata */}
          <div className="mt-4 flex items-center gap-2.5 border-t border-royal/25 pt-3">
            <div className="flex -space-x-2 overflow-hidden">
              {previewMembers.map((m) => (
                <div
                  key={m.id}
                  className="inline-block h-7 w-7 rounded-full border border-gold/50 bg-deep overflow-hidden ring-2 ring-[#140c33] shadow-sm transition-transform duration-300 group-hover:scale-105"
                  title={`${m.name} (${m.position})`}
                >
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-royal/40 text-[9px] font-bold text-gold">
                      {m.name.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
              {extraCount > 0 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/50 bg-royal/40 text-[9px] font-bold text-ivory ring-2 ring-[#140c33]">
                  +{extraCount}
                </div>
              )}
            </div>

            <span className="text-[11px] font-medium text-mist/75">
              {divisionMembers[0]?.name ? (
                <span className="truncate max-w-[140px] block">
                  {divisionMembers[0].nickname || divisionMembers[0].name.split(" ")[0]} &amp; tim
                </span>
              ) : (
                `${memberCount} Personel`
              )}
            </span>
          </div>
        </div>

        {/* Footer Kartu: Jumlah Anggota + Tombol Interaktif */}
        <div className="mt-5 flex items-center justify-between border-t border-royal/25 pt-3.5">
          <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-mist/75">
            <Users className="h-3.5 w-3.5 text-gold/85" />
            <span>{memberCount} Anggota</span>
          </div>

          <div className="inline-flex items-center gap-1 font-display text-xs font-bold tracking-wider text-gold transition-all duration-300 group-hover:text-goldbright group-hover:translate-x-1">
            <span>Lihat Tim</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </div>
        </div>
      </div>
    </Card3D>
  );
}
