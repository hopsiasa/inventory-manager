import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import type { Order } from "../../types/order";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import dayjs from "dayjs";

interface OrderDetailsProps {
  order: Order;
}

const statusOptions = ["Canceled", "Complete", "Rejected"];

export const OrderSummary: FC<OrderDetailsProps> = (props) => {
  const { order, ...other } = props;
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [status, setStatus] = useState<string>(statusOptions[0]);
  console.log(order);
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setStatus(event.target.value);
  };

  const align = smDown ? "vertical" : "horizontal";

  return (
    <Card {...other}>
      <CardHeader title="Basic info" />
      <Divider />
      <PropertyList>
        <PropertyListItem align={align} label="Customer">
          <Typography color="primary" variant="body2">
            {order.customer}
          </Typography>
          {/*<Typography color="textSecondary" variant="body2">*/}
          {/*  {order.customer.address1}*/}
          {/*</Typography>*/}
          {/*<Typography color="textSecondary" variant="body2">*/}
          {/*  {order.customer.city}*/}
          {/*</Typography>*/}
          {/*<Typography color="textSecondary" variant="body2">*/}
          {/*  {order.customer.country}*/}
          {/*</Typography>*/}
        </PropertyListItem>
        <Divider />
        <PropertyListItem align={align} label="ID" value={order.id} />
        <Divider />
        {/*<PropertyListItem align={align} label="Invoice" value={order.number} />*/}
        {/*<Divider />*/}
        <PropertyListItem
          align={align}
          label="Date"
          value={dayjs(order.created_at).format("YYYY-MM-DD H:m:s")}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Total Amount"
          value={`RON ${order.total}`}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Paid Amount"
          value={`RON ${order.paid}`}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Remaining Amount"
          value={`RON ${order.remaining_amount}`}
        />
        <Divider />
        <PropertyListItem align={align} label="Status">
          <Box
            sx={{
              alignItems: {
                sm: "center",
              },
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              mx: -1,
            }}
          >
            <TextField
              label="Status"
              margin="normal"
              name="status"
              onChange={handleChange}
              select
              SelectProps={{ native: true }}
              sx={{
                flexGrow: 1,
                m: 1,
                minWidth: 150,
              }}
              value={status}
            >
              {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </TextField>
            <Button sx={{ m: 1 }} variant="contained">
              Save
            </Button>
            <Button sx={{ m: 1 }}>Cancel</Button>
          </Box>
        </PropertyListItem>
      </PropertyList>
    </Card>
  );
};
