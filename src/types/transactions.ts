type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
};

type HaircutTransaction = {
  id: string;
  reservation_time: string;
  payment_status: string;
  reservation_status: string;
  hairwash: boolean;
  total_price: number;
  haircut: {
    name: string;
    image_url: string;
  };
};

type HaircutPayload = {
  haircut_id: string;
  reservation_time: string;
  payment_method: string;
  payment_status: string;
  hairwash: boolean;
  total_price: number;
};

type ProductTransactionItem = {
  id: string;
  quantity: number;
  price_at_purchase: number;
  subtotal: number;
  product_id: string;
  product_name: string;
  product_image: string;
};

type ProductTransaction = {
  id: string;
  created_at: string;
  payment_status: string;
  expedition_status: string;
  expedition_service: string;
  total_price: number;
  items: ProductTransactionItem[];
};

type ProductPayload = {
  product_id: string;
  quantity: number;
  payment_method: string;
  payment_status: string;
  expedition_service: string;
  shipping_address: string;
  total_price: number;
};

export type {
  PaginationMeta,
  HaircutTransaction,
  HaircutPayload,
  ProductTransaction,
  ProductTransactionItem,
  ProductPayload,
};
