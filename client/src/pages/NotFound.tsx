import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400, mt: 5 }}>
      <Typography gutterBottom variant="h3">
        Oops - We Could Not Find What You Were Looking For
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/">
        Go Back To Login
      </Button>
    </Container>
  );
}
