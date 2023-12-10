import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { ro } from "date-fns/locale";
import { useFormik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDeleteUser, useUpdateUser } from "../../hooks/use-users";
import type { User } from "../../types/user";
import { wait } from "../../utils/wait";

interface UserEditFormProps {
  user: User;
}

export const UserEditForm: FC<UserEditFormProps> = (props) => {
  const { user, ...other } = props;
  const router = useRouter();
  const userId = router.query.userId as string;
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      name: user?.name || "",
      password: user?.password || "",
      password_confirmation: user?.password_confirmation || "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().min(8).max(255),
      password_confirmation: Yup.string()
        .min(8)
        .max(255)
        .oneOf([Yup.ref("password"), null], "Passwords does not match"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const userData = {
          email: values.email,
          name: values.name,
          ...(values.password && { password: values.password }),
          ...(values.password_confirmation && {
            password_confirmation: values.password_confirmation,
          }),
        };

        updateUser({ userId, userData });

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("User updated!");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleDelete = async (userId: string) => {
    try {
      deleteUser(userId);
      toast.success("User deleted!");
      // Redirect or handle success as needed
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit user" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.password_confirmation &&
                    formik.errors.password_confirmation
                )}
                fullWidth
                helperText={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
                label="Password Confirmation"
                margin="normal"
                name="password_confirmation"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password_confirmation}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            Update
          </Button>
          <NextLink href={`/users/${user.id}`} passHref>
            <Button
              component="a"
              disabled={formik.isSubmitting}
              sx={{
                m: 1,
                mr: "auto",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </NextLink>
          <Button
            color="error"
            disabled={formik.isSubmitting}
            onClick={() => handleDelete(user.id)}
          >
            Delete user
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
