import { Card, CardHeader, Divider } from "@mui/material";
import type { FC } from "react";
import type { OrderProducts } from "../../types/order";
import { Scrollbar } from "../scrollbar";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Link from "next/link";
import dayjs from "dayjs";
import { PencilAlt as PencilAltIcon } from "../../icons/pencil-alt";
import router from "next/router";

interface OrderItemsProps {
  orderItems: OrderProducts[];
  isLoading: boolean;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  rowCount: number;
  onPaginationModelChange: (newModel: any) => void;
}

export const OrderItems: FC<OrderItemsProps> = (props) => {
  const {
    orderItems,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    rowCount,
  } = props;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
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
    <Card>
      <CardHeader title="Order items" />
      <Divider />
      <Scrollbar>
        <DataGrid
          rows={orderItems}
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
    </Card>
  );
};
