import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";
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
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center px-4">
      <Empty>
        <EmptyHeader className="items-center text-center">
          <EmptyMedia className="bg-primary/10 text-primary mb-4 flex items-center justify-center rounded-full p-4">
            <FileQuestion className="h-12 w-12" />
          </EmptyMedia>
          <EmptyTitle className="text-foreground text-3xl font-bold tracking-tight">
            Halaman Tidak Ditemukan
          </EmptyTitle>
          <EmptyDescription className="text-muted-foreground mt-2 max-w-[400px] text-lg">
            Maaf, kami tidak dapat menemukan halaman yang Anda cari. Mungkin URL
            salah atau halaman telah dihapus.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-8 flex justify-center">
          <Button asChild size="lg" className="gap-2 font-semibold">
            <Link href="/">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
