import { motion } from "framer-motion";
import { Sparkle, Users } from "lucide-react";
import { members } from "../data/members";
import type { Member } from "../data/members";
import { Reveal } from "./Reveal";

interface IntroductionHierarchyProps {
  onViewProfile: (member: Member) => void;
}

interface DivisionGroup {
  id: string;
  name: string;
  displayTitle: string;
  filterKey: string;
}

// 12 Divisi dalam urutan presisi 3 kolom x 4 baris sesuai poster
const DIVISION_GROUPS: DivisionGroup[] = [
  // Baris 1
  {
    id: "sekretaris",
    name: "Sekretaris",
    displayTitle: "SEKRETARIS",
    filterKey: "Sekretaris",
  },
  {
    id: "mentor",
    name: "Mentor",
    displayTitle: "MENTOR",
    filterKey: "Mentor",
  },
  {
    id: "bendahara",
    name: "Bendahara",
    displayTitle: "BENDAHARA",
    filterKey: "Bendahara",
  },
  // Baris 2
  {
    id: "kedisiplinan",
    name: "Kedisiplinan",
    displayTitle: "KEDISIPLINAN",
    filterKey: "Kedisiplinan",
  },
  {
    id: "event",
    name: "Event",
    displayTitle: "EVENT",
    filterKey: "Event",
  },
  {
    id: "logistik",
    name: "Logistik",
    displayTitle: "LOGISTIK",
    filterKey: "Logistik",
  },
  // Baris 3
  {
    id: "it-support",
    name: "IT Support",
    displayTitle: "IT SUPPORT",
    filterKey: "IT Support",
  },
  {
    id: "humas",
    name: "Humas",
    displayTitle: "HUMAS",
    filterKey: "Humas",
  },
  {
    id: "konsumsi",
    name: "Konsumsi",
    displayTitle: "KONSUMSI",
    filterKey: "Konsumsi",
  },
  // Baris 4
  {
    id: "media",
    name: "Media",
    displayTitle: "MEDIA",
    filterKey: "Media Kreatif",
  },
  {
    id: "kreatif",
    name: "Kreatif",
    displayTitle: "KREATIF",
    filterKey: "Kreatif",
  },
  {
    id: "medis",
    name: "Medis",
    displayTitle: "MEDIS",
    filterKey: "Medis",
  },
];

/** Komponen render satu badge foto panitia */
function MemberBadgeItem({
  member,
  onViewProfile,
}: {
  member: Member;
  onViewProfile: (member: Member) => void;
}) {
  return (
    <div
      onClick={() => onViewProfile(member)}
      className="group/badge relative cursor-pointer transition-transform duration-300 hover:z-20 hover:scale-105"
      title={`${member.name} (${member.position}) - Klik untuk profil lengkap`}
    >
      <img
        src={member.photo || "/favicon.png"}
        alt={member.name}
        className="h-auto w-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover/badge:drop-shadow-[0_14px_28px_rgba(216,174,74,0.55)]"
        loading="lazy"
      />
    </div>
  );
}

