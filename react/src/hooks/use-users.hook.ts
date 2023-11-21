import * as usersService from "../services/users";
import { useEffect, useState } from "react";
import { UserType } from "../types.ts";
import { useStateContext } from "../contexts/ContextProvider.tsx";

export const useGetUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    setIsLoading(true);

    usersService
      .getUsers()
      .then(({ data }) => {
        setIsLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setIsLoading(false);
        setNotification("Error fetching users. Please try again.");
      });
  }, [setNotification, refresh]);

  const refreshUsers = () => {
    setRefresh(!refresh);
  };

  return { users, refreshUsers, isLoading };
};

export const useGetUser = () => {
  const [user, setUser] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async (id: string) => {
    setIsLoading(true);

    await usersService
      .getUser(id)
      .then((data) => {
        setIsLoading(false);
        setUser(data.data.data);
      })
      .catch(() => setIsLoading(false));
  };

  return { user, getUser, isLoading };
};

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null,
  );
  const { setNotification } = useStateContext();

  const createUser = async (user: UserType) => {
    setIsLoading(true);

    await usersService
      .createUser(user)
      .then(() => {
        setIsLoading(false);
        setNotification("User was successfully created");
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return { createUser, isLoading, errors };
};

export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null,
  );
  const { setNotification } = useStateContext();

  const updateUser = async (user: UserType) => {
    setIsLoading(true);

    await usersService
      .updateUser(user.id, user)
      .then(() => {
        setIsLoading(false);
        setNotification("User was successfully updated");
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return { updateUser, isLoading, errors };
};

export const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useStateContext();

  const deleteUser = async (user: UserType) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setIsLoading(true);

    await usersService
      .deleteUser(user.id)
      .then(() => {
        setIsLoading(false);
        setNotification("User was successfully deleted");
      })
      .catch(() => {
        setNotification("Error deleting user. Please try again.");
      });
  };

  return { deleteUser, isLoading };
};
