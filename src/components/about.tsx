import Image from "next/image";
import SectionTitle from "./ui/text";
import VibeCards from "./vibe";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    name: "POTONG",
    img: "/services/cutting.png",
  },
  {
    name: "SEMIR",
    img: "/services/colorize.png",
  },
  {
    name: "KERAMAS",
    img: "/services/washing.png",
  },
];

const AboutSection = () => {
  return (
    <div
      id="about"
      className="container flex flex-col justify-center px-4 md:px-0"
    >
      <SectionTitle>BARBERSHOP KAMI</SectionTitle>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex aspect-square flex-col items-center md:items-start">
          <Image
            src="/barber.png"
            alt="crew-1"
            width={1000}
            height={1000}
            className="border object-cover xl:w-11/12"
          />
          <div className="mt-4 flex flex-col items-center justify-center xl:w-11/12">
            <h2 className="text-3xl font-bold">SUDIRO</h2>
            <span className="text-muted-foreground text-sm italic">Barber</span>
          </div>
        </div>
        <div className="space-y-5 xl:space-y-10">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold">MELAYANI</h2>
            <div className="grid grid-cols-3 gap-4">
              {services.map(({ name, img }) => (
                <Card
                  key={name}
                  className="relative flex flex-col items-center py-0 group"
                >
                  <CardContent className="flex w-full items-center justify-center px-0 overflow-hidden">
                    <Image
                      src={img}
                      alt={name}
                      width={500}
                      height={500}
                      className="object-cover brightness-70 group-hover:scale-110 group-hover:brightness-90 transition-all duration-300"
                    />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl text-primary font-semibold">
                      {name}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold">TEMPAT</h2>
            <VibeCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
