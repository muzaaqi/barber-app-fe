import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="font-mono bg-background text-foreground min-h-screen flex justify-center">
      <div className="container flex justify-center">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
