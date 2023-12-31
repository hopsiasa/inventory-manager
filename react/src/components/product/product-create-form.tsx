import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import type { File } from "../file-dropzone";
import { FileDropzone } from "../file-dropzone";
import { QuillEditor } from "../quill-editor";
import { useGetCategories } from "../../hooks/use-categories";
import { Category } from "../../types/category";
import { useAddProduct } from "../../hooks/use-products";

interface ProductCreateFormProps {
  categories: Category[];
}

export const ProductCreateForm: FC<ProductCreateFormProps> = (props) => {
  const router = useRouter();
  // const [files, setFiles] = useState<File[]>([]);
  const { categories, isLoading } = useGetCategories();
  const { createProduct } = useAddProduct();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      category_id: "",
      description: "",
      quantity: 0,
      // images: [],
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(),
      price: Yup.number().min(0).required(),
      category_id: Yup.string(),
      description: Yup.string().max(5000),
      quantity: Yup.number().min(0).required(),
      // images: Yup.array(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        createProduct(values);
        toast.success("Product created!");
        router.push("/products").catch(console.error);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  // const handleDrop = (newFiles: File[]): void => {
  //   setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  // };
  //
  // const handleRemove = (file: File): void => {
  //   setFiles((prevFiles) =>
  //     prevFiles.filter((_file) => _file.path !== file.path),
  //   );
  // };
  //
  // const handleRemoveAll = (): void => {
  //   setFiles([]);
  // };

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Product Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={4} xs={12}></Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.description && formik.errors.description,
                )}
                fullWidth
                helperText={
                  formik.touched.description && formik.errors.description
                }
                label="Description"
                name="description"
                rows={4}
                multiline
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                InputLabelProps={{ shrink: true }}
              />
              {Boolean(
                formik.touched.description && formik.errors.description,
              ) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
            </Grid>
            <Grid item md={4} xs={12}></Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(formik.touched.price && formik.errors.quantity)}
                fullWidth
                label="Quantity"
                name="quantity"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="number"
                value={formik.values.quantity}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/*<Card sx={{ mt: 3 }}>*/}
      {/*  <CardContent>*/}
      {/*    <Grid container spacing={3}>*/}
      {/*      <Grid item md={4} xs={12}>*/}
      {/*        <Typography variant="h6">Images</Typography>*/}
      {/*        <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>*/}
      {/*          Images will appear in the store front of your website.*/}
      {/*        </Typography>*/}
      {/*      </Grid>*/}
      {/*      <Grid item md={8} xs={12}>*/}
      {/*        <FileDropzone*/}
      {/*          accept={{*/}
      {/*            "image/*": [],*/}
      {/*          }}*/}
      {/*          files={files}*/}
      {/*          onDrop={handleDrop}*/}
      {/*          onRemove={handleRemove}*/}
      {/*          onRemoveAll={handleRemoveAll}*/}
      {/*        />*/}
      {/*      </Grid>*/}
      {/*    </Grid>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Pricing</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(formik.touched.price && formik.errors.price)}
                fullWidth
                label="Price"
                name="price"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="number"
                value={formik.values.price}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Category</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.category_id && formik.errors.category_id,
                )}
                fullWidth
                label="Category"
                name="category_id"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.category_id}
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              >
                {isLoading ? (
                  <MenuItem value="">loading...</MenuItem>
                ) : categories?.data?.length ? (
                  categories.data.map((category: Category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No categories available</MenuItem>
                )}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          // justifyContent: "space-between",
          mx: -1,
          mb: -1,
          mt: 3,
        }}
      >
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          Create
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => router.push("/products")}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};
