import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; 
import AppRoutes from "./routes/appRoutes";
import AuthRoutes from "./routes/authRoutes";

//Import páginas
import Login from "./pages/login";
import Register from "./pages/cadastro";
import Home from "./pages/home";
import Products from "./pages/productsPage";
import Sells from "./pages/sellsPage";
import PDV from "./pages/pdvPage";
import NotFoundPage from "./pages/pageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoutes />,
    children: [
      { index: true, element: <Login /> },
      { path: "registro", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <AppRoutes />,
    children: [
      { path: "dashboard", element: <Home /> },
      { path: "produtos", element: <Products /> },
      { path: "vendas", element: <Sells /> },
      { path: "pdv", element: <PDV /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);