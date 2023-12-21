import { User } from "./user";
import { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  price: number;
  category_id: Category;
  user: User;
  quantity: number;
  description: string;
  created_at: string;
  updated_at: string;

  [key: string]: any;
}

export interface Products extends Product {
  data: Product[];
}
