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
import { Menu } from "lucide-react";

const Navbar = () => {
  const liClass = "hover:text-primary transition-color duration-300";
  const navItems = [
    {
      name: "Beranda",
      url: "/",
    },
    {
      name: "Tentang",
      url: "/#about",
    },
    {
      name: "Model",
      url: "/#models",
    },
    {
      name: "Produk",
      url: "/#products",
    },
    {
      name: "Lokasi",
      url: "/#location",
    },
  ];
  return (
    <nav className="bg-background border-border fixed z-50 flex w-full justify-center border-b py-4 px-5 xl:px-0">
      <div className="container flex items-center justify-between font-mono">
        <div className="text-primary text-2xl font-extrabold">
          <h1>BERGAS</h1>
        </div>
        <div className="flex items-center gap-6 text-lg font-medium">
          <ul className="hidden gap-5 md:flex">
            {navItems.map(({ name, url }) => (
              <li key={name} className={liClass}>
                <Link href={url}>{name}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <ThemeSwitch />
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-mono">
                <DropdownMenuLabel className="font-bold">NAVIGASI</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navItems.map(({ name, url }) => (
                  <DropdownMenuItem key={name} asChild>
                    <Link href={url}>{name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <MobileThemeSwitch />
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
