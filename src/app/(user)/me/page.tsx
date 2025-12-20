import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  UserIcon,
  Lock,
} from "lucide-react";
import ProfileCard from "@/components/user/profile-card";
import ChangePasswordForm from "@/components/user/change-password-form";

const MyProfilePage = async () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-muted/20">
      <Tabs defaultValue="profile" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="profile"><UserIcon /> Profil</TabsTrigger>
          <TabsTrigger value="security"><Lock /> Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileCard />
        </TabsContent>
        <TabsContent value="security">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProfilePage;