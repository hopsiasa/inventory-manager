import { Role } from "../types/role";
import api from "../utils/axios";

const getRoles = async () => {
  const response = await api.get<Role[]>(`/roles`);
  return response.data;
};

const roleApi = {
  getRoles,
};

export default roleApi;
