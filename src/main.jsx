import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import AppRoutes from "./routes/appRoutes";

//Import páginas
import Login from "./pages/loginPage";
import Register from "./pages/registerPage";
import Dashboard from "./pages/dashboardPage";
import Products from "./pages/productsPage";
import Sells from "./pages/sellsPage";
import PDV from "./pages/pdvPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    children: [
      { index: true, element: <Login /> },
      { path: "registro", element: <Register /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "produtos", element: <Products /> },
      { path: "vendas", element: <Sells /> },
      { path: "pdv", element: <PDV /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
