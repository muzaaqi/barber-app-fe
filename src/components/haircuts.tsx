import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios-instance";
import { Skeleton } from "./ui/skeleton";

type Haircut = {
  id: number;
  name: string;
  image_url: string;
};

// const haircuts = [
//   {
//     id: 1,
//     name: "French Crop",
//     image_url: "/models/french-crop.png",
//   },
//   {
//     id: 2,
//     name: "Buzz Cut",
//     image_url: "/models/buzz-cut.png",
//   }
// ];

const Haircuts = () => {
  const [haircuts, setHaircuts] = useState<Haircut[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHaircuts = async () => {
      try {
        const response = await api.get("/haircuts");
        setHaircuts(response.data.data.data);
      } catch (error) {
        console.error("Error fetching haircuts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHaircuts();
  }, [])
  return (
    <div className="grid xl:grid-cols-4 gap-4">
      {isLoading || !haircuts ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="text-center">
              <Skeleton className="aspect-square mb-3"/>
              <Skeleton className="h-10 w-full"/>
            </CardContent>
            <CardFooter>
              <Skeleton className="w-full h-10"/>
            </CardFooter>
          </Card>
        ))
      ) : haircuts.map(({ id, name, image_url }) => (
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
