import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useCallback, useEffect, useState } from "react";
import { customerApi } from "../../../api/customer-api";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { CustomerEditForm } from "../../../components/dashboard/customer/customer-edit-form";
import { Layout } from "../../../components/dashboard/dashboard-layout";
import { useMounted } from "../../../hooks/use-mounted";
import type { Customer } from "../../../types/customer";
import { getInitials } from "../../../utils/get-initials";

const CustomerEdit: NextPage = () => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();

      if (isMounted()) {
        setCustomer(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | Material Kit Pro</title>
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
            <NextLink href="/dashboard/customers" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Customers</Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Avatar
              src={customer.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(customer.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {customer.email}
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
                <Typography variant="subtitle2">user_id:</Typography>
                <Chip label={customer.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <CustomerEditForm customer={customer} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerEdit.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default CustomerEdit;
