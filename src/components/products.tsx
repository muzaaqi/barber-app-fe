"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts } from "@/actions/management/product-actions";
import { formatIDR } from "@/features/formatter";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ButtonGroup } from "./ui/button-group";
import { Skeleton } from "./ui/skeleton";
import { PaginationMeta, ProductType } from "@/types";
import ProductDialog from "./user/product-dialog";
import AddToCartButton from "./user/add-to-cart-btn";
import GlobalPagination from "@/components/global-pagination";
import { PackageOpen } from "lucide-react";

const ProductsCards = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState<ProductType[]>([]);
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

  if (!isLoading && products.length === 0) {
    return (
      <div className="col-span-full py-20">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageOpen className="text-muted-foreground h-10 w-10" />
            </EmptyMedia>
            <EmptyTitle>Produk Tidak Ditemukan</EmptyTitle>
            <EmptyDescription>
              Saat ini belum ada produk yang tersedia di katalog kami.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="py-3 md:py-6">
                <CardContent className="text-center px-3 md:px-6">
                  <Skeleton className="mb-3 aspect-square w-full rounded-md" />
                  <Skeleton className="mx-auto mb-2 h-6 w-3/4" />
                  <Skeleton className="mx-auto h-6 w-1/2" />
                </CardContent>
                <CardFooter className="px-3 md:px-6">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          : products.map(
              ({ id, name, description, stock, price, image_url }) => (
                <Link
                  href={`/services/product/${id}`}
                  key={id}
                  className="no-underline"
                >
                  <Card className="hover:border-primary flex h-full flex-col justify-between py-3 transition-colors duration-300 md:py-6">
                    <CardContent className="px-3 text-center md:px-6">
                      <div className="bg-muted relative mb-4 aspect-square w-full overflow-hidden rounded-md border">
                        <Image
                          src={image_url}
                          alt={name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="line-clamp-2 flex min-h-[3rem] items-center justify-center text-xl font-semibold md:text-2xl">
                          {name}
                        </h2>
                        <h2 className="text-primary text-xl font-bold md:text-2xl">
                          {formatIDR(price)}
                        </h2>
                      </div>
                    </CardContent>
                    <CardFooter className="px-3 md:px-6">
                      <ButtonGroup className="flex w-full gap-2 p-0">
                        <AddToCartButton productId={id} />
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="pointer-events-none w-full md:pointer-events-auto"
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
              ),
            )}
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
