export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  image_key: string | null;
  stock: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProductType {
  id: string;
  name: string;
  description: string | null;
  stock: number;
  price: number;
  image_url: string | null;
  image_key: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: File;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
