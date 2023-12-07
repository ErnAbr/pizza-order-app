import { RadioGroup, Grid, FormControlLabel, Radio } from "@mui/material";
import { PizzaSize } from "../../models/pizzaData";

interface Props {
  selectedSize: string;
  handleRadioChange: (event: any) => void;
  sizes: PizzaSize[];
}

export default function RadioButtonGroup({
  selectedSize,
  handleRadioChange,
  sizes,
}: Props) {
  return (
    <RadioGroup
      row
      name="pizza-size-radio-group"
      value={selectedSize}
      onChange={handleRadioChange}
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {sizes.map((size) => (
          <Grid item xs={12} sm={3} md={4} key={size.id}>
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={`/images/${size.sizeName}.png`}
                alt={size.sizeName}
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
              <FormControlLabel
                value={size.sizePrice.toString()}
                label={`${size.sizeName} $${size.sizePrice}`}
                control={<Radio />}
              />
            </label>
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
}
