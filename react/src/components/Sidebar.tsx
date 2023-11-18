import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PeopleIcon from "@mui/icons-material/People";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

interface Sidebar {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const SideMenuData = [
  {
    title: "Products",
    path: "/products",
    icon: <InventoryIcon />,
    cName: "nav-text",
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <CategoryIcon />,
    cName: "nav-text",
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <ShoppingCartCheckoutIcon />,
    cName: "nav-text",
  },
  {
    title: "Divider",
    path: "-",
    icon: null,
    cName: "-t",
  },
  {
    title: "Users",
    path: "/users",
    icon: <PeopleIcon />,
    cName: "nav-text",
  },
];

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }: Sidebar) => {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {SideMenuData.map((item, index) => {
          if (item.title === "Divider") {
            return <Divider key={index} />;
          } else {
            return (
              <Link
                key={index}
                to={item.path}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <ListItem key={item.title}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            );
          }
        })}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
