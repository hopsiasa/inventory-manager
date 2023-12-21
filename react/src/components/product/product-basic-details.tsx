import type { Theme } from "@mui/material";
import { Card, CardHeader, Divider, useMediaQuery } from "@mui/material";
import type { FC } from "react";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import { Category } from "../../types/category";
import { User } from "../../types/user";

interface ProductBasicDetailsProps {
  name: string;
  price: number;
  category: Category;
  user: User;
  quantity: number;
  description: string;
  dateCreated: string;
}

export const ProductBasicDetails: FC<ProductBasicDetailsProps> = (props) => {
  const {
    name,
    price,
    category,
    quantity,
    user,
    description,
    dateCreated,
    ...other
  } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem align={align} divider label="Name" value={name} />
        <PropertyListItem align={align} divider label="Price" value={price} />
        <PropertyListItem
          align={align}
          divider
          label="Quantity"
          value={quantity}
        />
        <PropertyListItem
          align={align}
          divider
          label="User"
          value={user.name}
        />
        <PropertyListItem
          align={align}
          divider
          label="Category"
          value={category.name}
        />

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
