import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import MakeOrder from "../pages/MakeOrder";
import MyOrders from "../pages/MyOrders";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "order-pizza", element: <MakeOrder /> },
          { path: "my-orders", element: <MyOrders /> },
        ],
      },
      { path: "/", element: <Login />, index: true },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
