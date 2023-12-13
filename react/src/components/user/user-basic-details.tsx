import type { Theme } from "@mui/material";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  useMediaQuery,
} from "@mui/material";
import type { FC } from "react";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";

interface UserBasicDetailsProps {
  email: string;
  role: string;
  dateCreated: string;
}

export const UserBasicDetails: FC<UserBasicDetailsProps> = (props) => {
  const { email, role, dateCreated, ...other } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem align={align} divider label="Email" value={email} />
        <PropertyListItem align={align} divider label="Role" value={role} />
        <PropertyListItem
          align={align}
          divider
          label="Date created"
          value={dateCreated}
        />
      </PropertyList>
    </Card>
  );
};
