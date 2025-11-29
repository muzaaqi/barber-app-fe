"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { formatIDR } from "@/features/formatter";

const MenuSection = () => {
  const menuItems = [
    {
      title: "French Crop",
      price: 25000,
      img: "/models/french-crop.png",
    },
    {
      title: "Undercut",
      price: 15000,
      img: "/models/undercut.png",
    },
    {
      title: "Buzz Cut",
      price: 30000,
      img: "/models/buzz-cut.png",
    },
    {
      title: "Fade Cut",
      price: 35000,
      img: "/models/fade-cut.png",
    },
    {
      title: "Textured",
      price: 20000,
      img: "/models/textured-cut.png",
    },
    {
      title: "Crew Cut",
      price: 20000,
      img: "/models/crew-cut.png",
    },
    {
      title: "Quiff",
      price: 20000,
      img: "/models/quiff.png",
    },
    {
      title: "Caesar Cut",
      price: 20000,
      img: "/models/caesar-cut.png",
    },
    {
      title: "Comma Hair",
      price: 20000,
      img: "/models/comma-hair.png",
    },
    {
      title: "Two Block",
      price: 20000,
      img: "/models/two-block.png",
    },
  ];
  return (
    <div
      id="menu"
      className="container flex flex-col items-center justify-center py-10"
    >
      <h1 className="font-sans text-5xl font-bold">MENU</h1>
      {/* <div className="grid w-full grid-cols-2 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4"> */}
      <Carousel
        className="mt-10"
        opts={{ loop: true, duration: 300, align: "start" }}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
      >
        <CarouselContent className="py-2">
          {menuItems.map(({ title, price, img }, index) => (
            <CarouselItem
              key={index}
              className="mx-2 basis-1/6 pl-1 md:basis-1/4 lg:basis-1/5"
            >
              <Card>
                <CardContent className="space-y-3 font-mono font-bold">
                  <Image
                    src={img}
                    alt={title}
                    width={500}
                    height={500}
                    className="rounded-md object-cover grayscale transition-all duration-300 hover:grayscale-0"
                  />
                  <div className="flex items-center justify-center">
                    <span className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      {title}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="justify-self-end">
                  <Button className="w-full">{formatIDR(price)}</Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50" />
        <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50" />
      </Carousel>
      {/* </div> */}
      <div>
        <span className="text-muted-foreground text-xs italic md:text-sm">
          WALK-INS WELCOME / APPOINTMENTS RECOMMENDED
        </span>
      </div>
    </div>
  );
};

export default MenuSection;
