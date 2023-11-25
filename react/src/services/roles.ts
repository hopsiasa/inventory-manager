import axiosClient from "../axios-client.ts";
import { IRoleResponse } from "../types.ts";

const getRoles = async () => {
  const response = await axiosClient.get<IRoleResponse>("/roles");
  return response.data;
};

const rolesService = {
  getRoles,
};

export default rolesService;
