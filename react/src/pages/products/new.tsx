import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { ProductCreateForm } from "../../components/product/product-create-form";

const ProductCreate: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Product Create | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Create a new product</Typography>
            <Breadcrumbs separator="/" sx={{ mt: 1 }}>
              <Link href="/dashboard" passHref>
                <Typography variant="subtitle2">Dashboard</Typography>
              </Link>
              <Link href="/dashboard" passHref>
                <Typography color="primary" variant="subtitle2">
                  Management
                </Typography>
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Products
              </Typography>
            </Breadcrumbs>
          </Box>
          <ProductCreateForm />
        </Container>
      </Box>
    </>
  );
};

ProductCreate.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default ProductCreate;
