import { getProfile } from '@/actions/auth/get-profile';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Shield, User as UserIcon, LogOut, Settings } from "lucide-react";
import { getInitials } from '@/features/formatter';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

const MyProfilePage = async () => {
  const user: User = await getProfile();

  if (!user) {
    return <div className="p-10 text-center">User not found. Please login.</div>;
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center gap-4 pb-2">
          <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center text-center">
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
            <CardDescription className="text-md font-medium text-muted-foreground">
              {user.email}
            </CardDescription>
            <div className="mt-2">
              <Badge 
                variant={user.role === 'admin' ? 'destructive' : 'secondary'}
                className="capitalize px-3 py-1"
              >
                {user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Detail Akun
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3 bg-card/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">User ID</span>
              <span className="text-sm font-medium font-mono truncate max-w-[200px]">
                {user.id}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3 bg-card/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Email Address</span>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3 bg-card/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <Shield className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Access Level</span>
              <span className="text-sm font-medium capitalize">{user.role} Privilege</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-2 pt-2">
          <Button variant="outline" className="w-full gap-2">
            <Settings className="h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="default" className="w-full gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyProfilePage;