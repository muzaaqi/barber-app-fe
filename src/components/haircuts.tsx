"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { getAllHaircuts } from "@/actions/management/haircut-actions";
import { PaginationMeta, Haircut } from "@/types";
import HaircutDialog from "./user/haircut-dialog";
import GlobalPagination from "@/components/global-pagination";
import { SearchX } from "lucide-react";

const HaircutsCards = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [haircuts, setHaircuts] = useState<Haircut[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHaircuts = async () => {
      setIsLoading(true);
      try {
        const res = await getAllHaircuts(page, 8);
        if (res && res.data) {
          setHaircuts(res.data);
          setMeta(res.pagination);
        }
      } catch (error) {
        toast.error("Gagal memuat potongan rambut.", {
          description: String(error),
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchHaircuts();
  }, [page]);

  if (!isLoading && haircuts.length === 0) {
    return (
      <div className="col-span-full py-20">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX className="text-muted-foreground h-10 w-10" />
            </EmptyMedia>
            <EmptyTitle>Layanan Tidak Tersedia</EmptyTitle>
            <EmptyDescription>
              Belum ada model potongan rambut yang ditambahkan.
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
              <Card key={index} className="flex flex-col justify-between py-3 md:py-6">
                <CardContent className="text-center px-3 md:px-6">
                  <Skeleton className="mb-3 aspect-square w-full rounded-md" />
                  <Skeleton className="mx-auto h-6 w-3/4" />
                </CardContent>
                <CardFooter className="px-3 md:px-6">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          : haircuts.map(({ id, name, image_url, description }) => (
              <Link
                href={`/services/haircut/${id}`}
                key={id}
                className="no-underline"
              >
                <Card className="hover:border-primary flex h-full flex-col justify-between transition-colors duration-300 py-3 md:py-6">
                  <CardContent className="text-center px-3 md:px-6">
                    <div className="bg-muted relative mb-4 aspect-square w-full overflow-hidden rounded-md border">
                      <Image
                        src={image_url}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h2 className="line-clamp-1 text-lg font-semibold md:text-xl">
                      {name}
                    </h2>
                  </CardContent>
                  <CardFooter className="px-3 md:px-6">
                    <div
                      className="pointer-events-none w-full md:pointer-events-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <HaircutDialog
                        id={id}
                        name={name}
                        image_url={image_url}
                        description={description}
                      />
                    </div>
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

export default HaircutsCards;
