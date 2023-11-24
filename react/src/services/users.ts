import axiosClient from "../axios-client.ts";
import { IUserResponse, IUsersResponse } from "../types.ts";

const findAllUsers = async (page: number) => {
  const response = await axiosClient.get<IUsersResponse>(`/users?page=${page}`);
  return response.data;
};

const findUser = async (userId: string | undefined) => {
  const response = await axiosClient.get<IUserResponse>(`/users/${userId}`);
  return response.data;
};

const createUser = async (formData: FormData) => {
  const response = await axiosClient.post<IUserResponse>(`/users`, formData);
  return response.data;
};

const updateUser = async ({
  userId,
  formData,
}: {
  userId: string;
  formData: FormData;
}) => {
  const response = await axiosClient.put<IUserResponse>(
    `/users/${userId}`,
    formData,
  );
  return response.data;
};

const deleteUser = async (userId: string) => {
  const response = await axiosClient.delete(`/users/${userId}`);
  return response.data;
};

const userService = {
  findAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
