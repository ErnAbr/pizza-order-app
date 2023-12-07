import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { PizzaTopping } from "../../models/pizzaData";

interface Props {
  toppings: PizzaTopping[];
  isSmallScreen: boolean;
  selectedToppings: number[];
  handleToppingChange: (event: any) => void;
}

export default function CheckboxGroup({
  toppings,
  isSmallScreen,
  selectedToppings,
  handleToppingChange,
}: Props) {
  return (
    <Box
      display="flex"
      sx={{ mt: 3 }}
      style={{ justifyContent: isSmallScreen ? "center" : "" }}
    >
      <FormGroup>
        {toppings.map((topping) => (
          <FormControlLabel
            key={topping.id}
            control={
              <Checkbox
                checked={selectedToppings.includes(topping.id)}
                onChange={handleToppingChange}
                value={topping.id}
                color="success"
              />
            }
            label={topping.toppingName}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
