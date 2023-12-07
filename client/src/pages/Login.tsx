import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const { isUser, setIsUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUserName(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("userName", userName.toLowerCase());
    setIsUser(localStorage.getItem("userName"));
    setUserName("");
    navigate("/order-pizza");
  };

  const theme = useTheme();
  const Xs = useMediaQuery(theme.breakpoints.down("sm"));
  const Sm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  type TypographyVariant = TypographyProps["variant"];
  let variant: TypographyVariant = "h3";

  if (Xs) {
    variant = "h6";
  } else if (Sm) {
    variant = "h4";
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "7vh",
      }}
      maxWidth="sm"
    >
      {isUser ? (
        <Typography variant={variant} mt={2} mb={3}>
          You Already Logged In
        </Typography>
      ) : (
        <Typography variant={variant} mt={2} mb={3}>
          Please Enter Your Name
        </Typography>
      )}
      <Box
        sx={{ display: "flex", flexDirection: "column", width: "50vw" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          sx={{ width: "33vw", alignSelf: "center" }}
          label="Your Name"
          name="username"
          id="username"
          onChange={handleChange}
          value={userName}
        />
        <Button
          disabled={isUser != null}
          sx={{ mt: 2, width: "15vw", height: "50px", alignSelf: "center" }}
          variant="contained"
          type="submit"
        >
          Enter
        </Button>
      </Box>
    </Container>
  );
}
