"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios-instance";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import HaircutDialog from "./user/haircut-dialog";
import Link from "next/link";

type Haircut = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

const Haircuts = () => {
  const [haircuts, setHaircuts] = useState<Haircut[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHaircuts = async () => {
      try {
        const res = await api.get("/haircuts");
        setHaircuts(res.data.data.data);
      } catch (error) {
        toast.error("Gagal memuat potongan rambut.", {
          description: String(error),
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchHaircuts();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {isLoading || !haircuts
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
        : haircuts.map(({ id, name, image_url, description }) => (
            <Link
              href={`/services/haircut/${id}`}
              key={id}
              className="no-underline"
            >
              <Card className="hover:border-primary transition-colors duration-300">
                <CardContent className="text-center">
                  <Image
                    src={image_url}
                    alt={name}
                    width={1000}
                    height={1000}
                  />
                  <h2 className="text-xl font-semibold md:text-2xl">{name}</h2>
                </CardContent>
                <CardFooter>
                  <div
                    className="w-full pointer-events-none md:pointer-events-auto"
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
  );
};

export default Haircuts;
