import type { Metadata } from "next";
import { JetBrains_Mono, Oswald } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ScrollTop } from "@/components/scroll-top";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { getProfile } from "@/actions/auth/get-profile";
import { SocketListener } from "@/components/user/socket-listener";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BERGAS - Barber Shop",
  description: "BERGAS Barber Shop - Your Style, Our Passion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getProfile();
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${oswald.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AuthProvider user={user}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <SocketListener />
            <Toaster />
            <ScrollTop />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
