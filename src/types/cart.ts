import { PaymentMethod, PaymentStatus } from "./transactions";

export interface CartItem {
  cart_id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
  subtotal: number;
  max_stock: number;
}

export interface CartSummary {
  total_items: number;
  grand_total: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data?: {
    items: CartItem[];
    summary: CartSummary;
  };
}

export interface CartCheckoutPayload {
  shipping_address: string;
  expedition_service: string;
  expedition_cost: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
}
