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
import type { Order } from "../../types/order";
import { Scrollbar } from "../scrollbar";
import dayjs from "dayjs";

interface OrderListTableProps {
  orders: Order[];
  isLoading: boolean;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  rowCount: number;
  onPaginationModelChange: (newModel: any) => void;
}

export const OrderListTable: FC<OrderListTableProps> = (props) => {
  const {
    orders,
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
      field: "customer",
      headerName: "Customer",
      width: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          href={`/orders/${params.row.id}`}
          passHref
          style={{ color: "white" }}
        >
          {params.row.customer}
        </Link>
      ),
    },
    {
      field: "product",
      headerName: "Product",
      width: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          href={`/products/${params.row.product.id}`}
          passHref
          style={{ color: "white" }}
        >
          {params.row.product.name}
        </Link>
      ),
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      flex: 1,
      type: "number",
    },
    { field: "status", headerName: "Status", width: 150, flex: 1 },
    {
      field: "total",
      headerName: "Total",
      width: 150,
      flex: 1,
      type: "number",
    },
    { field: "paid", headerName: "Paid", width: 150, flex: 1, type: "number" },
    {
      field: "remaining_amount",
      headerName: "Remaining Amount",
      width: 150,
      flex: 1,
      type: "number",
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) =>
        dayjs(params.row.created_at).format("YYYY-MM-DD H:m:s"),
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) =>
        dayjs(params.row.updated_at).format("YYYY-MM-DD H:m:s"),
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<PencilAltIcon />}
          label="Edit"
          onClick={() => router.push(`/orders/${params.id}/edit`)}
        />,
      ],
    },
  ];

  return (
    <Scrollbar>
      <DataGrid
        rows={orders}
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
