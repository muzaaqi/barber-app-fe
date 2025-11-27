import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";

const CrewSection = () => {
  const crewItems = [
    {
      name: "John Doe - Barber",
      role: "HEAD BARBER",
      img: "/barber-1.jpg",
    },
    {
      name: "Jane Smith - Stylist",
      role: "STYLIST",
      img: "/barber-2.jpg",
    },
    {
      name: "Mike Johnson - Apprentice",
      role: "APPRENTICE",
      img: "/barber-3.jpg",
    },
  ];
  return (
    <div className="container flex min-h-svh flex-col items-center justify-center py-10">
      <h1 className="font-sans text-5xl font-bold">CREW</h1>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 mt-10 w-10/12 md:w-2/3">
        {crewItems.map(({ name, role, img }) => (
          <Card key={name} className="">
            <CardContent className="relative overflow-hidden group aspect-3/4">
              <Image src={img} alt={name} width={250} height={200} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
            </CardContent>
            <CardFooter className="block">
              <h2 className="font-sans font-bold text-lg">{name.toUpperCase()}</h2>
              <p className="font-mono text-sm text-muted-foreground">{role}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrewSection;
