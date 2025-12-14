import Link from "next/link";
import { ThemeSwitch, MobileThemeSwitch } from "./theme-switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Info, Scissors, Menu, MapPin, Package } from "lucide-react";
import { AuthButton, MobileAuthButton } from "./auth-button";
const Navbar = async () => {
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
      name: "Produk",
      url: "/#products",
      icon: <Package />,
    },
    {
      name: "Lokasi",
      url: "/#location",
      icon: <MapPin />,
    },
  ];
  return (
    <nav className="bg-background/50 border-border fixed z-50 flex w-full justify-center border-b px-5 py-4 backdrop-blur-sm xl:px-0">
      <div className="container flex justify-between font-mono lg:grid lg:grid-cols-3">
        <div className="text-primary text-2xl font-extrabold">
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
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <MobileThemeSwitch />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MobileAuthButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="hidden items-center justify-end gap-3 lg:flex">
          <AuthButton />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
