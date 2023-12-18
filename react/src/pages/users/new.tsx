import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { UserCreateForm } from "../../components/user/user-create-form";
import { useGetRoles } from "../../hooks/use-roles";

const UserCreate: NextPage = () => {
  const { roles, isLoading } = useGetRoles();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>User Create | Inventory Manager</title>
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
            <Link href="/users" passHref>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                Users
              </Typography>
            </Link>
          </Box>
          <Box mt={3}>
            <UserCreateForm roles={roles || []} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserCreate.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default UserCreate;
