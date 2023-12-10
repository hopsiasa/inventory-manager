import type { User } from "../types/user";
import api from "../utils/axios";

const getUsers = async (page: number) => {
  const response = await api.get<User>(`/users?page=${page}`);
  return response.data;
};

const getUser = async (userId: string | undefined) => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

export const createUser = async (userData: {
  email: string;
  name: string;
  password: string;
}) => {
  const response = await api.post<User>("/users", userData);
  return response.data;
};

export const updateUser = async ({
  userId,
  userData,
}: {
  userId: string;
  userData: { email?: string; name?: string; password?: string };
}) => {
  const response = await api.put<User>(`/users/${userId}`, userData);
  return response.data;
};

const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

const userApi = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default userApi;
