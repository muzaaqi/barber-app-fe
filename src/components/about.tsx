import Image from "next/image";
import SectionTitle from "./ui/text";
import VibeCards from "./vibe";

const AboutSection = () => {
  return (
    <div id="about" className="container flex flex-col justify-center py-10 px-4 md:px-0">
      <SectionTitle>BARBERSHOP KAMI</SectionTitle>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="flex aspect-square flex-col items-center md:items-start">
          <Image
            src="/barber.png"
            alt="crew-1"
            width={1000}
            height={1000}
            className="xl:w-11/12 object-cover border"
          />
          <div className="mt-4 xl:w-11/12 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">SUDIRO</h2>
            <span className="text-muted-foreground text-sm italic">Barber</span>
          </div>
        </div>
        <div>
          <VibeCards />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
