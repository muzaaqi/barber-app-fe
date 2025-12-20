import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/features/formatter";

export default async function AuthButton({
  user,
}: {
  user?: { name: string; email: string; role: string };
}) {
  return (
    <>
      {user ? (
        <Link href="/me">
          <div className="flex gap-2">
            <div className="text-right">
              <span>{user.name}</span>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            <div className="flex items-center">
              <Avatar className="aspect-square size-12 border shadow-sm">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Link>
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
      )}
    </>
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
