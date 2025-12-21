import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getInitials } from "@/features/formatter";
import {
  Clock,
  LayoutDashboard,
  LogOutIcon,
  Palette,
  ShoppingCart,
  UserIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { logOutAction } from "@/actions/auth/get-profile";
import { Separator } from "./ui/separator";
import { getCartData } from "@/actions/management/cart-actions";
import { GroupThemeSwitch } from "./theme-switch";

export default async function AuthButton({
  user,
}: {
  user?: { name: string; email: string; role: string };
}) {
  const cartItems = await getCartData();
  return user ? (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-12 rounded-full p-0 hover:bg-transparent"
        >
          <Avatar className="hover:border-primary aspect-square size-10 cursor-pointer border shadow-sm transition-all hover:scale-105">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          {cartItems && cartItems.items.length > 0 && (
            <span className="bg-primary absolute top-0 right-0 size-3 rounded-full border-2 border-white"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center gap-3 p-4">
          <Avatar className="size-12 border shadow-sm">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5 overflow-hidden">
            <p className="truncate text-sm font-bold">{user.name}</p>
            <p className="text-muted-foreground truncate text-xs font-medium">
              {user.email}
            </p>
          </div>
        </div>
        <Separator />
        <div className="space-y-1 p-2">
          <Link href="/me" passHref>
            <Button
              variant="ghost"
              className="h-10 w-full justify-start px-2 font-normal"
            >
              <div className="flex items-center">
                <UserIcon className="text-muted-foreground mr-3 size-4" />
                Profil Saya
              </div>
            </Button>
          </Link>
          {user.role === "admin" && (
            <Link href="/dashboard" passHref>
              <Button
                variant="ghost"
                className="group h-10 w-full justify-between px-2 font-normal"
              >
                <div className="flex items-center">
                  <LayoutDashboard className="text-muted-foreground mr-3 size-4" />
                  Dashboard
                </div>
              </Button>
            </Link>
          )}
          { user?.role === "user" &&
            <>
              <Link href="/me/history" passHref>
                <Button
                  variant="ghost"
                  className="group h-10 w-full justify-between px-2 font-normal"
                >
                  <div className="flex items-center">
                    <Clock className="text-muted-foreground mr-3 size-4" />
                    Riwayat
                  </div>
                </Button>
              </Link>
              <Link href="/me/cart" passHref>
                <Button
                  variant="ghost"
                  className="group h-10 w-full justify-between px-2 font-normal"
                >
                  <div className="flex items-center">
                    <ShoppingCart className="text-muted-foreground mr-3 size-4" />
                    Troli
                  </div>
                  {cartItems && cartItems.items.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="group-hover:bg-primary group-hover:text-primary-foreground flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-[10px] transition-colors"
                    >
                      {cartItems.items.length}
                    </Badge>
                  )}
                </Button>
              </Link>
            </>
          }
          <div className="flex h-10 w-full items-center justify-between px-2 font-normal">
            <div className="flex items-center">
              <Palette className="text-muted-foreground mr-3 size-4" />
              Tema
            </div>
            <GroupThemeSwitch />
          </div>
        </div>
        <Separator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive h-10 w-full justify-start px-2 hover:bg-red-50"
            onClick={logOutAction}
          >
            <LogOutIcon className="mr-3 size-4" />
            Keluar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <ButtonGroup className="flex gap-2 hover:bg-transparent">
      <Link href="/login">
        <Button variant="default" className="w-full">
          Masuk
        </Button>
      </Link>
      <Link href="/signup">
        <Button variant="outline" className="w-full">
          Daftar
        </Button>
      </Link>
    </ButtonGroup>
  );
}

const MobileAuthButton = async ({
  user,
}: {
  user?: { name: string; email: string; role: string };
}) => {
  return (
    <>
      {user ? (
        <Link href="/me">
          <div className="flex gap-2">
            <div className="flex items-center">
              <Image
                src="/default_avatar.svg"
                alt="User Avatar"
                width={40}
                height={40}
                className="aspect-square rounded-full object-cover"
              />
            </div>
            <div>
              <span>{user.name}</span>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>
        </Link>
      ) : (
        <ButtonGroup className="w-full flex-col gap-2">
          <Link href="/login">
            <Button variant="default" className="w-full">
              Masuk
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="w-full">
              Daftar
            </Button>
          </Link>
        </ButtonGroup>
      )}
    </>
  );
};

export { AuthButton, MobileAuthButton };
