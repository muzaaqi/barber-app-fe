"use client";

import { useState, DragEvent } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { jwtBergasAPI } from "@/lib/axios-instance";
import { Pencil, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  id: string;
  haircut_name: string;
  haircut_description: string;
  image_url: string;
};

const EditHaircut = ({
  id,
  haircut_name,
  haircut_description,
  image_url,
}: Props) => {
  const [name, setName] = useState(haircut_name);
  const [description, setDescription] = useState(haircut_description);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(image_url);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (selected: File | null) => {
    if (!selected) return;
    if (!selected.type.startsWith("image/")) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0] || null);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(image_url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await jwtBergasAPI.put(`/haircuts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success(`Model ${name} berhasil diperbarui.`);
        window.location.reload();
      }
    } catch (err) {
      toast.error("Gagal memperbarui model.", {
        description: String(err),
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start gap-3">
          <Pencil /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Haircut Model</DialogTitle>
            <DialogDescription>
              Ubah detail model potongan rambut.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FieldLabel>Image</FieldLabel>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => document.getElementById(`image-${id}`)?.click()}
                className={`aspect-square cursor-pointer rounded-xl border-2 border-dashed p-4 transition ${
                  isDragging
                    ? "border-primary bg-muted"
                    : "border-muted-foreground/30"
                } `}
              >
                <Image
                  width={500}
                  height={500}
                  src={preview}
                  alt="Preview"
                  className="mx-auto mb-3 w-full rounded-lg object-cover"
                />
                {file ? (
                  <p className="mt-1 text-center text-xs font-medium">
                    {file.name}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-muted-foreground text-center text-sm">
                      Drag & drop image here, or click to replace
                    </p>
                  </div>
                )}
              </div>
              <Input
                id={`image-${id}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] || null)}
              />
              {file && (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-destructive mt-2 w-full gap-2"
                  onClick={handleRemoveImage}
                >
                  <Trash2 size={16} /> Hapus Gambar
                </Button>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Nama</FieldLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
              <Textarea
                id="description"
                rows={5}
                value={description}
                placeholder="Ubah deskripsi tentang model potongan rambut ini (maks. 255 karakter)"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading}>
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? <Spinner /> : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHaircut;
