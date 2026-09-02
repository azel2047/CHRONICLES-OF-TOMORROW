import { useCallback, useState } from "react";
import { Closing } from "./components/Closing";
import { Chronicles } from "./components/Chronicles";
import { HorizontalChapters } from "./components/HorizontalChapters";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Leadership } from "./components/Leadership";
import { MemberModal } from "./components/MemberModal";
import { MemberShowcase } from "./components/MemberShowcase";
import { Navbar } from "./components/Navbar";
import type { Member } from "./data/members";

export default function App() {
  const [activeMember, setActiveMember] = useState<Member | null>(null);
  const [divisionFilter, setDivisionFilter] = useState("all");

  const openProfile = useCallback((member: Member) => {
    setActiveMember(member);
  }, []);

  const closeProfile = useCallback(() => {
    setActiveMember(null);
  }, []);

  const selectDivision = useCallback((divisionId: string) => {
    setDivisionFilter(divisionId);
    window.setTimeout(() => {
      document.getElementById("crew")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-midnight selection:bg-gold/30 selection:text-ivory">
      <Navbar />
      <main>
        <Hero />
        <Chronicles />
        <HorizontalChapters onSelect={selectDivision} />
        <Leadership onViewProfile={openProfile} />
        <MemberShowcase
          filter={divisionFilter}
          onFilterChange={setDivisionFilter}
          onViewProfile={openProfile}
        />
        <Closing />
      </main>
      <Footer />
      <MemberModal member={activeMember} onClose={closeProfile} />
    </div>
  );
}
