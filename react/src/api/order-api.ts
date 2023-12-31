import api from "../utils/axios";
import { Order, Orders, OrderProducts } from "../types/order";

const getOrders = async (page: number, pageSize: number) => {
  const response = await api.get<Orders>(
    `/orders?page=${page}&per_page=${pageSize}`,
  );
  return response.data;
};

const getOrderProducts = async (
  orderId: string | undefined,
  page: number,
  pageSize: number,
) => {
  const response = await api.get<OrderProducts>(
    `/order-products/${orderId}?page=${page}&per_page=${pageSize}`,
  );
  return response.data;
};

const getOrder = async (orderId: string | undefined) => {
  const response = await api.get<Order>(`/orders/${orderId}`);
  return response.data;
};

export const createOrder = async (orderData: {
  product_id: string;
  customer?: string;
  quantity: number;
  status: number;
  total?: number;
  paid?: number;
  remaining_amount?: number;
  description?: string;
  user_id: string;
}) => {
  const response = await api.post<Order>("/orders", orderData);
  return response.data;
};

export const updateOrder = async ({
  orderId,
  orderData,
}: {
  orderId: string;
  orderData: {
    product_id?: string;
    customer?: string;
    quantity?: number;
    status?: number;
    total?: number;
    paid?: number;
    remaining_amount?: number;
    description?: string;
    user_id?: string;
  };
}) => {
  const response = await api.put<Order>(`/orders/${orderId}`, orderData);
  return response.data;
};

const deleteOrder = async (orderId: string) => {
  const response = await api.delete(`/orders/${orderId}`);
  return response.data;
};

const orderApi = {
  getOrders,
  getOrderProducts,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};

export default orderApi;
