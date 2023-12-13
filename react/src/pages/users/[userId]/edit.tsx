import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { Layout } from "../../../components/layout/layout";
import { UserEditForm } from "../../../components/user/user-edit-form";
import { useGetRoles } from "../../../hooks/use-roles";
import { useGetUser } from "../../../hooks/use-users";
import { getInitials } from "../../../utils/get-initials";

const UserEdit: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { user, isLoading: isUserLoading } = useGetUser(userId as string);
  const { roles, isLoading: isRolesLoading } = useGetRoles();

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>User Edit | Inventory Manager</title>
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
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Avatar
              // src={user?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(user?.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {user?.name}
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
                <Chip label={user?.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <UserEditForm user={user || {}} roles={roles || []} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserEdit.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default UserEdit;
