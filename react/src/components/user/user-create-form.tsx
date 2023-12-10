import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import router from "next/router";
import { register } from "numeral";
import type { FC } from "react";
import * as Yup from "yup";
import { useAddUser } from "../../hooks/use-users";
import type { User } from "../../types/user";

interface UserEditFormProps {
  user: User;
}

export const UserCreateForm: FC<UserEditFormProps> = (props) => {
  const { user, ...other } = props;
  const { createUser, isLoading } = useAddUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().min(8).max(255).required("Password is required"),
      password_confirmation: Yup.string()
        .min(8)
        .max(255)
        .required("Please re-type your password")
        .oneOf([Yup.ref("password"), null], "Passwords does not match"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        createUser(values);

        const returnUrl =
          (router.query.returnUrl as string | undefined) || "/users";
        router.push(returnUrl).catch(console.error);
      } catch (err) {
        console.error(err);

        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        error={Boolean(formik.touched.name && formik.errors.name)}
        fullWidth
        helperText={formik.touched.name && formik.errors.name}
        label="Name"
        margin="normal"
        name="name"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <TextField
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Email Address"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
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
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </form>
  );
};
