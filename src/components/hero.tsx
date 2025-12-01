import Image from "next/image";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="min-h-svh w-full">
      <Image
        className="absolute z-0 max-h-svh min-h-svh min-w-full object-cover"
        src={"/hero-bg.jpg"}
        alt="Hero Background"
        width={1920}
        height={1080}
      />
      <div className="bg-background/50 relative z-10 flex min-h-svh flex-col items-center justify-center text-center">
        <h1 className="font-sans text-4xl md:text-6xl font-bold lg:text-8xl">
          HASIL RAPI<span className="text-primary">.</span>
        </h1>
        <h2 className="font-sans text-4xl md:text-6xl font-bold lg:text-8xl">
          POTONGAN PRESISI
        </h2>
        <div className="flex flex-col items-center gap-4">
          <span className="text-muted-foreground/80 md:text-lg">
            BARBER PROFESIONAL | TEMPAT NYAMAN
          </span>
          <Button className="px-5 py-6 text-lg md:px-7 md:py-6 md:text-2xl">
            POTONG SEKARANG
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
