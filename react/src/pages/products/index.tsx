import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { Plus as PlusIcon } from "../../icons/plus";
import { useGetProducts } from "../../hooks/use-products";
import { ProductListTable } from "../../components/product/product-list-table";
import { GridRowParams } from "@mui/x-data-grid";
import { ProductEditForm } from "../../components/product/product-edit-form";

const ProductList: NextPage = () => {
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const { products, isLoading } = useGetProducts(
    paginationModel.page + 1,
    paginationModel.pageSize,
  );

  const [rowCountState, setRowCountState] = useState(
    products?.pagination?.total || 0,
  );

  useEffect(() => {
    setRowCountState((prevRowCountState: number) =>
      products?.pagination?.total !== undefined
        ? products?.pagination?.total
        : prevRowCountState,
    );
  }, [products?.pagination?.total, setRowCountState]);

  return (
    <>
      <Head>
        <title>Product List | Inventory Manager</title>
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
                <Typography variant="h4">Products</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  onClick={() => router.push("/products/new")}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <ProductListTable
              products={products?.data || []}
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

ProductList.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default ProductList;
