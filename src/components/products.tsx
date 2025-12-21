"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ButtonGroup } from "./ui/button-group";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductDialog from "./user/product-dialog";
import { formatIDR } from "@/features/formatter";
import Link from "next/link";
import AddToCartButton from "./user/add-to-cart-btn";
import { getAllProducts } from "@/actions/management/product-actions";
import { ProductsType } from "@/types/products";
import GlobalPagination from "@/components/global-pagination";
import { useSearchParams } from "next/navigation";
import { PaginationMeta } from "@/types/transactions"; 

const ProductsCards = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState<ProductsType[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const result = await getAllProducts(page, 10); 
        if (!result || !result.data) {
          throw new Error("No products found");
        }
        setProducts(result.data); 
        setMeta(result.pagination);
      } catch (error) {
        toast.error("Gagal memuat produk.", {
          description: String(error),
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="text-center">
                  <Skeleton className="mb-3 aspect-square w-full rounded-md" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-6 w-1/2 mx-auto" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
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
                    <div className="bg-muted relative mb-4 aspect-square w-full overflow-hidden rounded-md border">
                      <Image
                        src={image_url}
                        alt={name}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="line-clamp-2 text-xl font-semibold md:text-2xl min-h-[3rem] flex items-center justify-center">
                        {name}
                      </h2>
                      <h2 className="text-primary font-bold text-xl md:text-2xl">
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
      {!isLoading && meta && meta.total > meta.limit && (
        <div className="flex justify-center py-4">
          <GlobalPagination
            currentPage={meta.page}
            totalPages={Math.ceil(meta.total / meta.limit)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsCards;