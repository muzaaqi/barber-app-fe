"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import Link from "next/link";
import { registerAction } from "@/actions/auth/register";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Lock, Mail, User } from "lucide-react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Semua field wajib diisi!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password tidak cocok!");
      return;
    }

    setRegisterLoading(true);

    try {
      const res = await registerAction(name, email, password);

      if (res.success) {
        toast.success("Akun berhasil dibuat. Silakan masuk.");
        router.push("/login");
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage("Tidak dapat melakukan registrasi");
    } finally {
      setRegisterLoading(false);
    }
  };
  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-primary text-3xl font-bold">
          Sign Up
        </CardTitle>
        <CardDescription>
          Masukkan detail Anda untuk membuat akun baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert
            variant="destructive"
            className="animate-in fade-in slide-in-from-top-1 mb-3"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Gagal Masuk</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nama</FieldLabel>
              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="name"
                  type="text"
                  className="pl-9"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9"
                  placeholder="Masukkan password saat ini"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Konfirmasi Password
              </FieldLabel>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="confirm-password"
                  type="password"
                  className="pl-9"
                  placeholder="Masukkan password saat ini"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <FieldDescription>Konfirmasi password anda</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={registerLoading}>
                  {registerLoading ? <><Spinner /> Membuat Akun...</> : "Buat Akun"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Sudah punya akun? <Link href="/login">Masuk</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
