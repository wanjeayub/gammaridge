import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import UserDashboard from "./pages/UserDashboard";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import UploadFiles from "./pages/UploadFiles";
import TermsAndConditions from "./pages/TermsAndConditions";

import EditAdminPage from "./pages/AdminEdit";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import MyLogin from "./pages/MyLogin";
import Services from "./pages/Services";
import MyRegister from "./pages/MyRegister";
import MyAdminLogin from "./pages/MyAdminLogin";
import Loans from "./components/Loans";
import Settings from "./components/Settings";
import toast, { Toaster } from "react-hot-toast";
import MyAdminDashboard from "./pages/MyAdminDashboard";
import EntRegister from "./enterprise-pages/Register";
import EntClothing from "./enterprise-pages/Clothing";
import EntFarmProduce from "./enterprise-pages/FarmProduce";

import { useEffect, useState } from "react";
import Dashboard from "./pages/MyDashboard";

import UserCleanupRequest from "./pages/UserCleanUpRequest";
import UpdatePassword from "./pages/UpdatePassword";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null); // No token means no user is logged in
        setIsLoading(false); // Stop loading
        return;
      }

      try {
        const response = await fetch(
          "https://tester-server.vercel.app/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setUser(data); // Set the user data
      } catch (error) {
        console.error(error);
        setUser(null); // Reset user state on error
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchUser();
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Clear the token
    setUser(null); // Reset the user state
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
        <Route path="/forgot-password" element={<UpdatePassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/edit" element={<EditAdminPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard/loans" element={<Loans />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        {/* fresh and new */}
        {/* these pages are for feature testing */}
        <Route path="/entregister" element={<EntRegister />} />
        <Route path="/entclothing" element={<EntClothing />} />
        <Route path="/entgarbage" element={<UserCleanupRequest />} />
        <Route path="/entfarm-produce" element={<EntFarmProduce />} />
      </Routes>
    </Router>
  );
};

export default App;
