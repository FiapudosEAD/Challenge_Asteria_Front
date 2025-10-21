import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
