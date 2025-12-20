import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Lock } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ChangePasswordForm = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="current-password"
              type="password"
              className="pl-9"
              placeholder="Enter current password"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="new-password"
              type="password"
              className="pl-9"
              placeholder="Enter new password"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="confirm-password"
              type="password"
              className="pl-9"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 pt-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Update Password</Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordForm;
