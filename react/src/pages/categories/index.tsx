import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { Plus as PlusIcon } from "../../icons/plus";
import { useGetCategories } from "../../hooks/use-categories";
import { CategoryListTable } from "../../components/category/category-list-table";

const CategoryList: NextPage = () => {
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const { categories, isLoading } = useGetCategories(
    paginationModel.page + 1,
    paginationModel.pageSize,
  );
  const [rowCountState, setRowCountState] = useState(
    categories?.pagination?.total || 0,
  );

  useEffect(() => {
    setRowCountState((prevRowCountState: number) =>
      categories?.pagination?.total !== undefined
        ? categories?.pagination?.total
        : prevRowCountState,
    );
  }, [categories?.pagination?.total, setRowCountState]);

  return (
    <>
      <Head>
        <title>Category List | Inventory Manager</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Categories</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  onClick={() => router.push("/categories/new")}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <CategoryListTable
              categories={categories?.data || []}
              rowCount={rowCountState}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              isLoading={isLoading}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

CategoryList.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default CategoryList;
