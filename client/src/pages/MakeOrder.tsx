import { useEffect, useState } from "react";
import agent from "../api/agent";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { Container, Grid, Typography } from "@mui/material";
import { PizzaData, PizzaSize, PizzaTopping } from "../models/pizzaData";

export default function MakeOrder() {
  const [pizzaData, setPizzaData] = useState<PizzaData | null>(null);
  const [loading, setLoading] = useState(true);

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

  console.log(toppings);
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
      <Grid sx={{ justifyContent: "center", mt: "5vh" }} container spacing={3}>
        {sizes.map((size) => (
          <Grid
            sx={{ mt: "15px", textAlign: "center" }}
            item
            xs={12}
            md={12}
            lg={3}
            key={size.id}
          >
            {size.sizeName}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
