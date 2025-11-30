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
import { formatIDR } from "@/features/formatter";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

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
      className="mt-10"
      opts={{ loop: true, duration: 300, align: "start" }}
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
    >
      <CarouselContent className="py-2 max-w-screen">
        {menuLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="mx-2 pl-1 basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <Card>
                  <CardContent className="flex flex-col items-center space-y-3 font-mono font-bold">
                    <Skeleton className="aspect-square w-full rounded-md" />
                    <Skeleton className="h-6 w-32" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))
          : menuItems.map(({ title, price, img }, index) => (
              <CarouselItem
                key={index}
                className="mx-2 pl-1 basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <Card>
                  <CardContent className="flex flex-col items-center space-y-3 font-mono font-bold">
                    <Image
                      src={img}
                      alt={title}
                      width={500}
                      height={500}
                      className="w-full rounded-md object-cover grayscale transition-all duration-300 hover:grayscale-0"
                    />
                    <div className="flex items-center justify-center">
                      <span className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                        {title}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{formatIDR(price)}</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 rounded-none" />
      <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 rounded-none" />
    </Carousel>
  );
};

export default CarouselModels;
