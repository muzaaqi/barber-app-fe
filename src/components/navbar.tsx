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

const Navbar = () => {
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
      name: "Model",
      url: "/#models",
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
      <div className="container flex items-center justify-between font-mono">
        <div className="text-primary text-2xl font-extrabold">
          <Link href="/">
            <h1>BERGAS</h1>
          </Link>
        </div>
        <div className="flex items-center gap-6 text-lg font-medium">
          <ul className="hidden gap-5 md:flex">
            {navItems.map(({ name, url }) => (
              <li key={name} className={liClass}>
                <Link href={url}>{name}</Link>
              </li>
            ))}
          </ul>
          <div>
          </div>
          <div className="hidden gap-3 md:flex">
            <AuthButton />
            <ThemeSwitch />
          </div>
          <div className="md:hidden">
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
                <DropdownMenuItem asChild>
                  <MobileAuthButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
