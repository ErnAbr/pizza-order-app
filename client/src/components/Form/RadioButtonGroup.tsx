import { RadioGroup, Grid, FormControlLabel, Radio } from "@mui/material";
import { PizzaSize } from "../../models/pizzaData";
import "./radioButtonGroup.css";

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
          <Grid item xs={12} sm={4} md={4} key={size.id}>
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
                className="img-responsive"
              />
              <FormControlLabel
                value={size.id.toString()}
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
