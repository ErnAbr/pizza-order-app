import { Box, CssBaseline } from "@mui/material";
import Header from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}

export default App;
