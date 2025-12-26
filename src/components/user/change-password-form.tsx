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
import { AlertCircle, Lock, Save } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Field, FieldGroup } from "../ui/field";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { changePassword } from "@/actions/auth/get-profile";
import { toast } from "sonner";
import ConfirmationDialog from "../confirmation-dialog";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmAction = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      const msg = "Semua field harus diisi.";
      setErrorMessage(msg);
      return { success: false, message: msg };
    }

    if (newPassword !== confirmPassword) {
      const msg = "Password baru dan konfirmasi tidak sesuai.";
      setErrorMessage(msg);
      return { success: false, message: msg };
    }

    setErrorMessage("");

    const payload = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    try {
      const res = await changePassword(payload);

      if (res.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Password berhasil diubah!");
      } else {
        setErrorMessage(res.message);
      }
      return res;
    } catch {
      setErrorMessage("Terjadi kesalahan sistem.");
      return { success: false, message: "Terjadi kesalahan sistem." };
    }
  };
  const isFormInvalid = !currentPassword || !newPassword || !confirmPassword;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
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
                  className="pl-9"
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
                  className="pl-9"
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
                  className="pl-9"
                  placeholder="Konfirmasi password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <ConfirmationDialog
            onConfirm={handleConfirmAction}
            title="Simpan Password Baru?"
            description="Pastikan password baru Anda sudah dicatat. Anda harus login ulang setelah ini jika sesi habis."
            confirmText="Simpan Perubahan"
            variant="default"
            trigger={
              <Button
                type="button"
                className="w-full gap-2"
                disabled={isFormInvalid}
              >
                <Save className="h-4 w-4" />
                Ubah Password
              </Button>
            }
          />
        </CardFooter>
      </Card>
    </form>
  );
};

export default ChangePasswordForm;
