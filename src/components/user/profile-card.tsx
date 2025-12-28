import { getProfile, logOutAction } from "@/actions/auth/get-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Shield, UserIcon, LogOut, User } from "lucide-react";
import { getInitials } from "@/features/formatter";
import { redirect } from "next/navigation";
import ConfirmationDialog from "../confirmation-dialog";
import EditedField from "./edited-field";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

const ProfileCard = async () => {
  const user: User = await getProfile();

  if (!user) {
    return redirect("/login");
  }
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col items-center gap-4 pb-2 relative">
        <Avatar className="size-24 border-4 shadow-sm">
          <AvatarImage src="" alt={user.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center text-center">
          <EditedField user={user} />
          <CardDescription className="text-md text-muted-foreground font-medium">
            {user.email}
          </CardDescription>
          <div className="mt-2">
            <Badge
              variant={user.role === "admin" ? "destructive" : "secondary"}
              className="px-3 py-1 capitalize"
            >
              {user.role}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent className="space-y-4">
        <div className="text-muted-foreground mb-2 text-sm font-medium tracking-wider uppercase">
          Detail Akun
        </div>
        <div className="bg-card/50 flex items-center gap-3 rounded-lg border p-3">
          <div className="bg-accent flex h-9 w-9 items-center justify-center rounded-full">
            <UserIcon className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">User ID</span>
            <span className="max-w-[200px] truncate font-mono text-sm font-medium">
              {user.id}
            </span>
          </div>
        </div>
        <div className="bg-card/50 flex items-center gap-3 rounded-lg border p-3">
          <div className="bg-accent flex h-9 w-9 items-center justify-center rounded-full">
            <Mail className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Alamat Email</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
        </div>
        <div className="bg-card/50 flex items-center gap-3 rounded-lg border p-3">
          <div className="bg-accent flex h-9 w-9 items-center justify-center rounded-full">
            <Shield className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Level Akses</span>
            <span className="text-sm font-medium capitalize">
              {user.role} Privilege
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid gap-2 pt-2">
        <ConfirmationDialog
          onConfirm={logOutAction}
          title="Keluar"
          description="Apakah Anda yakin ingin keluar dari akun Anda?"
          confirmText="Keluar"
          cancelText="Batal"
          trigger={
            <Button variant="destructive" className="w-full">
              <LogOut className="mr-2 size-4" />
              Keluar
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
