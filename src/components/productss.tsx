import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { ShoppingBag, ShoppingCart } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Hair Tonic",
      image_url: "/products/hair-tonic.png",
    },
    {
      id: 2,
      name: "Pomade",
      image_url: "/products/pomade.png",
    }
  ];
  return (
    <div className="grid xl:grid-cols-4 gap-4">
      {products.map(({ id, name, image_url }) => (
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
            <ButtonGroup className="grid grid-cols-2 gap-2 w-full">
              <Button variant="secondary"><ShoppingCart />Tambah</Button>
              <Button><ShoppingBag />Beli</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Products;
