import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Button, Chip, Container, Divider, Grid, Link, Tab, Tabs, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { useGetUser } from "src/hooks/use-users";
// import { userApi } from "../../../api/user-api";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { Layout } from "../../../components/layout/layout";
import { CustomerBasicDetails } from "../../../components/user/customer-basic-details";
import { CustomerDataManagement } from "../../../components/user/customer-data-management";
import { CustomerEmailsSummary } from "../../../components/user/customer-emails-summary";
import { CustomerInvoices } from "../../../components/user/customer-invoices";
import { CustomerLogs } from "../../../components/user/customer-logs";
import { CustomerPayment } from "../../../components/user/customer-payment";
import { useMounted } from "../../../hooks/use-mounted";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import type { User } from "../../../types/user";
import { getInitials } from "../../../utils/get-initials";

const tabs = [
  { label: "Details", value: "details" },
  { label: "Invoices", value: "invoices" },
  { label: "Logs", value: "logs" },
];

const UserDetails: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { user, isLoading } = useGetUser(userId as string);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>User Details | Inventory Manager</title>
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
              <NextLink href="/users" passHref>
                <Link
                  color="textPrimary"
                  component="a"
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Users</Typography>
                </Link>
              </NextLink>
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
                  src={user.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  {getInitials(user.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{user.email}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">user_id:</Typography>
                    <Chip label={user.id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink href="/users/1/edit" passHref>
                  <Button component="a" endIcon={<PencilAltIcon fontSize="small" />} sx={{ m: 1 }} variant="outlined">
                    Edit
                  </Button>
                </NextLink>
                <Button endIcon={<ChevronDownIcon fontSize="small" />} sx={{ m: 1 }} variant="contained">
                  Actions
                </Button>
              </Grid>
            </Grid>
          </div>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomerBasicDetails
                  address1={user.address1}
                  address2={user.address2}
                  country={user.country}
                  email={user.email}
                  isVerified={!!user.isVerified}
                  phone={user.phone}
                  state={user.state}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserDetails.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default UserDetails;
