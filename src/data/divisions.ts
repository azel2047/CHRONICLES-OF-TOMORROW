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
  "PO",
  "SC",
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

/* Ikon + deskripsi per divisi (flavor text, bukan data member). */
const META: Record<string, { description: string; icon: LucideIcon }> = {
  PO: {
    description:
      "The council at the helm — steering the whole chronicle from the front.",
    icon: Crown,
  },
  SC: {
    description:
      "The guiding compass — overseeing every chapter with wisdom and vision.",
    icon: Crown,
  },
  Bendahara: {
    description: "Stewards of the treasury that fuels the whole journey.",
    icon: Coins,
  },
  Sekretaris: {
    description:
      "Keepers of letters, records, and the sacred minutes of the council.",
    icon: ScrollText,
  },
  Event: {
    description:
      "The architects of the grand occasion — every agenda and moment, orchestrated.",
    icon: CalendarDays,
  },
  Humas: {
    description: "Voices and bridges — carrying the story beyond the hall.",
    icon: Megaphone,
  },
  "IT Support": {
    description: "Masters of the arcane machines that keep the story running.",
    icon: Cpu,
  },
  Kedisiplinan: {
    description: "The silent wardens who keep order within the chronicle.",
    icon: Gavel,
  },
  Konsumsi: {
    description:
      "Providers of feast and refreshment for every traveler of the tale.",
    icon: UtensilsCrossed,
  },
  Kreatif: {
    description:
      "The artists who breathe visual soul into every page of the chronicle.",
    icon: Palette,
  },
  Logistik: {
    description:
      "Bearers of the great cargo — every prop and provision, delivered.",
    icon: Package,
  },
  "Media Kreatif": {
    description:
      "Chroniclers of light and lens, capturing every chapter as it unfolds.",
    icon: Camera,
  },
  Medis: {
    description: "Guardians of wellbeing, ready for every twist of the tale.",
    icon: HeartPulse,
  },
  Mentor: {
    description: "The guiding elders who light the path for every member.",
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
