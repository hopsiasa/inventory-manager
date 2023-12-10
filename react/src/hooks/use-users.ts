import { useMutation, useQuery, useQueryClient } from "react-query";
import userApi from "../api/user-api";

export const useGetUsers = (page: number) => {
  const { isLoading, data: users } = useQuery(["users", page], async () => await userApi.getUsers(page), {
    select: (data) => data.data,
  });

  return { users, isLoading };
};

export const useGetUser = (userId: string | undefined) => {
  const { isLoading, data: user } = useQuery(["user", userId], async () => await userApi.getUser(userId));

  return { user, isLoading };
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createUser } = useMutation((user: FormData) => userApi.createUser(user), {
    onSuccess: async () => await queryClient.invalidateQueries(["users"]),
  });

  return { createUser, isLoading };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateUser } = useMutation(
    ({ userId, formData }: { userId: string; formData: FormData }) => userApi.updateUser({ userId, formData }),
    {
      onSuccess: async () => await queryClient.invalidateQueries(["user"]),
    }
  );

  return { updateUser, isLoading };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteUser } = useMutation((id: string) => userApi.deleteUser(id), {
    onSuccess: async () => queryClient.invalidateQueries("users"),
  });

  return { deleteUser };
};
