import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Dashboard = ({ user, isLoading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // No token found, redirect to login
        toast.error(
          "You are not logged in. Please log in to access the dashboard."
        );
        navigate("/login");
        return;
      }
      try {
        // Decode the token to check its expiry (you may need a library like jwt-decode)
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
          // Token has expired
          localStorage.removeItem("token"); // Clear the expired token
          toast.error("Your session has expired. Please log in again.");
          navigate("/"); // Redirect to home page
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token"); // Clear invalid token
        toast.error("An error occurred. Please log in again.");
        navigate("/login"); // Redirect to login page
      }
    };

    // Redirect to login only if not loading and no user is logged in
    if (!isLoading && !user) {
      toast.error(
        "You are not logged in. Please log in to access the dashboard."
      );
      navigate("/login");
    } else if (user) {
      // Check token expiry if user is logged in
      checkTokenExpiry();
    }
  }, [user, isLoading, navigate]);

  // Show a loading spinner while the user data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  // Show the dashboard content if the user is logged in
  return (
    <div className="min-h-screen bg-white flex flex-col items-center ">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to your dashboard, {user?.fullName}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/dashboard/loans"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-bold mb-2">Loans</h2>
            <p>View and manage your loans.</p>
          </Link>
          <Link
            to="/dashboard/settings"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-bold mb-2">Settings</h2>
            <p>Update your profile and preferences.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
