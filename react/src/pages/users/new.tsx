import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useGetUser } from "../../../hooks/use-users";
import { getInitials } from "../../../utils/get-initials";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { UserCreateForm } from "../../components/user/user-create-form";

const UserCreate: NextPage = () => {
  return (
    <>
      <Head>
        <title>User Create | Inventory Manager</title>
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
            <Typography variant="h4">Create new user</Typography>
          </Box>
          <UserCreateForm />
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
