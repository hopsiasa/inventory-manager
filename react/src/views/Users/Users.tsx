import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.tsx";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "react-query";
import userService from "../services/users.ts";

export default function Users() {
  const queryClient = useQueryClient();
  const { can } = useStateContext();

  const { isLoading, data: users } = useQuery(["users"], () =>
    userService.findAllUsers(),
  );
  const { mutate: deleteUser } = useMutation(
    (id: string) => userService.deleteUser(id),
    {
      onSuccess: async () => queryClient.invalidateQueries("users"),
    },
  );

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    deleteUser(id);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 70, flex: 1 },
      { field: "name", headerName: "Name", width: 130, flex: 1 },
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
    [],
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
          columns={columns}
          checkboxSelection
        />
      )}
    </div>
  );
}
