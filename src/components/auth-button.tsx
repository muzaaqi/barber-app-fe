import Link from "next/link";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import ProfilePopover from "./user/profile-popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/features/formatter";
import { CartResponse } from "@/types/cart";

export default async function AuthButton({
  user, cartItems,
}: {
  user?: { name: string; email: string; role: string } | null ; 
  cartItems?: CartResponse | null ;
}) {
  return user ? (
    <ProfilePopover user={user} cartItems={cartItems} />
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
  user?: { name: string; email: string; role: string } | null ;
}) => {
  return (
    <>
      {user ? (
        <Link href="/me">
          <div className="flex gap-2">
            <div className="flex items-center">
              <Avatar className="hover:border-primary aspect-square size-10 cursor-pointer border shadow-sm transition-all hover:scale-105">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="dark:bg-primary/20 bg-primary/50 dark:text-primary text-foreground font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
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
