import type { AppBarProps } from "@mui/material";
import { AppBar, Avatar, Box, ButtonBase, IconButton, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { useRef, useState } from "react";
import { getInitials } from "src/utils/get-initials";
import { useAuth } from "../../hooks/use-auth";
import { Menu as MenuIcon } from "../../icons/menu";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { AccountPopover } from "./account-popover";

interface NavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { user } = useAuth();

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          src={user?.avatar}
          sx={{
            height: 42,
            width: 42,
          }}
        >
          {getInitials(user?.name)}
        </Avatar>
        {/* <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar> */}
      </Box>
      <AccountPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
    </>
  );
};

export const Navbar: FC<NavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <AccountButton />
        </Toolbar>
      </NavbarRoot>
    </>
  );
};
