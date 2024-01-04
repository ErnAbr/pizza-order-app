import { useContext, useEffect, useState } from "react";
import agent from "../api/agent";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { Box, Button, Container, FormControl, Typography } from "@mui/material";
import { PizzaData, PizzaSize, PizzaTopping } from "../models/pizzaData";
import { LoginContext } from "../context/LoginContext";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import Modal from "../components/Modal/Modal";
import ModalContent from "../components/Modal/ModalContent";
import { OrderData } from "../models/orderData";
import { useNavigate } from "react-router-dom";
import ToppingsTable from "../components/Form/ToppingsTable";

export default function MakeOrder() {
  const [pizzaData, setPizzaData] = useState<PizzaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [toppingCount, setToppingCount] = useState<number[]>([]);
  const [pizzaPrice, setPizzaPrice] = useState<number>(0);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const { isUser } = useContext(LoginContext);

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
    if (!Number.isNaN(size) && toppingCount.length != 0) {
      const pizzaPriceData = {
        pizzaSizeId : size,
        ToppingIds: toppingCount,
      };
      agent.Pizza.getPizzaPrice(pizzaPriceData)
        .then((response) => setPizzaPrice(response))
        .catch((error) => console.log(error));
    }
  }, [selectedSize, toppingCount]);

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

  const handleSubmitVerification = (event: any) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      userName: isUser,
      pizzaSizeId: parseInt(selectedSize),
      toppingIds: toppingCount,
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
        marginBottom: "15px",
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
            <Box display="flex" flexDirection="column">
              <RadioButtonGroup
                selectedSize={selectedSize}
                handleRadioChange={handleRadioChange}
                sizes={sizes}
              />
              <ToppingsTable
                toppings={toppings}
                setToppingCount={setToppingCount}
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
              disabled={selectedSize === "" || toppingCount.length === 0}
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
