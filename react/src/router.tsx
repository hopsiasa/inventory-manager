import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import App from "./App.jsx";
import GuestLayout from "./layouts/GuestLayout.tsx";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/UserForm.jsx";

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
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
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
