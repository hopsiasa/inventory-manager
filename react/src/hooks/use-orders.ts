import { useMutation, useQuery, useQueryClient } from "react-query";
import orderApi from "../api/order-api";

export const useGetOrders = (page: number = 1, pageSize: number = 25) => {
  const { isLoading, data: orders } = useQuery(
    ["orders", page, pageSize],
    async () => await orderApi.getOrders(page, pageSize),
  );

  return { orders, isLoading };
};

export const useGetOrder = (orderId: string | undefined) => {
  const { isLoading, data: order } = useQuery(
    ["order", orderId],
    async () => await orderApi.getOrder(orderId),
  );

  return { order, isLoading };
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createOrder } = useMutation(
    (orderData: {
      product_id: string;
      customer?: string;
      quantity: number;
      status: number;
      total?: number;
      paid?: number;
      remaining_amount?: number;
      description?: string;
      user_id: string;
    }) => orderApi.createOrder(orderData),
    {
      onSuccess: async () => await queryClient.invalidateQueries(["orders"]),
    },
  );

  return { createOrder, isLoading };
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateOrder } = useMutation(
    ({
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
    }) => orderApi.updateOrder({ orderId, orderData }),
    {
      onSuccess: async () => await queryClient.invalidateQueries(["order"]),
    },
  );

  return { updateOrder, isLoading };
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteOrder } = useMutation(
    (id: string) => orderApi.deleteOrder(id),
    {
      onSuccess: async () => queryClient.invalidateQueries("orders"),
    },
  );

  return { deleteOrder };
};
