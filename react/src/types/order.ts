import { User } from "./user";

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
