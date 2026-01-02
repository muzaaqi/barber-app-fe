export type PaymentStatus = "paid" | "unpaid" | "pending" | string;
export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";
export type ExpeditionStatus =
  | "pending"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentMethod = "cash" | "cod" | "qris" | string;

export interface HaircutTransaction {
  id: string;
  user_id: string;
  haircut_id: string;
  hairwash: boolean;
  total_price: number;
  reservation_time: string;
  reservation_status: ReservationStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  receipt_url: string | null;
  receipt_key: string | null;
  created_at: string;
  updated_at: string;
  haircut: {
    name: string;
    image_url: string;
  };
  user: {
    name: string;
    email: string;
    image_url?: string;
  };
}

export interface HaircutPayload {
  haircut_id: string;
  reservation_time: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  hairwash: boolean | string;
  total_price: number;
}

export interface ProductTransactionItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price_at_purchase: number;
  subtotal: number;
}

export interface ProductTransaction {
  id: string;
  user_id: string;
  total_price: number;
  expedition_cost: number;
  shipping_address: string;
  expedition_service: string;
  expedition_status: ExpeditionStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  receipt_url: string | null;
  receipt_key: string | null;
  created_at: string;
  updated_at: string;
  items: ProductTransactionItem[];
  user: {
    name: string;
    email: string;
    image_url?: string;
  };
}

export interface ProductPayload {
  product_id?: string;
  quantity?: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  expedition_service: string;
  expedition_cost: number;
  shipping_address: string;
}

export interface HaircutTransactionResponse {
  success: boolean;
  message: string;
  data: HaircutTransaction;
}

export interface HaircutTransactionsListResponse {
  success: boolean;
  message: string;
  data: HaircutTransaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ProductTransactionResponse {
  success: boolean;
  message: string;
  data: ProductTransaction;
}

export interface ProductTransactionsListResponse {
  success: boolean;
  message: string;
  data: ProductTransaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
