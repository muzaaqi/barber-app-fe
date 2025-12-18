import { Scissors, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "../theme-switch";
import TransactionsNav from "./transactions-nav";

const Sidebar = () => {
  const navItems = [
    {
      name: "Haircuts",
      url: "/dashboard/haircuts",
      icon: <Scissors />,
    },
    {
      name: "Products",
      url: "/dashboard/products",
      icon: <ShoppingBasket />,
    },
  ];
  return (
    <div className="bg-popover fixed z-10 flex min-h-svh w-15 flex-col justify-between">
      <div>
        <ul>
          <li>
            <TransactionsNav />
          </li>
          {navItems.map((item) => (
            <li
              key={item.name}
              className="hover:bg-accent hover:text-accent-foreground p-4"
            >
              <Link href={item.url}>{item.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex justify-center p-4">
          <ThemeSwitch />
        </div>
        <div className="hover:bg-accent hover:text-accent-foreground p-4">
          <Image
            src="/default_avatar.svg"
            alt="Default Avatar"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
