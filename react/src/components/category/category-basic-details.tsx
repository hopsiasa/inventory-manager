import type { Theme } from "@mui/material";
import { Card, CardHeader, Divider, useMediaQuery } from "@mui/material";
import type { FC } from "react";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";

interface CategoryBasicDetailsProps {
  name: string;
  description: string;
  dateCreated: string;
}

export const CategoryBasicDetails: FC<CategoryBasicDetailsProps> = (props) => {
  const { name, description, dateCreated, ...other } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem align={align} divider label="Name" value={name} />
        <PropertyListItem
          align={align}
          divider
          label="Description"
          value={description}
        />
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
