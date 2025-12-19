"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { deleteItem } from "@/actions/management/delete";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

const DeleteDialog = ({
  id,
  variant,
}: {
  id: string;
  variant: "haircut" | "product";
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteItem(id, variant);
      toast.success(
        `${variant === "haircut" ? "Model potongan rambut" : "Produk"} berhasil dihapus.`,
      );
    } catch (error) {
      toast.error("Gagal menghapus data.", {
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="justify-start gap-3">
          <Trash /> Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Data ${variant === "haircut" ? "model potongan rambut" : "produk"} yang dihapus tidak dapat dikembalikan.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={() => handleDelete()}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash /> Hapus
                </>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
