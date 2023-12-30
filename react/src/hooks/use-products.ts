import { useMutation, useQuery, useQueryClient } from "react-query";
import productApi from "../api/product-api";
import { Category } from "../types/category";
import { User } from "../types/user";

export const useGetProducts = (page: number, pageSize: number) => {
  const { isLoading, data: products } = useQuery(
    ["products", page, pageSize],
    async () => await productApi.getProducts(page, pageSize),
  );

  return { products, isLoading };
};

export const useGetProduct = (productId: string | undefined) => {
  const { isLoading, data: product } = useQuery(
    ["product", productId],
    async () => await productApi.getProduct(productId),
  );

  return { product, isLoading };
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createProduct } = useMutation(
    (productData: {
      name: string;
      price: number;
      category_id: string;
      quantity: number;
      description: string;
    }) => productApi.createProduct(productData),
    {
      onSuccess: async () => await queryClient.invalidateQueries(["products"]),
    },
  );

  return { createProduct, isLoading };
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateProduct } = useMutation(
    ({
      productId,
      productData,
    }: {
      productId: string;
      productData: {
        name?: string;
        price?: number;
        category_id?: string;
        quantity?: number;
        description?: string;
      };
    }) => productApi.updateProduct({ productId, productData }),
    {
      onSuccess: async () => await queryClient.invalidateQueries(["product"]),
    },
  );

  return { updateProduct, isLoading };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct } = useMutation(
    (id: string) => productApi.deleteProduct(id),
    {
      onSuccess: async () => queryClient.invalidateQueries("products"),
    },
  );

  return { deleteProduct };
};
