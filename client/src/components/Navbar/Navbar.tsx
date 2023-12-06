import { useState } from "react";
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

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const user = true;

  const links = user
    ? [
        { title: "Order Pizza", path: "/order-pizza" },
        { title: "My Orders", path: "/my-orders" },
        { title: "Logout", path: "/logout" },
      ]
    : [{ title: "Login", path: "https://www.google.lt" }];

  const drawer = (
    <Box onClick={() => setDrawerOpen(false)} sx={{ width: 250 }}>
      <Stack
        direction="column"
        alignItems="flex-start"
        sx={{ height: "100%", mt: 5, ml: 2 }}
      >
        {links.map((link) => (
          <Button
            key={link.title}
            sx={{ fontSize: 15, fontWeight: "bold", color: "White" }}
            href={link.path}
          >
            {link.title}
          </Button>
        ))}
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
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Pizza Order App
          </Typography>

          {!isMobile && (
            <Stack direction="row" spacing={2}>
              {links.map((link) => (
                <Button
                  key={link.title}
                  color="inherit"
                  sx={{ fontSize: 15, fontWeight: "bold" }}
                  href={link.path}
                >
                  {link.title}
                </Button>
              ))}
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
            backgroundColor: "#9C27B0", // Or use any color value you prefer
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
