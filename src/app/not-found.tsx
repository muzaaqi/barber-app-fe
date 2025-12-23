import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Waypoints, MoveLeft, Home } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <Empty className="relative z-10 max-w-lg">
        <EmptyHeader className="mb-6">
          <EmptyMedia className="mb-2 h-auto w-auto overflow-visible rounded-none bg-transparent p-0">
            <div className="relative flex items-center justify-center">
              <h1 className="text-primary/10 text-[10rem] leading-none font-black tracking-tighter select-none md:text-[14rem]">
                404
              </h1>
              <div className="bg-card ring-border border-primary/20 absolute flex items-center justify-center rounded-full border-t p-6 shadow-2xl ring-1">
                <Waypoints
                  className="text-primary h-16 w-16 animate-pulse"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </EmptyMedia>
          <EmptyTitle className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Halaman Hilang
          </EmptyTitle>
          <EmptyDescription className="text-muted-foreground mx-auto mt-4 max-w-sm text-lg">
            Waduh, sepertinya Anda tersesat di antah berantah. Halaman yang Anda
            cari tidak dapat ditemukan.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/20 hover:bg-primary/5 hover:text-primary w-full gap-2 sm:w-auto"
          >
            <Link href="/">
              <MoveLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="shadow-primary/20 w-full gap-2 shadow-lg sm:w-auto"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Ke Beranda
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>
  );
}
