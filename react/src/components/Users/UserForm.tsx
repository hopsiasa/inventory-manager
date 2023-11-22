import { FormHelperText, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IUserRequest, IUserResponse } from "../../types.ts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface UserFormProps {
  onSubmit: SubmitHandler<IUserRequest>;
  defaultValues?: IUserResponse | undefined;
}

const defaultValues: IUserRequest = {
  name: "",
  email: "",
  role: [],
  permissions: [],
  password: "",
  password_confirmation: "",
};

const UserForm = (props: UserFormProps) => {
  const { id } = useParams();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IUserRequest>({
    defaultValues: id ? props.defaultValues : defaultValues,
  });

  const onSubmit: SubmitHandler<IUserRequest> = (data) => {
    props.onSubmit(data);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField {...field} label="Name" fullWidth sx={{ mb: "1rem" }} />
        )}
      />
      <FormHelperText error={!!errors["name"]}>
        {errors["name"] ? errors["name"].message : ""}
      </FormHelperText>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField {...field} label="Email" fullWidth sx={{ mb: "1rem" }} />
        )}
      />
      <FormHelperText error={!!errors["email"]}>
        {errors["email"] ? errors["email"].message : ""}
      </FormHelperText>

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type={"password"}
            fullWidth
            sx={{ mb: "1rem" }}
          />
        )}
      />
      <FormHelperText error={!!errors["password"]}>
        {errors["password"] ? errors["password"].message : ""}
      </FormHelperText>

      <Controller
        control={control}
        name="password_confirmation"
        render={({ field }) => (
          <TextField
            {...field}
            label="Password Confirmation"
            type={"password"}
            fullWidth
            sx={{ mb: "1rem" }}
          />
        )}
      />
      <FormHelperText error={!!errors["password_confirmation"]}>
        {errors["password_confirmation"]
          ? errors["password_confirmation"].message
          : ""}
      </FormHelperText>

      <button className="btn" type="submit">
        Save
      </button>
    </form>
  );
};

export default UserForm;
