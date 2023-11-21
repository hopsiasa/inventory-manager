import axiosClient from "../axios-client.ts";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getUsers = () =>
  axiosClient.get(`{API_URL}/users`).then((res) => res.data);
