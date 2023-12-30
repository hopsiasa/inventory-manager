import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Chip, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { Layout } from "../../../components/layout/layout";
import { ProductEditForm } from "../../../components/product/product-edit-form";
import { useGetProduct } from "../../../hooks/use-products";
import { getInitials } from "../../../utils/get-initials";

const ProductEdit: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { product, isLoading: isProductLoading } = useGetProduct(
    productId as string,
  );

  if (!product) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Product Edit | Inventory Manager</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <Link href="/products" passHref>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                Products
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Avatar
              // src={product?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(product?.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {product?.name}
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="subtitle2">product_id:</Typography>
                <Chip label={product?.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <ProductEditForm product={product || {}} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProductEdit.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default ProductEdit;
