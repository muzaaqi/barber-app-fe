"use client";

import React, { useState } from "react";
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
          <div className="flex items-center">
            <ArrowLeftRight className="mr-3 h-5 w-5" />
            Transactions
          </div>
          <ChevronRight
            className={cn(
              "text-muted-foreground h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-90",
            )}
          />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-1">
        <Button
          asChild
          variant={
            pathname === "/dashboard/transactions/haircuts"
              ? "secondary"
              : "ghost"
          }
          className="h-9 w-full justify-start pl-11 text-sm"
        >
          <Link href="/dashboard/transactions/haircuts">
            <Scissors className="mr-2 h-4 w-4" />
            Haircuts
          </Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/dashboard/transactions/products"
              ? "secondary"
              : "ghost"
          }
          className="h-9 w-full justify-start pl-11 text-sm"
        >
          <Link href="/dashboard/transactions/products">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Products
          </Link>
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TransactionsNav;
