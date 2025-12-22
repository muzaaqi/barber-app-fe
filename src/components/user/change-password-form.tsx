"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { AlertCircle, Lock } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Field, FieldGroup } from "../ui/field";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { changePassword } from "@/actions/auth/get-profile";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Semua field harus diisi.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Password baru dan konfirmasi tidak sesuai.");
      setIsLoading(false);
      return;
    }
    setErrorMessage("");
    const payload = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    try {
      const res = await changePassword(payload);
      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        toast.success(res.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan saat mengubah password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">Ubah Password</CardTitle>
          <CardDescription>
            Pastikan password Anda kuat dan aman.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert
              variant="destructive"
              className="animate-in fade-in slide-in-from-top-1 mt-3"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gagal</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <FieldGroup>
            <Field>
              <Label htmlFor="current-password">Password Saat Ini</Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="current-password"
                  type="password"
                  className="pl-9 py-6"
                  placeholder="Masukkan password saat ini"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </Field>
            <Field>
              <Label htmlFor="new-password">Password Baru</Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="new-password"
                  type="password"
                  className="pl-9 py-6"
                  placeholder="Masukkan password baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </Field>
            <Field>
              <Label htmlFor="confirm-password">Konfirmasi Password</Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="confirm-password"
                  type="password"
                  className="pl-9 py-6"
                  placeholder="Konfirmasi password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Perbarui Password"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ChangePasswordForm;
