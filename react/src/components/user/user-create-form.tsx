import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import router from "next/router";
import type { FC } from "react";
import * as Yup from "yup";
import { useAddUser } from "../../hooks/use-users";
import { Role } from "../../types/role";

interface UserCreateFormProps {
  roles: Role[];
}

export const UserCreateForm: FC<UserCreateFormProps> = (props) => {
  const { roles } = props;
  const { createUser, isLoading } = useAddUser();

  const formik = useFormik({
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
        .required("Email is required")
        .label("Email"),
      name: Yup.string().max(255).required("Name is required").label("Name"),
      role: Yup.string().required().label("Role"),
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
      <Card>
        <CardHeader title="Create new user" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
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
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                select
                name="role"
                label="Role"
                value={formik.values.role}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.role && formik.errors.role}
                error={Boolean(formik.touched.role && formik.errors.role)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                fullWidth
              >
                {roles?.length ? (
                  roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>loading...</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item md={4} xs={12}>
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
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
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
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {formik.errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Box>
            )}
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
            sx={{ m: 1 }}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
