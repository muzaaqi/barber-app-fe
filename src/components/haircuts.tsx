import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

const Haircuts = () => {
  const haircuts = [
    {
      id: 1,
      name: "French Crop",
      image_url: "/models/french-crop.png",
    },
    {
      id: 2,
      name: "Buzz Cut",
      image_url: "/models/buzz-cut.png",
    }
  ];
  return (
    <div className="grid xl:grid-cols-4 gap-4">
      {haircuts.map(({ id, name, image_url }) => (
        <Card key={id}>
          <CardContent className="text-center">
            <Image
              src={image_url}
              alt={name}
              width={1000}
              height={1000}
              className=""
            />
            <h2 className="text-2xl font-semibold">{name}</h2>
          </CardContent>
          <CardFooter>
            <Button className="w-full">PILIH</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Haircuts;
