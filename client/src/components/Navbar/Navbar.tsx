import { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { red } from "@mui/material/colors";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { isUser, setIsUser } = useContext(LoginContext);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setIsUser(null);
    navigate("/");
  };

  const links = isUser
    ? [
        { title: "Order Pizza", path: "/order-pizza" },
        { title: "My Orders", path: "/my-orders" },
        { title: "Logout", action: handleLogout },
      ]
    : [{ title: "Login", path: "/" }];

  const drawer = (
    <Box onClick={() => setDrawerOpen(false)} sx={{ width: 200 }}>
      <Stack
        direction="column"
        alignItems="flex-start"
        sx={{ height: "100%", mt: 5, ml: 2 }}
      >
        {links.map((link) =>
          link.title === "Logout" ? (
            <Button
              key={link.title}
              sx={{ fontSize: 15, fontWeight: "bold", color: "White" }}
              onClick={link.action}
            >
              {link.title}
            </Button>
          ) : (
            <Button
              key={link.title}
              sx={{ fontSize: 15, fontWeight: "bold", color: "White" }}
              href={link.path}
            >
              {link.title}
            </Button>
          )
        )}
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <IconButton>
            <LocalPizzaIcon sx={{ color: red[500] }} fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Pizza Order App
          </Typography>

          {!isMobile && (
            <Stack direction="row" spacing={2}>
              {links.map((link) =>
                link.title === "Logout" ? (
                  <Button
                    key={link.title}
                    sx={{ fontSize: 15, fontWeight: "bold", color: "White" }}
                    onClick={link.action}
                  >
                    {link.title}
                  </Button>
                ) : (
                  <Button
                    key={link.title}
                    sx={{ fontSize: 15, fontWeight: "bold", color: "White" }}
                    href={link.path}
                  >
                    {link.title}
                  </Button>
                )
              )}
            </Stack>
          )}

          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        color="secondary"
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#9C27B0",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
