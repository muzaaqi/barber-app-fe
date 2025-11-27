import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const VibeSection = () => {
  const vibeItems = [
    {
      title: "room-1",
      img: "/shop-interior.jpg",
    },
    {
      title: "room-2",
      img: "/hero-bg.jpg",
    },
    {
      title: "room-3",
      img: "/shop-interior.jpg",
    },
    {
      title: "room-4",
      img: "/hero-bg.jpg",
    },
  ];

  return (
    <div className="container flex min-h-svh flex-col items-center justify-center py-10">
      <h1 className="font-sans text-5xl font-bold">VIBE</h1>
      <div className="mt-10 grid w-2/3 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        {vibeItems.map(({ title, img }) => (
          <Card key={title} className="py-0">
            <CardContent className="px-0 relative overflow-hidden group aspect-square">
              <Image src={img} alt={title} width={100} height={100} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"/>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VibeSection;
