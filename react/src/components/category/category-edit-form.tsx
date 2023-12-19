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
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useDeleteCategory,
  useUpdateCategory,
} from "../../hooks/use-categories";
import type { Category } from "../../types/category";
import { ConfirmationModal } from "../confirmation-modal";
import { Delete } from "@mui/icons-material";

interface CategoryEditFormProps {
  category: Category;
}

export const CategoryEditForm: FC<CategoryEditFormProps> = (props) => {
  const { category, ...other } = props;
  const router = useRouter();
  const categoryId = router.query.categoryId as string;
  const { updateCategory } = useUpdateCategory();
  const { deleteCategory } = useDeleteCategory();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      description: Yup.string().required().label("Description"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const categoryData = {
          name: values.name,
          description: values.description,
        };

        updateCategory({ categoryId, categoryData });

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Category updated!");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleDelete = async (categoryId: string) => {
    try {
      deleteCategory(categoryId);
      setConfirmationModalOpen(false);
      toast.success("Category deleted!");
      router.push("/categories");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit category" />
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
                label="Name"
                name="Description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.description}
                InputLabelProps={{ shrink: true }}
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
          <Link href={`/categories/${category?.id}`} passHref>
            <Button
              disabled={formik.isSubmitting}
              sx={{
                m: 1,
                mr: "auto",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Link>
          <Button
            color="error"
            disabled={formik.isSubmitting}
            onClick={() => setConfirmationModalOpen(true)}
          >
            Delete category
          </Button>
          <ConfirmationModal
            open={isConfirmationModalOpen}
            onClose={() => setConfirmationModalOpen(false)}
            onConfirm={() => handleDelete(category?.id)}
            title="Confirm Deletion"
            message="Are you sure you want to delete this category? This action cannot be undone."
            confirmButtonText="Delete"
          />
        </CardActions>
      </Card>
    </form>
  );
};
