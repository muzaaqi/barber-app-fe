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
import { api } from "@/lib/axios-instance";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { Plus, Trash2, Upload } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import getAuthHeader from "@/features/get-jwt-token";

const AddHaircut = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
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
    setPreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      formData.append("name", name);
      formData.append("description", description);
    }

    if (!formData.has("image") && !formData.has("name")) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/haircuts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Permission-Key": process.env.SECRET_API_KEY || "",
          Authorization: `Bearer ${await getAuthHeader()}`,
        },
      });
      if (res.status === 201) {
        toast.success(`Model ${name} berhasil ditambahkan.`);
        setName("");
        setDescription("");
        setFile(null);
        setPreview("");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Gagal menambahkan model potongan rambut.", {
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Tambah Model
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Model Potongan Rambut</DialogTitle>
            <DialogDescription>
              Tambahkan model potongan rambut baru ke koleksi.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel>Gambar</FieldLabel>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => document.getElementById("image")?.click()}
                className={`grid aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-4 transition ${
                  isDragging
                    ? "border-primary bg-muted"
                    : "border-muted-foreground/30"
                } `}
              >
                {preview && (
                  <Image
                    width={500}
                    height={500}
                    src={preview}
                    alt="Preview"
                    className="mx-auto mb-3 w-full rounded-lg object-cover"
                  />
                )}
                {file ? (
                  <p className="mt-1 text-center text-xs font-medium">
                    {file.name}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload size={40} className="text-muted-foreground" />
                    <p className="text-muted-foreground text-center text-sm">
                      Drag & drop image here, or click to replace
                    </p>
                  </div>
                )}
              </div>
              <Input
                id="image"
                name="image"
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
                name="name"
                type="text"
                placeholder="Middle Cut"
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
                name="description"
                placeholder="Tambahkan deskripsi tentang model potongan rambut ini (maks. 500 karakter)"
                value={description}
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
              {isLoading ? <Spinner /> : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHaircut;
