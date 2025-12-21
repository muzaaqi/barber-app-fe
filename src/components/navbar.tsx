import Link from "next/link";
import { MobileThemeSwitch } from "./theme-switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Info,
  Scissors,
  Menu,
  MapPin,
  ShoppingCart,
  LayoutDashboard,
  Clock,
} from "lucide-react";
import { AuthButton, MobileAuthButton } from "./auth-button";
import { getProfile } from "@/actions/auth/get-profile";
import { getCartData } from "@/actions/management/cart-actions";
import { Badge } from "./ui/badge";
const Navbar = async () => {
  const user = await getProfile();
  const cartItems = await getCartData();
  const liClass = "hover:text-primary transition-color duration-300";
  const navItems = [
    {
      name: "Beranda",
      url: "/",
      icon: <Home />,
    },
    {
      name: "Tentang",
      url: "/#about",
      icon: <Info />,
    },
    {
      name: "Services",
      url: "/#services",
      icon: <Scissors />,
    },
    {
      name: "Lokasi",
      url: "/#location",
      icon: <MapPin />,
    },
  ];
  return (
    <nav className="bg-background/50 border-border fixed z-50 flex w-full justify-center border-b py-4 backdrop-blur-sm">
      <div className="flex w-full justify-between px-5 font-mono lg:grid lg:grid-cols-3">
        <div className="text-primary flex items-center text-2xl font-extrabold">
          <Link href="/">
            <h1>BERGAS</h1>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 text-lg font-medium">
          <ul className="hidden gap-5 lg:flex">
            {navItems.map(({ name, url }) => (
              <li key={name} className={liClass}>
                <Link href={url}>{name}</Link>
              </li>
            ))}
          </ul>
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-mono" align="end">
                <DropdownMenuLabel className="font-bold">
                  NAVIGASI
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navItems.map(({ name, url, icon }) => (
                  <DropdownMenuItem key={name} asChild>
                    <Link href={url}>
                      {icon}
                      {name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {user?.role === "admin" ? (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  user?.role === "user" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/me/history">
                          <Clock /> Riwayat
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/me/cart"
                          className="group justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <ShoppingCart /> Troli
                          </div>
                          {cartItems?.data && cartItems.data.items.length > 0 && (
                            <Badge
                              variant="secondary"
                              className="group-hover:bg-primary group-hover:text-primary-foreground flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-[10px] transition-colors"
                            >
                              {cartItems.data.items.length}
                            </Badge>
                          )}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )
                )}
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
        </div>
        <div className="hidden items-center justify-end gap-3 lg:flex">
          <AuthButton user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
