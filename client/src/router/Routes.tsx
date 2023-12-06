import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import MakeOrder from "../pages/makeOrder";
import MyOrders from "../pages/myOrders";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login />, index: true },
      { path: "order-pizza", element: <MakeOrder /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "logout", element: <Logout /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
