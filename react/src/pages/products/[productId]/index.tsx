import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetProduct } from "src/hooks/use-products";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { Layout } from "../../../components/layout/layout";
import { ProductBasicDetails } from "../../../components/product/product-basic-details";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import { getInitials } from "../../../utils/get-initials";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { product, isLoading } = useGetProduct(productId as string);

  if (!product) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Product Details | Inventory Manager</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <div>
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
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <Avatar
                  // src={product.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  {getInitials(product.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{product.name}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">product_id:</Typography>
                    <Chip label={product.id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <Link href={`/products/${product.id}/edit`} passHref>
                  <Button
                    endIcon={<PencilAltIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ProductBasicDetails
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  user={product.user}
                  category={product.category}
                  description={product.description}
                  dateCreated={product.created_at}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProductDetails.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default ProductDetails;
