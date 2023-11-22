import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import App from "./App.jsx";
import GuestLayout from "./layouts/GuestLayout.tsx";
import Dashboard from "./views/Dashboard.tsx";
import AddUser from "./views/Users/AddUser.tsx";
import EditUser from "./views/Users/EditUser.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/",
      //   element: <Navigate to="/users" />,
      // },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <AddUser />,
      },
      {
        path: "/users/:id",
        element: <EditUser />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
