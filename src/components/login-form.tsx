"use client";
import { cn } from "@/lib/utils";
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
import Link from "next/link";
import { useState } from "react";
import { loginAction } from "@/actions/auth/login";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Lock, Mail } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Semua field wajib diisi.");
      return;
    }

    setLoginLoading(true);

    try {
      const result = await loginAction(email, password);

      if (result.success) {
        toast.success("Berhasil masuk.");
        router.push("/");
      } else {
        setErrorMessage(result.message);
      }
    } catch {
      setErrorMessage("Tidak dapat login!");
    } finally {
      setLoginLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-primary text-3xl font-bold">
            Masuk
          </CardTitle>
          <CardDescription>
            Masukkan detail Anda untuk masuk ke akun Anda
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
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
                <Button type="submit" disabled={loginLoading}>
                  {loginLoading ? <><Spinner /> Masuk...</> : "Masuk"}
                </Button>
                <FieldDescription className="text-center">
                  Tidak punya akun?{" "}
                  <Link href="/signup">Daftar</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
