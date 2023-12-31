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
import type { Product } from "../../types/product";
import { Scrollbar } from "../scrollbar";
import { getActions } from "next/dist/build/webpack/loaders/utils";

interface ProductListTableProps {
  products: Product[];
  isLoading: boolean;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  rowCount: number;
  onPaginationModelChange: (newModel: any) => void;
}

export const ProductListTable: FC<ProductListTableProps> = (props) => {
  const {
    products,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    rowCount,
    ...other
  } = props;
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Link
          href={`/products/${params.id}`}
          passHref
          style={{ color: "white" }}
        >
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      flex: 1,
      type: "number",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      flex: 1,
      type: "number",
    },
    {
      field: "category",
      headerName: "Category",
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Link
          href={`/categories/${params.value.id}`}
          passHref
          style={{ color: "white" }}
        >
          {params.value.name}
        </Link>
      ),
    },
    // {
    //   field: "user",
    //   headerName: "User",
    //   width: 300,
    //   flex: 1,
    //   renderCell: (params) => params.value.name,
    // },
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
          onClick={() => router.push(`/products/${params.id}/edit`)}
        />,
      ],
    },
  ];

  return (
    <Scrollbar>
      <DataGrid
        rows={products}
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
