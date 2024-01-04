import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { PizzaTopping } from "../../models/pizzaData";
import { Add, Remove } from "@mui/icons-material";

interface Props {
  toppings: PizzaTopping[];
  setToppingCount: (event: any) => void;
  selectedToppings: number[];
  setSelectedToppings: (event: any) => void;
}

export default function ToppingsTable({ toppings, setToppingCount, selectedToppings, setSelectedToppings }: Props) {
  const handleAddTopping = (toppingId: number) => {
    setSelectedToppings((prevSelected: number[]) => {
      if (prevSelected.length >= 6) {
        alert("Only 6 toppings are allowed per pizza");
        return prevSelected;
      }
      const updatedSelected = [...prevSelected, toppingId];
      setToppingCount(updatedSelected);
      return updatedSelected;
    });
  };

  const handleRemoveTopping = (toppingId: number) => {
    setSelectedToppings((prevSelected: number[]) => {
      const index = prevSelected.lastIndexOf(toppingId);
      if (index > -1) {
        const updatedSelected = [...prevSelected.slice(0, index), ...prevSelected.slice(index + 1)];
        setToppingCount(updatedSelected);
        return updatedSelected;
      }
      return prevSelected;
    });
  };

  return (
    <TableContainer sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <Table sx={{ width: { xs: "100%", sm: "100%", md: "500px" }, alignSelf: "center" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "larger" }}>Topping</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "larger", paddingRight: 6 }}>
              Quantity
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {toppings.map((topping) => (
            <TableRow key={topping.id}>
              <TableCell style={{ padding: "4px" }}>{topping.toppingName}</TableCell>
              <TableCell style={{ padding: "4px" }} align="right">
                <Box
                  sx={{
                    display: { xs: "flex" },
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button color="error" onClick={() => handleRemoveTopping(topping.id)}>
                    <Remove />
                  </Button>
                  <span>{selectedToppings.filter((id) => id === topping.id).length}</span>
                  <Button onClick={() => handleAddTopping(topping.id)}>
                    <Add />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
