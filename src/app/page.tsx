import AboutSection from "@/components/about";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero";
import LocationSection from "@/components/location";
import ServicesSection from "@/components/services";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-background text-foreground mx-auto flex min-h-screen flex-col items-center justify-center space-y-9 lg:space-y-20">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <LocationSection />
        <FooterSection />
      </div>
    </>
  );
}
