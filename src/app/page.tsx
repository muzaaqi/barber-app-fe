import CrewSection from "@/components/crew";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero";
import LocationSection from "@/components/location";
import ModelsSection from "@/components/models";
import ProductsSection from "@/components/products";
import VibeSection from "@/components/vibe";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen items-center justify-center mx-auto">
      <HeroSection />
      <ModelsSection />
      <ProductsSection />
      <CrewSection />
      <LocationSection />
      <FooterSection />
    </div>
  );
}
