import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { Plus as PlusIcon } from "../../icons/plus";
import { useGetOrders } from "../../hooks/use-orders";
import { OrderListTable } from "../../components/order/order-list-table";

const OrderList: NextPage = () => {
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const { orders, isLoading } = useGetOrders(
    paginationModel.page + 1,
    paginationModel.pageSize,
  );
  const [rowCountState, setRowCountState] = useState(
    orders?.pagination?.total || 0,
  );

  useEffect(() => {
    setRowCountState((prevRowCountState: number) =>
      orders?.pagination?.total !== undefined
        ? orders?.pagination?.total
        : prevRowCountState,
    );
  }, [orders?.pagination?.total, setRowCountState]);

  return (
    <>
      <Head>
        <title>Order List | Inventory Manager</title>
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
                <Typography variant="h4">Orders</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  onClick={() => router.push("/orders/new")}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <OrderListTable
              orders={orders?.data || []}
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

OrderList.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default OrderList;
