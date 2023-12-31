import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { CategoryCreateForm } from "../../components/category/category-create-form";

const CategoryCreate: NextPage = () => {
  return (
    <>
      <Head>
        <title>Category Create | Inventory Manager</title>
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
            <Link href="/categories" passHref>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                Categories
              </Typography>
            </Link>
          </Box>
          <Box mt={3}>
            <CategoryCreateForm />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CategoryCreate.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default CategoryCreate;
