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
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import router from "next/router";
import type { FC } from "react";
import * as Yup from "yup";
import { useAddCategory } from "../../hooks/use-categories";

export const CategoryCreateForm: FC = (props) => {
  const { createCategory, isLoading } = useAddCategory();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required").label("Name"),
      description: Yup.string().label("Description"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        createCategory(values);

        const returnUrl =
          (router.query.returnUrl as string | undefined) || "/categories";
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
        <CardHeader title="Create new category" />
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
                error={Boolean(
                  formik.touched.description && formik.errors.description,
                )}
                fullWidth
                helperText={
                  formik.touched.description && formik.errors.description
                }
                label="Description"
                margin="normal"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="description"
                value={formik.values.description}
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
