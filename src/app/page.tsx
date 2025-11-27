import CrewSection from "@/components/crew";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero";
import LocationSection from "@/components/location";
import MenuSection from "@/components/menu";
import VibeSection from "@/components/vibe";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen items-center justify-center mx-auto">
      <HeroSection />
      <MenuSection />
      <CrewSection />
      <VibeSection />
      <LocationSection />
      <FooterSection />
    </div>
  );
}
