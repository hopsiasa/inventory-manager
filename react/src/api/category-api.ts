import api from "../utils/axios";
import { Categories, Category } from "../types/category";

const getCategories = async (page: number, pageSize: number) => {
  const response = await api.get<Categories>(
    `/categories?page=${page}&per_page=${pageSize}`,
  );
  return response.data;
};

const getCategory = async (categoryId: string | undefined) => {
  const response = await api.get<Category>(`/categories/${categoryId}`);
  return response.data;
};

export const createCategory = async (categoryData: {
  name: string;
  description: string;
}) => {
  const response = await api.post<Category>("/categories", categoryData);
  return response.data;
};

export const updateCategory = async ({
  categoryId,
  categoryData,
}: {
  categoryId: string;
  categoryData: {
    name?: string;
    description?: string;
  };
}) => {
  const response = await api.put<Category>(
    `/categories/${categoryId}`,
    categoryData,
  );
  return response.data;
};

const deleteCategory = async (categoryId: string) => {
  const response = await api.delete(`/categories/${categoryId}`);
  return response.data;
};

const categoryApi = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryApi;
