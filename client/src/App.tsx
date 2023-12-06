import { CssBaseline } from "@mui/material";
import Header from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
