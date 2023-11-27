import { useParams } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import UserForm from "../../components/Users/UserForm.tsx";
import { useGetUser, useUpdateUser } from "../../hooks/use-users.hook.ts";
import { IUserRequest } from "../../types.ts";

const EditUser = () => {
  const { id } = useParams();

  // const [user, setUser] = useState(defaultValues);

  const { isLoading: isUserLoading, user } = useGetUser(id);
  const { isLoading: isUpdateUserLoading, updateUser } = useUpdateUser();
  // Read each isLoading state and convert them to a component-level value
  const isLoading = isUpdateUserLoading || isUserLoading;

  const onSubmit: SubmitHandler<IUserRequest> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("role", JSON.stringify(data.role));
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);

    const userId = user?.id !== null && user?.id !== undefined ? user.id : "";

    updateUser({ userId, formData });
  };

  return (
    <>
      <h1>{`Update user: ${user?.name}`}</h1>
      <div>
        {isLoading && <div className="text-center">Loading ...</div>}
        {!isLoading && <UserForm onSubmit={onSubmit} user={user} />}
      </div>
    </>
  );
};

export default EditUser;
