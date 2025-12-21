"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Pastikan Anda punya utilitas cn dari shadcn
import {
  Scissors,
  ShoppingBasket,
  Menu,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimpleThemeSwitch } from "../theme-switch";
import TransactionsNav from "./transactions-nav";

const navItems = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
  },
  {
    name: "Haircuts",
    url: "/dashboard/haircuts",
    icon: <Scissors className="mr-3 h-5 w-5" />,
  },
  {
    name: "Products",
    url: "/dashboard/products",
    icon: <ShoppingBasket className="mr-3 h-5 w-5" />,
  },
];

const SidebarContent = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between py-4">
      <div className="space-y-4">
        <div className="px-6 py-2">
          <h2 className="text-primary text-2xl font-bold tracking-tight">
            BERGAS
          </h2>
        </div>
        <Separator />
        <ScrollArea className="px-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start font-medium",
                    isActive && "bg-secondary text-secondary-foreground",
                  )}
                >
                  <Link href={item.url}>
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              );
            })}
            <TransactionsNav />
          </div>
        </ScrollArea>
      </div>
      <div className="space-y-4 px-4">
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src="/default_avatar.svg" alt="User" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin</span>
              <span className="text-muted-foreground text-xs">
                View Profile
              </span>
            </div>
          </div>
          <SimpleThemeSwitch />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 p-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      <aside className="bg-background fixed top-0 left-0 z-30 hidden h-screen w-64 flex-col border-r md:flex">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
