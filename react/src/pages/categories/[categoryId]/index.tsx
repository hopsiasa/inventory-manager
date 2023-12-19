import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetCategory } from "src/hooks/use-categories";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { Layout } from "../../../components/layout/layout";
import { CategoryBasicDetails } from "../../../components/category/category-basic-details";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import { getInitials } from "../../../utils/get-initials";

const CategoryDetails: NextPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { category, isLoading } = useGetCategory(categoryId as string);

  if (!category) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Category Details | Inventory Manager</title>
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
                  src={category.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  {getInitials(category.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{category.name}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">category_id:</Typography>
                    <Chip label={category.id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <Link href={`/categories/${category.id}/edit`} passHref>
                  <Button
                    endIcon={<PencilAltIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CategoryBasicDetails
                  name={category.name}
                  description={category.description}
                  dateCreated={category.created_at}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

CategoryDetails.getLayout = (page) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default CategoryDetails;
