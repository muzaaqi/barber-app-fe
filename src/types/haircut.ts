export interface Haircut {
  id: string;
  name: string;
  description: string | null;
  image_url: string;
  image_key?: string;
  choosen_count?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface CreateHaircutPayload {
  name: string;
  description: string;
  image: File;
}

export type UpdateHaircutPayload = Partial<CreateHaircutPayload>;
