import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Tab,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ChangeEvent, MouseEvent } from "react";
import { FormEvent, useRef, useState } from "react";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { Layout } from "../../components/layout/layout";
import { UserListTable } from "../../components/user/user-list-table";
import { useGetUsers } from "../../hooks/use-users";
import { Plus as PlusIcon } from "../../icons/plus";
import type { UserResponse } from "../../types/user";

// interface Filters {
//   query?: string;
//   hasAcceptedMarketing?: boolean;
//   isProspect?: boolean;
//   isReturning?: boolean;
// }

// type SortField = "updatedAt" | "totalOrders";

// type SortDir = "asc" | "desc";

// type Sort =
//   | "updatedAt|desc"
//   | "updatedAt|asc"
//   | "totalOrders|desc"
//   | "totalOrders|asc";

// interface SortOption {
//   label: string;
//   value: Sort;
// }

// type TabValue = "all" | "hasAcceptedMarketing" | "isProspect" | "isReturning";

// interface Tab {
//   label: string;
//   value: TabValue;
// }

// const tabs: Tab[] = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Accepts Marketing",
//     value: "hasAcceptedMarketing",
//   },
//   {
//     label: "Prospect",
//     value: "isProspect",
//   },
//   {
//     label: "Returning",
//     value: "isReturning",
//   },
// ];

// const sortOptions: SortOption[] = [
//   {
//     label: "Last update (newest)",
//     value: "updatedAt|desc",
//   },
//   {
//     label: "Last update (oldest)",
//     value: "updatedAt|asc",
//   },
//   {
//     label: "Total orders (highest)",
//     value: "totalOrders|desc",
//   },
//   {
//     label: "Total orders (lowest)",
//     value: "totalOrders|asc",
//   },
// ];

// const applyFilters = (users: User[], filters: Filters): User[] =>
//   users?.filter((user) => {
//     if (filters.query) {
//       let queryMatched = false;
//       const properties: ("email" | "name")[] = ["email", "name"];

//       properties.forEach((property) => {
//         if (
//           user[property].toLowerCase().includes(filters.query!.toLowerCase())
//         ) {
//           queryMatched = true;
//         }
//       });

//       if (!queryMatched) {
//         return false;
//       }
//     }

//     if (filters.hasAcceptedMarketing && !user.hasAcceptedMarketing) {
//       return false;
//     }

//     if (filters.isProspect && !user.isProspect) {
//       return false;
//     }

//     if (filters.isReturning && !user.isReturning) {
//       return false;
//     }

//     return true;
//   });

// const descendingComparator = (a: User, b: User, sortBy: SortField): number => {
//   // When compared to something undefined, always returns false.
//   // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

//   if (b[sortBy]! < a[sortBy]!) {
//     return -1;
//   }

//   if (b[sortBy]! > a[sortBy]!) {
//     return 1;
//   }

//   return 0;
// };

// const getComparator = (sortDir: SortDir, sortBy: SortField) =>
//   sortDir === "desc"
//     ? (a: User, b: User) => descendingComparator(a, b, sortBy)
//     : (a: User, b: User) => -descendingComparator(a, b, sortBy);

// const applySort = (users: User[], sort: Sort): User[] => {
//   const [sortBy, sortDir] = sort.split("|") as [SortField, SortDir];
//   const comparator = getComparator(sortDir, sortBy);
//   const stabilizedThis = users?.map((el, index) => [el, index]);

//   stabilizedThis?.sort((a, b) => {
//     // @ts-ignore
//     const newOrder = comparator(a[0], b[0]);

//     if (newOrder !== 0) {
//       return newOrder;
//     }

//     // @ts-ignore
//     return a[1] - b[1];
//   });

//   // @ts-ignore
//   return stabilizedThis?.map((el) => el[0]);
// };

// const applyPagination = (
//   users: User[],
//   page: number,
//   rowsPerPage: number
// ): User[] => users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
              users={users}
              usersCount={users?.length}
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
