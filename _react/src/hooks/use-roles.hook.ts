import { useQuery } from "react-query";
import rolesService from "../services/roles.ts";

const useGetRoles = () => {
  const { isLoading, data: roles } = useQuery("roles", async () =>
    rolesService.getRoles(),
  );

  return { roles, isLoading };
};

export default useGetRoles;
