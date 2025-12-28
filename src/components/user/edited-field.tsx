"use client";
import { CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, SquarePen, X } from "lucide-react";
import { Input } from "../ui/input";
import { ButtonGroup } from "../ui/button-group";
import { updateProfile } from "@/actions/auth/get-profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

const EditedField = ({ user }: { user: { name: string } }) => {
  const [name, setName] = useState(user.name);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === user.name || name.trim() === "") {
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await updateProfile({ name: name.trim() });
      if (res.success) {
        toast.success("Nama berhasil diperbarui.");
        setIsEditing(false);
        router.refresh();
        return;
      }
    } catch {
      toast.error("Gagal memperbarui nama.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <CardTitle className="text-2xl font-bold">
      {isEditing ? (
        <div className="grid items-center gap-2">
          <form onSubmit={handleSubmit}>
            <Input
              className="text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ButtonGroup className="absolute top-0 right-5">
              <Button variant="destructive" onClick={() => setIsEditing(false)}>
                <X />
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : <Check />}
              </Button>
            </ButtonGroup>
          </form>
        </div>
      ) : (
        <>
          {name}
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground absolute"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <SquarePen />
          </Button>
        </>
      )}
    </CardTitle>
  );
};

export default EditedField;
