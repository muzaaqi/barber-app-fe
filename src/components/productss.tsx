import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios-instance";

type Products = {
  id: string;
  name: string;
  image_url: string;
};

const Products = () => {
  const [products, setProducts ] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [])
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {isLoading || !products ? (
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
      ) : products.map(({ id, name, image_url }) => (
        <Card key={id}>
          <CardContent className="text-center">
            <Image
              src={image_url}
              alt={name}
              width={1000}
              height={1000}
              className=""
            />
            <h2 className="text-xl md:text-2xl font-semibold">{name}</h2>
          </CardContent>
          <CardFooter>
          <ButtonGroup className="grid grid-cols-2 gap-2 w-full">
              <Button variant="secondary"><ShoppingCart />Troli</Button>
              <Button><ShoppingBag />Beli</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Products;
