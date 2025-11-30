import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const VibeCards = () => {
  const vibeItems = [
    {
      title: "room-1",
      img: "/shop-interior.jpg",
    },
    {
      title: "room-2",
      img: "/hero-bg.jpg",
    },
  ];

  return (
    <div className="grid gap-5 lg:gap-10 xl:gap-20 grid-cols-2 md:px-0">
      {vibeItems.map(({ title, img }) => (
        <Card key={title} className="py-0">
          <CardContent className="group relative aspect-square overflow-hidden px-0">
            <Image
              src={img}
              alt={title}
              width={500}
              height={500}
              className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VibeCards;
