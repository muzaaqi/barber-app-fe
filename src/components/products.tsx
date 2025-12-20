"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ButtonGroup } from "./ui/button-group";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import ProductDialog from "./user/product-dialog";
import { formatIDR } from "@/features/formatter";
import Link from "next/link";
import AddToCartButton from "./user/add-to-cart-btn";

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
              <Card className="hover:border-primary flex h-full flex-col justify-between transition-colors duration-300">
                <CardContent className="text-center">
                  <div className="bg-muted relative mb-4 aspect-square w-full overflow-hidden rounded-md">
                    <Image
                      src={image_url}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="line-clamp-2 text-base font-semibold md:text-xl">
                      {name}
                    </h2>
                    <h2 className="text-primary mt-2 font-bold">
                      {formatIDR(price)}
                    </h2>
                  </div>
                </CardContent>
                <CardFooter>
                  <ButtonGroup className="grid w-full grid-cols-2 gap-2">
                    <AddToCartButton productId={id} />
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <ProductDialog
                        id={id}
                        name={name}
                        description={description}
                        stock={stock}
                        price={price}
                        image_url={image_url}
                      />
                    </div>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Link>
          ))}
    </div>
  );
};

export default Products;
