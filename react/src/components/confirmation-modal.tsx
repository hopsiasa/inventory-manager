import WarningIcon from "@mui/icons-material/WarningOutlined";
import { Avatar, Box, Button, Dialog, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { FC } from "react";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText: string;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
}) => (
  <Dialog open={open} onClose={onClose}>
    <Box
      sx={{
        display: "flex",
        pb: 2,
        pt: 3,
        px: 3,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
          color: "error.main",
          mr: 2,
        }}
      >
        <WarningIcon fontSize="small" />
      </Avatar>
      <div>
        <Typography variant="h5">{title}</Typography>
        <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
          {message}
        </Typography>
      </div>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        px: 3,
        py: 1.5,
      }}
    >
      <Button sx={{ mr: 2 }} variant="outlined" onClick={onClose}>
        Cancel
      </Button>
      <Button
        sx={{
          backgroundColor: "error.main",
          "&:hover": {
            backgroundColor: "error.dark",
          },
        }}
        variant="contained"
        onClick={onConfirm}
      >
        {confirmButtonText}
      </Button>
    </Box>
  </Dialog>
);
