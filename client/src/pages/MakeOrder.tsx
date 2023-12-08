import { useContext, useEffect, useState } from "react";
import agent from "../api/agent";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import {
  Box,
  Button,
  Container,
  FormControl,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PizzaData, PizzaSize, PizzaTopping } from "../models/pizzaData";
import { LoginContext } from "../context/LoginContext";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import CheckboxGroup from "../components/Form/CheckboxGroup";
import Modal from "../components/Modal/Modal";
import ModalContent from "../components/Modal/ModalContent";
import { OrderData } from "../models/orderData";
import { useNavigate } from "react-router-dom";

export default function MakeOrder() {
  const [pizzaData, setPizzaData] = useState<PizzaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [pizzaPrice, setPizzaPrice] = useState<number>(0);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const { isUser } = useContext(LoginContext);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  let toppings: PizzaTopping[] = [];
  let sizes: PizzaSize[] = [];

  useEffect(() => {
    agent.Pizza.getPizzaData()
      .then((response) => setPizzaData(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const size = parseInt(selectedSize);
    if (!Number.isNaN(size) && selectedToppings.length != 0) {
      const pizzaPriceData = {
        PizzaPrice: size,
        ToppingIds: selectedToppings,
      };
      agent.Pizza.getPizzaPrice(pizzaPriceData)
        .then((response) => setPizzaPrice(response))
        .catch((error) => console.log(error));
    }
  }, [selectedSize, selectedToppings]);

  useEffect(() => {
    if (orderData != null) {
      agent.Pizza.savePizzaOrder(orderData)
        .then(() => navigate("/my-orders"))
        .catch((error) => console.log(error));
    }
  }, [orderData, navigate]);

  if (loading) return <LoadingComponent message="Loading Pizza Data" />;

  if (pizzaData) {
    ({ toppings, sizes } = pizzaData);
  }

  const handleRadioChange = (event: any) => {
    setSelectedSize(event.target.value);
  };

  const handleToppingChange = (event: any) => {
    const toppingId = parseInt(event.target.value);
    setSelectedToppings((currentSelectedToppings) => {
      const isToppingSelected = currentSelectedToppings.includes(toppingId);
      if (isToppingSelected) {
        return currentSelectedToppings.filter((id) => id !== toppingId);
      } else {
        if (currentSelectedToppings.length < 6) {
          return [...currentSelectedToppings, toppingId];
        } else {
          alert("You can only select up to 6 toppings.");
          return currentSelectedToppings;
        }
      }
    });
  };

  const handleSubmitVerification = (event: any) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      userName: isUser,
      pizzaPrice: parseInt(selectedSize),
      toppingIds: selectedToppings,
    };
    setOrderData(data);
    setIsModalOpen(false);
  };

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
        Make An Order For Your Pizza
      </Typography>
      <Box sx={{ mt: "5vh" }}>
        <form onSubmit={handleSubmitVerification}>
          <FormControl>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mb: 3,
                mr: 3,
              }}
            >
              Select Pizza Size and up to 6 Toppings
            </Typography>
            <Box display="flex">
              <RadioButtonGroup
                selectedSize={selectedSize}
                handleRadioChange={handleRadioChange}
                sizes={sizes}
              />
              <CheckboxGroup
                toppings={toppings}
                isSmallScreen={isSmallScreen}
                selectedToppings={selectedToppings}
                handleToppingChange={handleToppingChange}
              />
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                mt: 3,
                mr: 3,
              }}
            >
              Select more then 3 toppings and get -10% Discount!
            </Typography>
            <Typography
              sx={{
                textAlign: "end",
                fontWeight: "bolder",
                mt: 1,
                mr: 3,
              }}
            >
              Total Price is: {pizzaPrice} $
            </Typography>
            <Button
              sx={{ width: "35%", alignSelf: "center", mt: 3, mr: 3 }}
              type="submit"
              variant="contained"
              disabled={selectedSize === "" || selectedToppings.length === 0}
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
      {isModalOpen && (
        <>
          <Modal closeModal={() => setIsModalOpen(false)}>
            <ModalContent
              handleSubmit={handleSubmit}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
        </>
      )}
    </Container>
  );
}
