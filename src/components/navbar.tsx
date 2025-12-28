import Link from "next/link";
import { Home, Info, Scissors, MapPin } from "lucide-react";
import { getCartData } from "@/actions/management/cart-actions";
import { NavbarUserActions } from "./navbar-user-actions";

const Navbar = async () => {
  const cartItems = await getCartData();

  const liClass = "hover:text-primary transition-color duration-300";
  const navItems = [
    { name: "Beranda", url: "/", icon: <Home /> },
    { name: "Tentang", url: "/#about", icon: <Info /> },
    { name: "Services", url: "/#services", icon: <Scissors /> },
    { name: "Lokasi", url: "/#location", icon: <MapPin /> },
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
        </div>
        <div className="flex items-center justify-end">
          <NavbarUserActions cartItems={cartItems?.success ? cartItems : null} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
