import { useMutation, useQuery, useQueryClient } from "react-query";
import categoryApi from "../api/category-api";

export const useGetCategories = (page: number, pageSize: number) => {
  const { isLoading, data: categories } = useQuery(
    ["categories", page, pageSize],
    async () => await categoryApi.getCategories(page, pageSize),
  );

  return { categories, isLoading };
};

export const useGetCategory = (categoryId: string | undefined) => {
  const { isLoading, data: category } = useQuery(
    ["category", categoryId],
    async () => await categoryApi.getCategory(categoryId),
  );

  return { category, isLoading };
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createCategory } = useMutation(
    (categoryData: { name: string; description: string }) =>
      categoryApi.createCategory(categoryData),
    {
      onSuccess: async () =>
        await queryClient.invalidateQueries(["categories"]),
    },
  );

  return { createCategory, isLoading };
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateCategory } = useMutation(
    ({
      categoryId,
      categoryData,
    }: {
      categoryId: string;
      categoryData: {
        name?: string;
        description?: string;
      };
    }) => categoryApi.updateCategory({ categoryId, categoryData }),
    {
      onSuccess: async () => await queryClient.invalidateQueries(["category"]),
    },
  );

  return { updateCategory, isLoading };
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory } = useMutation(
    (id: string) => categoryApi.deleteCategory(id),
    {
      onSuccess: async () => queryClient.invalidateQueries("categories"),
    },
  );

  return { deleteCategory };
};
