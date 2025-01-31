import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Dashboard = ({ user, isLoading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login only if not loading and no user is logged in
    if (!isLoading && !user) {
      toast.error(
        "You are not logged in. Please log in to access the dashboard."
      );
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  // Show a loading spinner while the user data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  // Show the dashboard content if the user is logged in
  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Welcome to your dashboard, {user?.fullName}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
