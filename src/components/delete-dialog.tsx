"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Pastikan path benar
import { Trash, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteDialogProps {
  onDelete: () => Promise<{ success: boolean; message?: string } | void>;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
}

const DeleteDialog = ({
  onDelete,
  title = "Apakah kamu yakin?",
  description = "Data yang dihapus tidak dapat dikembalikan. Tindakan ini bersifat permanen.",
  trigger,
}: DeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await onDelete();
      if (res && typeof res === "object" && "success" in res && !res.success) {
        throw new Error(res.message || "Gagal menghapus");
      }
      toast.success("Berhasil menghapus data.");
      setIsOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus data.", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 justify-start gap-2"
          >
            <Trash className="h-4 w-4" /> Hapus
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash className="h-4 w-4" /> Ya, Hapus
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
