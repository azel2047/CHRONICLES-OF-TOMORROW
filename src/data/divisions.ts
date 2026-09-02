import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Camera,
  Coins,
  Crown,
  Cpu,
  Gavel,
  GraduationCap,
  HeartPulse,
  Megaphone,
  Package,
  Palette,
  ScrollText,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { members } from "./members";

export interface Division {
  id: string;
  name: string;
  number: string;
  description: string;
  icon: LucideIcon;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Id divisi dari nama divisi seorang member. */
export const divisionIdOf = (divisionName: string) => slugify(divisionName);

/* Urutan resmi chapter. Divisi baru di data akan otomatis ditambahkan di akhir. */
const ORDER = [
  "SC",
  "PO",
  "Bendahara",
  "Sekretaris",
  "Event",
  "Humas",
  "IT Support",
  "Kedisiplinan",
  "Konsumsi",
  "Kreatif",
  "Logistik",
  "Media Kreatif",
  "Medis",
  "Mentor",
];

/* Ikon + deskripsi per divisi (ringkas, informatif, dan profesional). */
const META: Record<string, { description: string; icon: LucideIcon }> = {
  SC: {
    description: "Pengarah & penasihat utama strategi pelaksanaan OSJUR 3.0.",
    icon: Crown,
  },
  PO: {
    description: "Pimpinan pelaksana dan penanggung jawab operasional kegiatan.",
    icon: Crown,
  },
  Bendahara: {
    description: "Pengelola anggaran, permodalan, dan transparansi keuangan acara.",
    icon: Coins,
  },
  Sekretaris: {
    description: "Pencatatan administrasi, persuratan, notulensi, dan arsip kepanitiaan.",
    icon: ScrollText,
  },
  Event: {
    description: "Perancang konsep acara, rundown waktu, dan eksekusi panggung.",
    icon: CalendarDays,
  },
  Humas: {
    description: "Penghubung komunikasi eksternal, koordinasi peserta, dan informasi.",
    icon: Megaphone,
  },
  "IT Support": {
    description: "Pengembang platform web, sistem digital, dan infrastruktur teknis.",
    icon: Cpu,
  },
  Kedisiplinan: {
    description: "Penjaga ketertiban, tata tertib, dan pengkondisian forum acara.",
    icon: Gavel,
  },
  Konsumsi: {
    description: "Penyedia logistik konsumsi dan hidangan seluruh panitia & peserta.",
    icon: UtensilsCrossed,
  },
  Kreatif: {
    description: "Perancang visual identitas, dekorasi tema, dan materi artistik.",
    icon: Palette,
  },
  Logistik: {
    description: "Pengadaan perlengkapan, operasional venue, dan distribusi sarana.",
    icon: Package,
  },
  "Media Kreatif": {
    description: "Dokumentasi fotografi, videografi, dan publikasi konten sosial.",
    icon: Camera,
  },
  Medis: {
    description: "Pertolongan pertama, kesehatan panitia, dan kesiapsiagaan darurat.",
    icon: HeartPulse,
  },
  Mentor: {
    description: "Pendamping, fasilitator kelompok, dan pembimbing mahasiswa baru.",
    icon: GraduationCap,
  },
};

const FALLBACK_META = {
  description: "A chapter of the OSJUR 3.0 chronicle.",
  icon: Sparkles,
};

function buildDivision(name: string, index: number): Division {
  const meta = META[name] ?? FALLBACK_META;
  return {
    id: slugify(name),
    name,
    number: String(index + 1).padStart(2, "0"),
    description: meta.description,
    icon: meta.icon,
  };
}

/* Dibangun DINAMIS dari data members — divisi baru otomatis ikut muncul. */
const present = [...new Set(members.map((m) => m.division))];
const ordered = ORDER.filter((name) => present.includes(name));
const extras = present.filter((name) => !ORDER.includes(name));

export const divisions: Division[] = [...ordered, ...extras].map(buildDivision);

export const allChapterTabs = [
  { id: "all", label: "ALL" },
  ...divisions.map((d) => ({ id: d.id, label: d.name })),
];
