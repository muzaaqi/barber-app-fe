import AboutSection from "@/components/about";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero";
import LocationSection from "@/components/location";
import ServicesSection from "@/components/services";
import ProductsSection from "@/components/products";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen items-center justify-center mx-auto space-y-9 lg:space-y-20">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <LocationSection />
      <FooterSection />
    </div>
  );
}
