import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.tsx";
import { useDeleteUser, useGetUsers } from "../../hooks/use-users.hook.ts";

export default function Users() {
  const { can } = useStateContext();
  const { deleteUser } = useDeleteUser();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { users, isLoading } = useGetUsers(paginationModel.page + 1);
  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(
    users?.pagination?.total || 0,
  );
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      users?.pagination?.total !== undefined
        ? users?.pagination?.total
        : prevRowCountState,
    );
  }, [users?.pagination?.total, setRowCountState]);

  const handleDelete = useCallback(
    (id: string) => {
      if (!window.confirm("Are you sure you want to delete this user?")) {
        return;
      }
      deleteUser(id);
    },
    [deleteUser],
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 70, flex: 1 },
      {
        field: "name",
        headerName: "Name",
        width: 130,
        flex: 1,
        renderCell: (params) => (
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={`/users/${params.row.id}`}
          >
            {params.row.name}
          </Link>
        ),
      },
      { field: "email", headerName: "Email", width: 130, flex: 1 },
      {
        field: "created_at",
        headerName: "Date created",
        type: "number",
        width: 90,
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(params.row.id)}
          />,
        ],
      },
    ],
    [handleDelete],
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        {/*for test purpose*/}
        {can("admin") && (
          <Link to="/users/new" className="btn-add">
            Add new
          </Link>
        )}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid
          rows={users?.data || []}
          rowCount={rowCountState}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          loading={isLoading}
          pageSizeOptions={[10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
        />
      )}
    </div>
  );
}
