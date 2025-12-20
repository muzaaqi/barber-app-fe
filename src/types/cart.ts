export type CartItem = {
  cart_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  subtotal: number;
  max_stock: number;
};

export type CartSummary = {
  total_items: number;
  grand_total: number;
};

export type CartResponse = {
  items: CartItem[];
  summary: CartSummary;
};