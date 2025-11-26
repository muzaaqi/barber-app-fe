import Image from "next/image";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="min-h-svh w-full">
      <Image
        className="absolute z-0 min-h-svh min-w-full object-cover"
        src={"/hero-bg.jpg"}
        alt="Hero Background"
        width={1920}
        height={1080}
      />
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center text-center bg-background/50">
        <h1 className="font-sans text-8xl font-bold">
          SHARP CUTS.
        </h1>
        <h2 className="font-sans text-8xl font-bold">
          SMOOTH STYLES.
        </h2>
        <div className="flex flex-col items-center gap-4">
          <span className="text-muted-foreground/80">
            PRECISION BARBERING / STREETWEAR AESTHETIC / INDUSTRIAL EDGE
          </span>
          <Button className="px-7 py-6 text-2xl">Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
