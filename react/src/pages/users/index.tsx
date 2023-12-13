import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { UserListTable } from "../../components/user/user-list-table";
import { useGetUsers } from "../../hooks/use-users";
import { Plus as PlusIcon } from "../../icons/plus";
import { User, Users } from "../../types/user";

const UserList: NextPage = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const router = useRouter();
  const { users, isLoading } = useGetUsers(page + 1, rowsPerPage);

  return (
    <>
      <Head>
        <title>User List | Inventory Manager</title>
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
                <Typography variant="h4">Users</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  onClick={() => router.push("/users/new")}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <UserListTable
              users={users?.data ?? []}
              usersCount={users?.data?.length ?? 0}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

UserList.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default UserList;
