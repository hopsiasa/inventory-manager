import api from "../utils/axios";
import { Products, Product } from "../types/product";
import { User } from "../types/user";
import { Category } from "../types/category";

const getProducts = async (page: number, pageSize: number) => {
  const response = await api.get<Products>(
    `/products?page=${page}&per_page=${pageSize}`,
  );
  return response.data;
};

const getProduct = async (productId: string | undefined) => {
  const response = await api.get<Product>(`/products/${productId}`);
  return response.data;
};

export const createProduct = async (productData: {
  name: string;
  price: number;
  category_id: string;
  quantity: number;
  description: string;
}) => {
  const response = await api.post<Product>("/products", productData);
  return response.data;
};

export const updateProduct = async ({
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
}) => {
  const response = await api.put<Product>(
    `/products/${productId}`,
    productData,
  );
  return response.data;
};

const deleteProduct = async (productId: string) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};

const productApi = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productApi;
