import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const VibeCards = () => {
  const vibeItems = [
    {
      title: "room-1",
      img: "/vibes/vibe-1.png",
    },
    {
      title: "room-2",
      img: "/vibes/vibe-2.png",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 lg:gap-10 xl:gap-20">
      {vibeItems.map(({ title, img }) => (
        <Card key={title} className="py-0">
          <CardContent className="group relative aspect-square overflow-hidden px-0">
            <Image
              src={img}
              alt={title}
              width={1000}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VibeCards;
