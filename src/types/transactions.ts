export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
};

export type HaircutTransaction = {
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

export type ProductTransactionItem = {
  id: string;
  quantity: number;
  price_at_purchase: number;
  subtotal: number;
  product_id: string;
  product_name: string;
  product_image: string;
};

export type ProductTransaction = {
  id: string;
  created_at: string;
  payment_status: string;
  expedition_status: string;
  expedition_service: string;
  total_price: number;
  items: ProductTransactionItem[];
};