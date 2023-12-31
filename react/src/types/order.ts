import { User } from "./user";
import { Product } from "./product";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitAmount: number;
}

export type OrderStatus = "canceled" | "complete" | "pending" | "rejected";

export interface Order {
  id: string;
  created_at: string;
  customer: string;
  items?: OrderItem[];
  status: OrderStatus;
  total?: number;
  paid?: number;
  remaining_amount?: number;
  description: string;

  [key: string]: any;
}

export interface Orders extends Order {
  data: Order[];
}

export interface OrderProducts {
  id: string;
  order_id: string;
  order: Order;
  product: Product;
  quantity: number;
  created_at: string;
  updated_at: string;

  [key: string]: any;
}
