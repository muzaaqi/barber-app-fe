"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Scissors,
  ShoppingBasket,
  Menu,
  LayoutDashboard,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { getProfile } from "@/actions/auth/get-profile";
import { Skeleton } from "../ui/skeleton";
import ProfilePopover from "../user/profile-popover";

const navItems = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
  },
  {
    name: "Pengguna",
    url: "/dashboard/users",
    icon: <User className="mr-3 h-5 w-5" />,
  },
  {
    name: "Model Rambut",
    url: "/dashboard/haircuts",
    icon: <Scissors className="mr-3 h-5 w-5" />,
  },
  {
    name: "Produk",
    url: "/dashboard/products",
    icon: <ShoppingBasket className="mr-3 h-5 w-5" />,
  },
];

const SidebarContent = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await getProfile();
      setUser(user);
      setIsLoading(false);
    };
    getCurrentUser();
  }, []);

  return (
    <div className="flex h-full flex-col justify-between py-4">
      <div className="space-y-4">
        <div className="px-6 py-2">
          <Link
            href="/"
            className="text-primary text-2xl font-bold tracking-tight"
          >
            BERGAS
          </Link>
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
      <div className="space-y-4">
        <Separator />
        <div className="flex items-center justify-between px-3">
          {!isLoading && user ? (
            <div className="flex items-center gap-3">
              <ProfilePopover user={user} cartItems={null} />
              <div>
                <p className="text-sm leading-none font-medium">{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
            </div>
          ) : (
            <Skeleton className="h-10 w-full rounded-md" />
          )}
          <SimpleThemeSwitch />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 p-4 lg:hidden">
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
      <aside className="bg-background fixed top-0 left-0 z-30 hidden h-screen w-64 flex-col border-r lg:flex">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
