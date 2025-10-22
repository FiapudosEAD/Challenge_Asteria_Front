import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <div className="pt-24 lg md:pt-32">
        <Outlet />
      </div>
    </>
  );
}
