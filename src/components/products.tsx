import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import ProductDialog from "./user/product-dialog";
import { formatIDR } from "@/features/formatter";
import Link from "next/link";

type Products = {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  image_url: string;
};

const Products = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.data.data);
      } catch (error) {
        toast.error("Gagal memuat produk.", {
          description: String(error),
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {isLoading || !products
        ? Array.from({ length: 10 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="text-center">
                <Skeleton className="mb-3 aspect-square" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))
        : products.map(({ id, name, description, stock, price, image_url }) => (
            <Link
              href={`/services/product/${id}`}
              key={id}
              className="no-underline"
            >
              <Card
                key={id}
                className="hover:border-primary transition-colors duration-300"
              >
                <CardContent className="text-center">
                  <Image
                    src={image_url}
                    alt={name}
                    width={1000}
                    height={1000}
                    className=""
                  />
                  <div>
                    <h2 className="text-xl font-semibold md:text-2xl">
                      {name}
                    </h2>
                    <h2>{formatIDR(price)}</h2>
                  </div>
                </CardContent>
                <CardFooter>
                  <ButtonGroup
                    className="grid w-full grid-cols-2 gap-2 pointer-events-none md:pointer-events-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Button variant="secondary">
                      <ShoppingCart />
                      Troli
                    </Button>
                    <ProductDialog
                      id={id}
                      name={name}
                      description={description}
                      stock={stock}
                      price={price}
                      image_url={image_url}
                    />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Link>
          ))}
    </div>
  );
};

export default Products;
