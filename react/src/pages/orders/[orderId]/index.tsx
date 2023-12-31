import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { Layout } from "../../../components/layout/layout";
import { OrderItems } from "../../../components/order/order-items";
import { OrderLogs } from "../../../components/order/order-logs";
import { OrderSummary } from "../../../components/order/order-summary";
import { Calendar as CalendarIcon } from "../../../icons/calendar";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import { useRouter } from "next/router";
import { useGetOrder, useGetOrderProducts } from "../../../hooks/use-orders";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const OrderDetails: NextPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { order, isLoading: isOrderLoading } = useGetOrder(orderId as string);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const { orderProducts, isLoading: isOrderProductsLoading } =
    useGetOrderProducts(
      orderId as string,
      paginationModel.page + 1,
      paginationModel.pageSize,
    );

  const [rowCountState, setRowCountState] = useState(
    orderProducts?.pagination?.total || 0,
  );

  useEffect(() => {
    setRowCountState((prevRowCountState: number) =>
      orderProducts?.pagination?.total !== undefined
        ? orderProducts?.pagination?.total
        : prevRowCountState,
    );
  }, [orderProducts?.pagination?.total, setRowCountState]);

  if (!order) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Order Details | Inventory Manager</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <Link href="/orders" passHref>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                Orders
              </Typography>
            </Link>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{order.order_id}</Typography>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                    mt: 1,
                  }}
                >
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{ ml: 1 }}
                  >
                    Placed on
                  </Typography>
                  <CalendarIcon
                    color="action"
                    fontSize="small"
                    sx={{ ml: 1 }}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {dayjs(order.created_at).format("YYYY-MM-DD H:m:s")}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sx={{ ml: -2 }}>
                <Button
                  endIcon={<PencilAltIcon fontSize="small" />}
                  variant="outlined"
                  sx={{ ml: 2 }}
                >
                  Edit
                </Button>
                {/*<Button*/}
                {/*  endIcon={<ChevronDownIcon fontSize="small" />}*/}
                {/*  variant="contained"*/}
                {/*  sx={{ ml: 2 }}*/}
                {/*>*/}
                {/*  Action*/}
                {/*</Button>*/}
              </Grid>
            </Grid>
          </Box>
          <OrderSummary order={order} />
          <Box sx={{ mt: 4 }}>
            <OrderItems
              orderItems={orderProducts?.data || []}
              isLoading={isOrderProductsLoading}
              rowCount={rowCountState}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <OrderLogs order={order} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

OrderDetails.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default OrderDetails;
