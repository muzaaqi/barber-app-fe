"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  Scissors,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const TransactionsNav = () => {
  const pathname = usePathname();
  const isActiveParent = pathname.startsWith("/dashboard/transactions");
  const [isOpen, setIsOpen] = useState(isActiveParent);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-1"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant={isActiveParent ? "secondary" : "ghost"}
          className="group w-full justify-between font-medium"
        >
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="h-4 w-4" />
            <span>Transaksi</span>
          </div>
          <ChevronRight
            className={cn(
              "text-muted-foreground h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-6 mt-1 flex flex-col space-y-1 border-l border-border pl-3">
          <Button
            asChild
            variant={
              pathname === "/dashboard/transactions/haircuts"
                ? "secondary"
                : "ghost"
            }
            className="h-8 w-full justify-start text-sm font-normal"
          >
            <Link href="/dashboard/transactions/haircuts">
              <Scissors className="mr-2 h-4 w-4 text-muted-foreground" />
              Potong Rambut
            </Link>
          </Button>
          <Button
            asChild
            variant={
              pathname === "/dashboard/transactions/products"
                ? "secondary"
                : "ghost"
            }
            className="h-8 w-full justify-start text-sm font-normal"
          >
            <Link href="/dashboard/transactions/products">
              <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
              Produk
            </Link>
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TransactionsNav;