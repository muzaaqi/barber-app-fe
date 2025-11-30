"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { formatIDR } from "@/features/formatter";
import { Button } from "./ui/button";

const products = [
  {
    id: 1,
    name: "Hair Powder",
    price: 10000,
    image: "/products/hair-powder.png",
  },
  {
    id: 2,
    name: "Hair Tonic",
    price: 15000,
    image: "/products/hair-tonic.png",
  },
  {
    id: 3,
    name: "Hair Oil",
    price: 20000,
    image: "/products/hair-oil.png",
  },
  {
    id: 4,
    name: "Pomade",
    price: 25000,
    image: "/products/pomade.png",
  },
  {
    id: 5,
    name: "Hair Vitamin",
    price: 30000,
    image: "/products/hair-vitamin.png",
  },
];

const ProductCards = () => {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map(({ id, name, price, image }) => (
        <Card key={id}>
          <CardContent className="flex flex-col items-center justify-center space-y-3">
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="w-full"
            />
            <span className="font-mono font-bold text-sm sm:text-md md:text-lg xl:text-xl">
              {name}
            </span>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{formatIDR(price)}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductCards;
