import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { PencilAlt as PencilAltIcon } from "../../icons/pencil-alt";
import type { Category } from "../../types/category";
import { Scrollbar } from "../scrollbar";

interface CategoryListTableProps {
  categories: Category[];
  isLoading: boolean;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  rowCount: number;
  onPaginationModelChange: (newModel: any) => void;
}

export const CategoryListTable: FC<CategoryListTableProps> = (props) => {
  const {
    categories,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    rowCount,
    ...other
  } = props;
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Link
          href={`/categories/${params.id}`}
          passHref
          style={{ color: "white" }}
        >
          {params.row.name}
        </Link>
      ),
    },
    { field: "description", headerName: "Description", width: 300, flex: 1 },
    { field: "created_at", headerName: "Date created", width: 200 },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<PencilAltIcon />}
          label="Edit"
          onClick={() => router.push(`/categories/${params.id}/edit`)}
        />,
      ],
    },
  ];

  return (
    <Scrollbar>
      <DataGrid
        rows={categories}
        rowCount={rowCount}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        loading={isLoading}
        pageSizeOptions={[15, 25, 50, 100]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={onPaginationModelChange}
      />
    </Scrollbar>
  );
};
