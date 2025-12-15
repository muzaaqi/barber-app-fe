"use client";

import Haircuts from "@/components/haircuts";
import Products from "@/components/productss";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useSearchParams, useRouter } from "next/navigation";

const ServicesPage = () => {
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
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
      <div className={`${servicePage === "POTONG" ? "block" : "hidden"} container`}>
        <Haircuts />
      </div>
      <div className={`${servicePage === "PRODUK" ? "block" : "hidden"} container`}>
        <Products />
      </div>
    </div>
  );
};

export default ServicesPage;
