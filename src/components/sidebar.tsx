import {ArrowLeftRight, Scissors, ShoppingBasket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeSwitch } from "./theme-switch"

const Sidebar = () => {
  const navItems = [
    {
      name: 'Transactions',
      url: '/dashboard/transactions',
      icon: <ArrowLeftRight />
    },
    {
      name: 'Haircuts',
      url: '/dashboard/haircuts',
      icon: <Scissors />
    },
    {
      name: 'Products',
      url: '/dashboard/products',
      icon: <ShoppingBasket />
    }
  ]
  return (
    <div className="min-h-svh w-15 bg-popover justify-between flex flex-col fixed z-10">
      <div>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="p-4 hover:bg-accent hover:text-accent-foreground">
              <Link href={item.url}>{item.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="p-4 flex justify-center">
          <ThemeSwitch />
        </div>
        <div className="p-4 hover:bg-accent hover:text-accent-foreground">
          <Image src="/default_avatar.svg" alt="Default Avatar" width={40} height={40} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar