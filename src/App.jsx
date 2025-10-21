import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/cadastro";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
