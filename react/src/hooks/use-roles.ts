import { useQuery } from "react-query";
import roleApi from "../api/role-api";

export const useGetRoles = () => {
  const { isLoading, data: roles } = useQuery(
    ["roles"],
    async () => await roleApi.getRoles()
  );

  return { roles, isLoading };
};
