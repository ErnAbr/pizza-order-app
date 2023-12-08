import { useEffect, useState, useContext } from "react";
import { MyOrder } from "../models/myOrdersData";
import agent from "../api/agent";
import { LoginContext } from "../context/LoginContext";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { capitalizeFirstLetter } from "../components/Utils/capitalizeFirstLetter";

export default function MyOrders() {
  const [myOrders, setMyOrders] = useState<MyOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const { isUser } = useContext(LoginContext);

  useEffect(() => {
    if (isUser != null) {
      agent.Pizza.getClientOrders(isUser)
        .then((response) => setMyOrders(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [isUser]);

  if (loading) return <LoadingComponent message="Loading User Orders" />;

  const deleteOrder = (id: number, userName: string) => {
    agent.Pizza.deleteUserOrder(userName, id)
      .then(() =>
        setMyOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== id)
        )
      )
      .catch((error) => console.log(error));
  };

  if (myOrders.length > 0) {
    return (
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography sx={{ mt: 3 }} variant="h3">
          Your Orders
        </Typography>
        <TableContainer sx={{ mt: 3, width: 1028 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }}>
                  Pizza Size
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "larger" }}
                  align="center"
                >
                  Toppings
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "larger" }}
                  align="center"
                >
                  Total Price
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "larger" }}
                  align="center"
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">
                    {capitalizeFirstLetter(order.pizzaSize.sizeName)}
                  </TableCell>
                  <TableCell align="center">
                    {order.toppings
                      .map((topping) => topping.toppingName)
                      .join(", ")}
                  </TableCell>
                  <TableCell align="center">{order.totalPrice} $</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => deleteOrder(order.id, order.userName)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <Typography sx={{ mt: 3, textAlign: "center" }} variant="h3">
      No Orders Found
    </Typography>
  );
}
