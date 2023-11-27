import { SubmitHandler } from "react-hook-form";
import UserForm from "../../components/Users/UserForm.tsx";
import { useAddUser } from "../../hooks/use-users.hook.ts";
import { IUserRequest } from "../../types.ts";

const AddUser = () => {
  const { createUser, isLoading } = useAddUser();

  const onSubmit: SubmitHandler<IUserRequest> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("role", data.role as string);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);

    createUser(formData);
  };

  return (
    <>
      <h1>New User</h1>
      <div>
        {isLoading && <div className="text-center">Loading ...</div>}
        {!isLoading && <UserForm onSubmit={onSubmit} />}
      </div>
    </>
  );
};

export default AddUser;
