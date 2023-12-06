import { useContext, useEffect, useState } from "react";
import agent from "../api/agent";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PizzaData, PizzaSize, PizzaTopping } from "../models/pizzaData";
import { LoginContext } from "../context/LoginContext";

export default function MakeOrder() {
  const [pizzaData, setPizzaData] = useState<PizzaData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isUser } = useContext(LoginContext);
  const [selectedSize, setSelectedSize] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  let toppings: PizzaTopping[] = [];
  let sizes: PizzaSize[] = [];

  useEffect(() => {
    agent.Pizza.getPizzaData()
      .then((response) => setPizzaData(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading Pizza Data" />;

  if (pizzaData) {
    ({ toppings, sizes } = pizzaData);
  }

  const handleRadioChange = (event: any) => {
    setSelectedSize(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      userName: isUser,
      pizzaSizeId: parseInt(selectedSize),
    };
    console.log("Selected Pizza Size ID:", data);
  };

  // console.log(toppings);
  console.log(sizes);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "7vh",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold" }}
        mt={2}
        variant="h4"
      >
        Select Pizza Size And Toppings
      </Typography>
      <Box sx={{ mt: "5vh" }}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mb: 3,
                mr: 3,
              }}
            >
              Select Pizza Size
            </Typography>
            <RadioGroup
              row
              name="pizza-size-radio-group"
              value={selectedSize}
              onChange={handleRadioChange}
            >
              <Grid
                container
                spacing={5}
                justifyContent="center"
                alignItems="center"
              >
                {sizes.map((size) => (
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    key={size.id}
                    style={{ textAlign: isSmallScreen ? "center" : "inherit" }}
                  >
                    <label
                      style={{
                        display: isSmallScreen ? "flex" : "",
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
                        value={size.id.toString()}
                        label={`${size.sizeName} $${size.sizePrice}`}
                        control={<Radio />}
                        style={{
                          textAlign: isSmallScreen ? "center" : "inherit",
                        }}
                      />
                    </label>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
            <Button
              sx={{ width: "35%", alignSelf: "center", mt: 3, mr: 3 }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
}
