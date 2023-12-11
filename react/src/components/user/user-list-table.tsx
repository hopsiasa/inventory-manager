import { Link } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import NextLink from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { PencilAlt as PencilAltIcon } from "../../icons/pencil-alt";
import type { User } from "../../types/user";
import { Scrollbar } from "../scrollbar";

interface UserListTableProps {
  users: User[];
  usersCount: number;
  page: number;
  rowsPerPage: number;
}

export const UserListTable: FC<UserListTableProps> = (props) => {
  const { users, usersCount, page, rowsPerPage, ...other } = props;
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <NextLink href={`/users/${params.id}`} passHref>
          <Link variant="subtitle2">{params.row.name}</Link>
        </NextLink>
      ),
    },
    { field: "email", headerName: "Email", width: 150, flex: 1 },
    { field: "created_at", headerName: "Date created", width: 150, flex: 1 },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<PencilAltIcon />}
          label="Edit"
          onClick={() => router.push(`/users/${params.id}/edit`)}
        />,
      ],
    },
  ];

  return (
    <Scrollbar>
      <DataGrid
        rows={users || []}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
      />
    </Scrollbar>
  );
};
