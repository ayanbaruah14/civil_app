import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { ClientDashboard } from "./pages/user_dashboard";
import { EngineerDashboard } from "./pages/eng_dashboard";
import { Navigate } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/engineer" element={<EngineerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
