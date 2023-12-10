import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, Divider, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from "@mui/material";
import { useRouter } from "next/router";
import type { FC } from "react";
import toast from "react-hot-toast";
import { getInitials } from "src/utils/get-initials";
import { useAuth } from "../../hooks/use-auth";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { logout } = useAuth();
  const { user } = useAuth();

  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.();
      await logout();
      router.push("/authentication/login").catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        {/* <Avatar
          src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar> */}
        <Avatar
          src={user?.avatar}
          sx={{
            height: 42,
            width: 42,
          }}
        >
          {getInitials(user?.name)}
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1">{user?.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            Acme Inc
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">Logout</Typography>} />
        </MenuItem>
      </Box>
    </Popover>
  );
};
