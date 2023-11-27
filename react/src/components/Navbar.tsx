import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Button, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import { MouseEvent } from "../types.ts";
import axiosClient from "../axios-client.ts";
import { useStateContext } from "../contexts/ContextProvider.tsx";

interface Navbar {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Navbar = ({ drawerWidth, handleDrawerToggle }: Navbar) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, setUser, setToken } = useStateContext();

  const handleMenu = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    axiosClient.post("/logout").then(() => {
      setUser({
        name: "",
        email: "",
        role: "",
        permissions: [],
        created_at: "",
        updated_at: "",
      });
      setToken("");
    });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Inventory Manager
        </Typography>
        <div>
          <Button onClick={handleMenu} color="inherit">
            {user?.name}
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
