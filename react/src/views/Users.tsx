import { useCallback, useEffect, useMemo, useState } from "react";
import axiosClient from "../axios-client.ts";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.tsx";
import { UserType } from "../types.ts";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setNotification, can } = useStateContext();

  const getUsers = useCallback(() => {
    setLoading(true);

    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
        setNotification("Error fetching users. Please try again.");
      });
  }, [setNotification]);

  const deleteUser = useCallback(
    (user: UserType) => () => {
      if (!window.confirm("Are you sure you want to delete this user?")) {
        return;
      }

      axiosClient
        .delete(`/users/${user.id}`)
        .then(() => {
          setNotification("User was successfully deleted");
          getUsers();
        })
        .catch(() => {
          setNotification("Error deleting user. Please try again.");
        });
    },
    [getUsers, setNotification],
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
            onClick={deleteUser(params.row as UserType)}
          />,
        ],
      },
    ],
    [deleteUser],
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid rows={users} columns={columns} checkboxSelection />
      )}
    </div>
  );
}
