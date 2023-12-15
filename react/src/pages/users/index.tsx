import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { UserListTable } from "../../components/user/user-list-table";
import { useGetUsers } from "../../hooks/use-users";
import { Plus as PlusIcon } from "../../icons/plus";

const UserList: NextPage = () => {
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const { users, isLoading } = useGetUsers(
    paginationModel.page + 1,
    paginationModel.pageSize
  );
  const [rowCountState, setRowCountState] = useState(
    users?.pagination?.total || 0
  );

  useEffect(() => {
    setRowCountState((prevRowCountState: number) =>
      users?.pagination?.total !== undefined
        ? users?.pagination?.total
        : prevRowCountState
    );
  }, [users?.pagination?.total, setRowCountState]);

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
              users={users?.data || []}
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

UserList.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default UserList;
