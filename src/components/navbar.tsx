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
import { LucideHamburger } from "lucide-react";

const Navbar = () => {
  const liClass = "hover:text-primary transition-color duration-300";
  const navItems = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Menu",
      url: "/#menu",
    },
    {
      name: "Crew",
      url: "/#crew",
    },
    {
      name: "Vibe",
      url: "/#vibe",
    },
    {
      name: "Location",
      url: "/#location",
    },
  ];
  return (
    <nav className="bg-background border-border fixed z-50 flex w-full justify-center border-b py-4">
      <div className="container flex items-center justify-between px-5 font-mono">
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
                <LucideHamburger />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-mono">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
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
