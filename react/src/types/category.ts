export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;

  [key: string]: any;
}

export interface Categories extends Category {
  data: Category[];
}
