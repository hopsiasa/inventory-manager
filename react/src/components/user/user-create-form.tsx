import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import router from "next/router";
import type { FC } from "react";
import * as Yup from "yup";
import { useAddUser } from "../../hooks/use-users";
import type { UserRequest } from "../../types/user";

interface FormValues extends UserRequest {
  password: string;
  password_confirmation: string;
  submit: null | string;
}
export const UserCreateForm: FC = () => {
  const { createUser, isLoading } = useAddUser();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      name: "",
      role: "",
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
      role: Yup.string()
        .required()
        .oneOf(["Programming", "Design"])
        .label("Role"),
      password: Yup.string()
        .min(8)
        .max(255)
        .required("Password is required")
        .label("Password"),
      password_confirmation: Yup.string()
        .min(8)
        .max(255)
        .required("Please re-type your password")
        .oneOf([Yup.ref("password"), null], "Passwords does not match")
        .label("Password Confirmation"),
    }),
    onSubmit: async (
      values: FormValues,
      helpers: FormikHelpers<FormValues>
    ): Promise<void> => {
      try {
        const { submit, password, password_confirmation, ...user } = values;
        createUser({ ...user, password });

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
    <form noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Create new user" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={formik.handleChange}
                required
                value={formik.values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={formik.handleChange}
                required
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink>Role</InputLabel>
                <Select label="Role" notched>
                  <MenuItem value="programming">Programming</MenuItem>
                  <MenuItem value="design">Design</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={formik.handleChange}
                required
                value={formik.values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Password Confirmation"
                name="password_confirmation"
                onChange={formik.handleChange}
                required
                value={formik.values.password_confirmation}
                variant="outlined"
              />
            </Grid>
          </Grid>
          {formik.errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              disabled={formik.isSubmitting}
              size="large"
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};
