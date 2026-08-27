import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60 sm:left-5"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the chronicles..."
        aria-label="Search members by name, position, or division"
        className="w-full rounded-full border border-royal/30 bg-deep/50 py-3 pl-10 pr-4 text-sm text-ivory placeholder:text-mist/40 transition-all duration-300 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20 sm:py-3.5 sm:pl-12 sm:pr-5"
      />
    </div>
  );
}
