import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Chip, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { Layout } from "../../../components/layout/layout";
import { CategoryEditForm } from "../../../components/category/category-edit-form";
import { useGetCategory } from "../../../hooks/use-categories";
import { getInitials } from "../../../utils/get-initials";

const CategoryEdit: NextPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const { category, isLoading: isCategoryLoading } = useGetCategory(
    categoryId as string,
  );

  if (!category) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Category Edit | Inventory Manager</title>
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
            <Link href="/categories" passHref>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                Categories
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Avatar
              // src={category?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(category?.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {category?.name}
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
                <Typography variant="subtitle2">category_id:</Typography>
                <Chip label={category?.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <CategoryEditForm category={category || {}} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CategoryEdit.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default CategoryEdit;
