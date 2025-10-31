import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar />
      <div className="pt-24 lg md:pt-32">
        <Outlet />
      </div>
    </>
  );
}
