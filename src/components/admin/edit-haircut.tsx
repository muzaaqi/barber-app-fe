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
import { Pencil } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";

const EditHaircut = ({ id, haircut_name, haircut_description, image_url } : { id: number; haircut_name: string; haircut_description: string; image_url: string }) => {
  const [name, setName] = useState(haircut_name);
  const [description, setDescription] = useState(haircut_description);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (selected: File | null) => {
    if (!selected) return;
    if (!selected.type.startsWith("image/")) return;
    setFile(selected);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
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

    if (!formData.has("image") === false && !formData.has("name") === false) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/haircuts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        window.location.reload();

      }
    } catch (error) {
      console.error("Error submitting haircut:", error);
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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Haircut Model</DialogTitle>
            <DialogDescription>
              Add a new haircut model to the collection.
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
                onClick={() => document.getElementById("image")?.click()}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${isDragging ? "border-primary bg-muted" : "border-muted-foreground/30"} `}
              >
                <p className="text-muted-foreground text-sm">
                  Drag & drop image here, or click to select
                </p>
                {file && (
                  <p className="mt-2 text-sm font-medium">{file.name}</p>
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
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
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
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="A stylish middle cut"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>{isLoading ? <Spinner /> : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHaircut;
