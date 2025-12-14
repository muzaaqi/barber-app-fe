import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import SectionTitle from "./ui/text";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      name: "POTONG",
      img: "/services/cutting.png",
      price: 15,
      desc: "Professional haircut service",
    },
    {
      name: "SEMIR",
      img: "/services/colorize.png",
      price: 20,
      desc: "Hair coloring service",
    },
    {
      name: "KERAMAS",
      img: "/services/washing.png",
      price: 10,
      desc: "Hair washing service",
    },
  ];

  return (
    <div id="services" className="z-2 container flex flex-col justify-center">
      <div className="mb-8 px-4">
        <SectionTitle>OUR SERVICES</SectionTitle>
      </div>
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ name, img, price, desc }) => (
          <Card
            key={name}
            className="group relative flex flex-col overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <CardHeader className="relative flex h-64 items-center justify-center overflow-hidden p-0">
              <Image
                width={1000}
                height={1000}
                src={img}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/40 transition-colors duration-300 group-hover:bg-background/50" />
              <span className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold tracking-wider drop-shadow-lg">
                {name}
              </span>
            </CardHeader>

            <CardContent className="grow">
              <p className="text-muted-foreground">
                {desc || "No description available."}
              </p>
            </CardContent>

            <CardFooter className="mt-auto flex items-center justify-between border-t">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs tracking-wide uppercase">
                  Start From
                </span>
                <span className="text-primary text-2xl font-bold">
                  {`${price}K`}
                </span>
              </div>
              <Button className="group/btn gap-2">
                BOOK NOW
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
