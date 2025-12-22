import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import SectionTitle from "./ui/text";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

const Services = () => {
  const services = [
    {
      name: "POTONG",
      img: "/services/cutting.png",
      price: 15,
      desc: "Layanan potong rambut profesional",
      url: "/services?options=haircuts",
    },
    {
      name: "HAIR CARE",
      img: "/services/colorize.webp",
      price: 10,
      desc: "Produk perawatan rambut berkualitas",
      url: "/services?options=products",
    },
    {
      name: "SEGERA HADIR",
      img: "/services/washing.webp",
      price: "???",
      desc: "Harap tunggu informasi selanjutnya",
      url: "#",
    },
  ];

  return (
    <div id="services" className="z-2 container flex flex-col justify-center">
      <div className="mb-8 px-4">
        <SectionTitle>MELAYANI</SectionTitle>
      </div>
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ name, img, price, desc, url }) => (
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
              <div className="bg-background/40 group-hover:bg-background/50 absolute inset-0 transition-colors duration-300" />
              <span className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold tracking-wider drop-shadow-lg">
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
              <Link href={url}>
                <Button className="group/btn gap-2">
                  Lihat
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
