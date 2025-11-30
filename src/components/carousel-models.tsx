"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const menuItems = [
  {
    name: "French Crop",
    img: "/models/french-crop.png",
  },
  {
    name: "Undercut",
    img: "/models/undercut.png",
  },
  {
    name: "Buzz Cut",
    img: "/models/buzz-cut.png",
  },
  {
    name: "Fade Cut",
    img: "/models/fade-cut.png",
  },
  {
    name: "Textured",
    img: "/models/textured-cut.png",
  },
  {
    name: "Crew Cut",
    img: "/models/crew-cut.png",
  },
  {
    name: "Quiff",
    img: "/models/quiff.png",
  },
  {
    name: "Caesar Cut",
    img: "/models/caesar-cut.png",
  },
  {
    name: "Comma Hair",
    img: "/models/comma-hair.png",
  },
  {
    name: "Two Block",
    img: "/models/two-block.png",
  },
];

const CarouselModels = () => {
  const [menuLoading, setMenuLoading] = useState(false);

  useEffect(() => {
    setMenuLoading(true);
    setTimeout(() => {
      setMenuLoading(false);
    }, 1000);
  }, []);

  return (
    <Carousel
      opts={{ loop: true, duration: 300, align: "start"}}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
    >
      <CarouselContent className="py-4 max-w-screen">
        {menuLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="mx-2 pl-1 basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <Card>
                  <CardContent className="flex flex-col items-center space-y-3 font-mono font-bold">
                    <Skeleton className="aspect-square w-full xl:w-50 2xl:w-72 rounded-md" />
                    <Skeleton className="h-7 w-3/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))
          : menuItems.map(({ name, img }, index) => (
              <CarouselItem
                key={index}
                className="mx-2 pl-1 basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <Card className="hover:scale-105 transition-transform duration-300 group">
                  <CardContent className="flex flex-col items-center space-y-3 font-mono font-bold">
                    <Image
                      src={img}
                      alt={name}
                      width={500}
                      height={500}
                      className="w-full rounded-md object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                      loading="eager"
                    />
                    <div className="flex items-center justify-center">
                      <span className="text-md sm:text-lg md:text-xl xl:text-2xl">
                        {name}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">PILIH</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious   className="absolute top-1/2 left-2 -translate-y-1/2 rounded-none" />
      <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 rounded-none" />
    </Carousel>
  );
};

export default CarouselModels;
