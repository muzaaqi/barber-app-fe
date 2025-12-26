import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { addToCart } from "@/actions/management/cart-actions";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddToCartButton = ({ productId }: { productId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);

    try {
      const res = await addToCart(productId, 1);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success("Produk berhasil ditambahkan ke troli", {
        action: {
          label: "Lihat Troli",
          onClick: () => {
            router.push("/me/cart");
          },
        },
      });
    } catch {
      toast.error("Gagal menambahkan ke troli");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleAddToCart}
      disabled={isSubmitting}
      className="pointer-events-auto w-fit"
    >
      {isSubmitting ? <Spinner /> : <ShoppingCart className="h-4 w-4" />}
    </Button>
  );
};

export default AddToCartButton;
