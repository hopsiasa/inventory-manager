import type { FC, ReactNode } from "react";
import { List } from "@mui/material";

interface PropertyListProps {
  children: ReactNode | string;
}

export const PropertyList: FC<PropertyListProps> = (props) => {
  const { children } = props;

  return <List disablePadding>{children}</List>;
};
