import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

const MenuSection = () => {
  const menuItems = [
    {
      title: "French Crop",
      price: "$25",
      img: "/models/french-crop.png",
    },
    {
      title: "Undercut",
      price: "$15",
      img: "/models/undercut.png",
    },
    {
      title: "Buzz Cut",
      price: "$30",
      img: "/models/buzz-cut.png",
    },
    {
      title: "Fade Cut",
      price: "$35",
      img: "/models/fade-cut.png",
    },
    {
      title: "Textured",
      price: "$20",
      img: "/models/textured-cut.png",
    },
    {
      title: "Crew Cut",
      price: "$20",
      img: "/models/crew-cut.png",
    },
    {
      title: "Quiff",
      price: "$20",
      img: "/models/quiff.png",
    },
    {
      title: "Caesar Cut",
      price: "$20",
      img: "/models/caesar-cut.png",
    },
    {
      title: "Comma Hair",
      price: "$20",
      img: "/models/comma-hair.png",
    },
    {
      title: "Two Block",
      price: "$20",
      img: "/models/two-block.png",
    },
  ];
  return (
    <div
      id="menu"
      className="container flex flex-col items-center justify-center py-10"
    >
      <h1 className="font-sans text-5xl font-bold">MENU</h1>
      <div className="grid w-full grid-cols-2 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        {menuItems.map(({ title, price, img }, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 font-mono font-bold">
              <Image
                src={img}
                alt={title}
                width={500}
                height={500}
                className="grayscale hover:grayscale-0 transition-all duration-300 object-cover rounded-md"
              />
              <div className="flex items-center justify-center">
                <span className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  {title}
                </span>
              </div>
            </CardContent>
            <CardFooter className="justify-self-end">
              <Button className="w-full">{price}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div>
        <span className="text-muted-foreground text-xs italic md:text-sm">
          WALK-INS WELCOME / APPOINTMENTS RECOMMENDED
        </span>
      </div>
    </div>
  );
};

export default MenuSection;