/** Komponen Box Satu Divisi dengan Grid Foto Anggota Lengkap */
function DivisionBox({
  division,
  divisionMembers,
  onViewProfile,
}: {
  division: DivisionGroup;
  divisionMembers: Member[];
  onViewProfile: (member: Member) => void;
}) {
  const count = divisionMembers.length;

  return (
    <div className="flex flex-col items-center">
      {/* Judul Divisi Tipografi Fantasi */}
      <h3
        className="font-display text-lg font-black tracking-[0.2em] text-[#EDE3FA] sm:text-xl md:text-2xl"
        style={{
          textShadow:
            "0 2px 4px rgba(0,0,0,0.9), 0 0 16px rgba(111,85,165,0.85)",
        }}
      >
        {division.displayTitle}
      </h3>

      {/* Wadah Kartu Divisi */}
      <div className="relative mt-3 w-full rounded-2xl border border-royal/30 bg-gradient-to-b from-[#221545]/60 via-[#130b2e]/60 to-[#0a051c]/70 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:border-gold/50 sm:p-4">
        {/* Formasi Grid Sesuai Jumlah Anggota */}
        {count === 1 && (
          // 1 Anggota (Bendahara)
          <div className="mx-auto max-w-[240px]">
            <MemberBadgeItem
              member={divisionMembers[0]}
              onViewProfile={onViewProfile}
            />
          </div>
        )}

        {count === 2 && (
          // 2 Anggota (Sekretaris, Humas, Konsumsi, Kreatif)
          <div className="grid grid-cols-2 items-center gap-2 sm:gap-3">
            {divisionMembers.map((m) => (
              <MemberBadgeItem
                key={m.id}
                member={m}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        )}

        {count === 3 && (
          // 3 Anggota (Event, Logistik, Medis)
          <div className="grid grid-cols-3 items-center gap-1.5 sm:gap-2">
            {divisionMembers.map((m) => (
              <MemberBadgeItem
                key={m.id}
                member={m}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        )}

        {count === 4 && (
          // 4 Anggota (IT Support [4], Media [4])
          <div className="grid grid-cols-2 items-center gap-2 sm:gap-3">
            {divisionMembers.map((m) => (
              <MemberBadgeItem
                key={m.id}
                member={m}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        )}

        {count === 5 && (
          // 5 Anggota (Kedisiplinan)
          <div className="space-y-2">
            {/* 2 di atas */}
            <div className="grid grid-cols-2 items-center gap-2 sm:gap-3">
              {divisionMembers.slice(0, 2).map((m) => (
                <MemberBadgeItem
                  key={m.id}
                  member={m}
                  onViewProfile={onViewProfile}
                />
              ))}
            </div>
            {/* 3 di bawah */}
            <div className="grid grid-cols-3 items-center gap-1.5 sm:gap-2">
              {divisionMembers.slice(2).map((m) => (
                <MemberBadgeItem
                  key={m.id}
                  member={m}
                  onViewProfile={onViewProfile}
                />
              ))}
            </div>
          </div>
        )}

        {count >= 6 && (
          // 7 Anggota (Mentor)
          <div className="space-y-2">
            {/* 1 PI di tengah atas */}
            <div className="mx-auto max-w-[140px] sm:max-w-[160px]">
              <MemberBadgeItem
                member={divisionMembers[0]}
                onViewProfile={onViewProfile}
              />
            </div>
            {/* 6 Staff dalam grid 3 kolom */}
            <div className="grid grid-cols-3 items-center gap-1.5 sm:gap-2">
              {divisionMembers.slice(1).map((m) => (
                <MemberBadgeItem
                  key={m.id}
                  member={m}
                  onViewProfile={onViewProfile}
                />
              ))}
            </div>
          </div>
        )}

        {/* Info Anggota */}
        <div className="mt-3 flex items-center justify-center gap-1.5 border-t border-royal/20 pt-2 font-display text-[10px] tracking-[0.25em] text-mist/60 uppercase">
          <Users className="h-3 w-3 text-gold/80" />
          <span>{count} ANGGOTA</span>
        </div>
      </div>
    </div>
  );
}

export function IntroductionHierarchy({
  onViewProfile,
}: IntroductionHierarchyProps) {
  const steeringCommittee = members.find((m) => m.position === "SC");
  const projectOfficer = members.find((m) => m.position === "Project Officer");

  return (
    <section
      id="introduction"
      className="relative scroll-mt-16 overflow-hidden py-12 sm:py-20 md:py-28"
    >
      {/* Compatibility anchors */}
      <div id="leaders" className="absolute -top-20" aria-hidden="true" />
      <div id="divisions" className="absolute top-1/3" aria-hidden="true" />
      <div id="crew" className="absolute top-1/2" aria-hidden="true" />

      {/* Latar Belakang Cahaya Sihir Ungu-Emas */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 8%, rgba(111,85,165,0.35), transparent 70%), radial-gradient(ellipse 80% 40% at 50% 50%, rgba(155,130,208,0.12), transparent 70%), radial-gradient(ellipse 60% 30% at 50% 90%, rgba(216,174,74,0.1), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================
            1. HEADER BANNER UTAMA: "INTRODUCTION PANITIA OSJUR"
            ============================================================ */}
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex items-center gap-2 text-gold">
            <Sparkle className="h-3 w-3" fill="currentColor" />
            <span className="font-display text-[10px] tracking-[0.4em] sm:text-xs sm:tracking-[0.5em]">
              FOLIO II · THE HIERARCHY
            </span>
            <Sparkle className="h-3 w-3" fill="currentColor" />
          </div>

          <h2 className="sr-only">Introduction Panitia OSJUR 3.0 (40 Anggota)</h2>

          {/* Banner Ilustrasi Asli dengan Burung Hantu & Tipografi Emas */}
          <motion.div
            className="relative mt-3 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/divisions/header_banner.webp"
              alt="Introduction Panitia OSJUR"
              className="mx-auto h-auto w-full max-w-2xl object-contain drop-shadow-[0_15px_35px_rgba(111,85,165,0.5)]"
            />
          </motion.div>

          <p className="mt-2 font-serif text-sm italic text-mist/80 sm:text-base md:text-lg">
            "The grand chronicle assembled — all 40 keepers of tomorrow united in sacred harmony."
          </p>
        </div>

        {/* ============================================================
            2. TOP TIER (TRIO): STEERING COMMITTE | CENTERPIECE | PROJECT OFFICER
            ============================================================ */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3 sm:gap-6 md:gap-8 lg:gap-10">
            {/* Kolom Kiri: STEERING COMMITTE */}
            <Reveal delay={0.1}>
              <div className="flex flex-col items-center">
                <h3
                  className="font-display text-lg font-black tracking-[0.2em] text-[#EDE3FA] sm:text-xl md:text-2xl"
                  style={{
                    textShadow:
                      "0 2px 4px rgba(0,0,0,0.9), 0 0 16px rgba(111,85,165,0.85)",
                  }}
                >
                  STEERING COMMITTE
                </h3>
                {steeringCommittee && (
                  <div className="relative mt-3 w-full max-w-[280px] rounded-2xl border border-gold/40 bg-gradient-to-b from-[#221545]/60 via-[#130b2e]/60 to-[#0a051c]/70 p-3 shadow-[0_15px_35px_rgba(216,174,74,0.3)]">
                    <MemberBadgeItem
                      member={steeringCommittee}
                      onViewProfile={onViewProfile}
                    />
                  </div>
                )}
              </div>
            </Reveal>

            {/* Kolom Tengah: CENTERPIECE (OSJUR 3.0 & GLOWING BOOK) */}
            <Reveal delay={0.2}>
              <div className="relative flex flex-col items-center justify-center p-2 text-center">
                <div
                  className="pointer-events-none absolute inset-0 -top-4 animate-pulse-soft rounded-full bg-gradient-to-t from-royal/50 via-gold/30 to-transparent blur-3xl"
                  aria-hidden="true"
                />
                <motion.img
                  src="/images/divisions/centerpiece.webp"
                  alt="OSJUR 3.0 Chronicles of Tomorrow"
                  className="relative z-10 mx-auto h-auto w-full max-w-[270px] object-contain drop-shadow-[0_0_40px_rgba(216,174,74,0.65)]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </Reveal>

            {/* Kolom Kanan: PROJECT OFFICER */}
            <Reveal delay={0.3}>
              <div className="flex flex-col items-center">
                <h3
                  className="font-display text-lg font-black tracking-[0.2em] text-[#EDE3FA] sm:text-xl md:text-2xl"
                  style={{
                    textShadow:
                      "0 2px 4px rgba(0,0,0,0.9), 0 0 16px rgba(111,85,165,0.85)",
                  }}
                >
                  PROJECT OFFICER
                </h3>
                {projectOfficer && (
                  <div className="relative mt-3 w-full max-w-[280px] rounded-2xl border border-gold/40 bg-gradient-to-b from-[#221545]/60 via-[#130b2e]/60 to-[#0a051c]/70 p-3 shadow-[0_15px_35px_rgba(216,174,74,0.3)]">
                    <MemberBadgeItem
                      member={projectOfficer}
                      onViewProfile={onViewProfile}
                    />
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Garis Pembatas ke 12 Divisi */}
        <div className="my-10 flex items-center justify-center gap-4 sm:my-16">
          <span className="h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-gold sm:w-48" />
          <Sparkle className="h-3.5 w-3.5 text-gold" fill="currentColor" />
          <span className="font-display text-[10px] tracking-[0.4em] text-gold/90 sm:text-xs">
            THE CHAPTERS · 40 KEEPERS
          </span>
          <Sparkle className="h-3.5 w-3.5 text-gold" fill="currentColor" />
          <span className="h-px w-24 bg-gradient-to-l from-transparent via-gold/50 to-gold sm:w-48" />
        </div>

        {/* ============================================================
            3. MATRIKS 12 DIVISI (3 Kolom x 4 Baris) - SEMUA 40 ANGGOTA
            ============================================================ */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {DIVISION_GROUPS.map((divGroup, idx) => {
            const divisionMembers = members.filter(
              (m) => m.division.toLowerCase() === divGroup.filterKey.toLowerCase()
            );

            return (
              <Reveal key={divGroup.id} delay={(idx % 3) * 0.1}>
                <DivisionBox
                  division={divGroup}
                  divisionMembers={divisionMembers}
                  onViewProfile={onViewProfile}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
