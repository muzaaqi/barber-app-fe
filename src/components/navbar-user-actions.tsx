"use client";

import Link from "next/link";
import { useAuth } from "@/providers/auth-provider"; // Gunakan hook yang baru kita buat
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Clock,
  ShoppingCart,
  Menu,
  Info,
  Scissors,
  MapPin,
  Home,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { MobileThemeSwitch } from "./theme-switch";
import { AuthButton, MobileAuthButton } from "./auth-button";
import { CartResponse } from "@/types/cart";

interface NavbarUserActionsProps {
  cartItems: CartResponse | null;
}

export const NavbarUserActions = ({ cartItems }: NavbarUserActionsProps) => {
  const { user } = useAuth();

  const navItems = [
    { name: "Beranda", url: "/", icon: <Home /> },
    { name: "Tentang", url: "/#about", icon: <Info /> },
    { name: "Services", url: "/#services", icon: <Scissors /> },
    { name: "Lokasi", url: "/#location", icon: <MapPin /> },
  ];

  return (
    <>
      <div className="hidden items-center justify-end gap-3 lg:flex">
        <AuthButton user={user} cartItems={cartItems}/>
      </div>

      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-mono" align="end">
            <DropdownMenuLabel className="font-bold">
              NAVIGASI
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {navItems.map(({ name, url, icon }) => (
              <DropdownMenuItem key={name} asChild>
                <Link href={url} className="flex gap-2">
                  {icon} {name}
                </Link>
              </DropdownMenuItem>
            ))}
            {user?.role === "admin" ? (
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutDashboard /> Dashboard
                </Link>
              </DropdownMenuItem>
            ) : user?.role === "user" ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/me/history">
                    <Clock /> Riwayat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/me/cart"
                    className="group flex w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart /> Troli
                    </div>
                    {cartItems?.data && cartItems.data.items.length > 0 && (
                      <Badge variant="secondary">
                        {cartItems.data.items.length}
                      </Badge>
                    )}
                  </Link>
                </DropdownMenuItem>
              </>
            ) : null}

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <MobileThemeSwitch />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MobileAuthButton user={user} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
