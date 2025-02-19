import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import api from "./api/api";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyLogin from "./pages/MyLogin";
import MyRegister from "./pages/MyRegister";
import Dashboard from "./pages/MyDashboard";
import MyAdminDashboard from "./pages/MyAdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import About from "./pages/About";
import Services from "./pages/Services";
import UploadFiles from "./pages/UploadFiles";
import EditAdminPage from "./pages/AdminEdit";
import Loans from "./components/Loans";
import Settings from "./components/Settings";
import EntRegister from "./enterprise-pages/Register";
import EntClothing from "./enterprise-pages/Clothing";
import EntFarmProduce from "./enterprise-pages/FarmProduce";
import UserCleanupRequest from "./pages/UserCleanUpRequest";
import TransportRequest from "./pages/Transport";
import MyAdminLogin from "./pages/MyAdminLogin";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get("/users/profile");
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
          toast.error("Session expired. Please log in again.");
        } else {
          console.error(error);
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={logout} />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<MyRegister />} />
        <Route path="/login" element={<MyLogin />} />
        <Route path="/adminogin" element={<MyAdminLogin />} />
        <Route path="/docs" element={<UploadFiles />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} isLoading={isLoading} />}
        />
        <Route path="/admin" element={<MyAdminDashboard />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/edit" element={<EditAdminPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard/loans" element={<Loans />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/entregister" element={<EntRegister />} />
        <Route path="/enttransport" element={<TransportRequest />} />
        <Route path="/entclothing" element={<EntClothing />} />
        <Route path="/entgarbage" element={<UserCleanupRequest />} />
        <Route path="/entfarm-produce" element={<EntFarmProduce />} />
      </Routes>
    </Router>
  );
};

export default App;
