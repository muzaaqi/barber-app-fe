"use client";

import { Suspense } from "react";
import HaircutsCards from "@/components/haircuts";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useSearchParams, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import ProductsCards from "@/components/products";

const ServicesContent = () => {
  const params = useSearchParams();
  const router = useRouter();

  const option = params.get("options");
  const servicePage: "POTONG" | "PRODUK" =
    option === "products" ? "PRODUK" : "POTONG";

  const handleSwitch = (page: "POTONG" | "PRODUK") => {
    const option = page === "PRODUK" ? "products" : "haircuts";
    router.push(`?options=${option}`, { scroll: false });
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 pt-5 px-5">
      <ButtonGroup>
        <Button
          onClick={() => handleSwitch("POTONG")}
          variant={servicePage === "POTONG" ? "default" : "secondary"}
        >
          POTONG
        </Button>
        <Button
          onClick={() => handleSwitch("PRODUK")}
          variant={servicePage === "PRODUK" ? "default" : "secondary"}
        >
          PRODUK
        </Button>
      </ButtonGroup>
      <div
        className={`${servicePage === "POTONG" ? "block" : "hidden"} container`}
      >
        <HaircutsCards />
      </div>
      <div
        className={`${servicePage === "PRODUK" ? "block" : "hidden"} container`}
      >
        <ProductsCards />
      </div>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-svh w-svw items-center justify-center text-center">
          <Spinner />
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
};

export default ServicesPage;
