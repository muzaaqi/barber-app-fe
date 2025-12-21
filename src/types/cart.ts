type CartItem = {
  cart_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  subtotal: number;
  max_stock: number;
};

type CartSummary = {
  total_items: number;
  grand_total: number;
};

type CartResponse = {
  success: boolean;
  message: string;
  data?: {
    items: CartItem[];
    summary: CartSummary;
  };
};

type CartCheckoutPayload = {
  shipping_address: string;
  expedition_service: string;
  payment_method: string | "cod" | "qris";
  payment_status: string | "paid" | "unpaid";
};

export type { CartItem, CartSummary, CartResponse, CartCheckoutPayload };
