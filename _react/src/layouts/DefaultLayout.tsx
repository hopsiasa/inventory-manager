import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.ts";
import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";
import { useStateContext } from "../contexts/ContextProvider.tsx";

const drawerWidth = 240;

const DefaultLayout = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { token, notification, setUser } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axiosClient.get("/user").then(({ data }) => setUser(data));
  }, [navigate, token, setUser]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      {notification && <div className="notification">{notification}</div>}
    </Box>
  );
};

export default DefaultLayout;
