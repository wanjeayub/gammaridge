import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirecting on 401 error

function GarbageCollectionList() {
  const [requests, setRequests] = useState([]);
  const [sort, setSort] = useState("desc"); // Default sort by latest first
  const [filter, setFilter] = useState(""); // Filter by today, thisWeek, thisMonth
  const [search, setSearch] = useState(""); // Search by name, phone, or location
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // For redirecting

  // Fetch cleanup requests from the backend
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        // If no token, redirect to login
        navigate("/adminogin");
        return;
      }

      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      // Construct query parameters
      const params = new URLSearchParams({ sort, filter, search });

      // Fetch data using Fetch API
      const response = await fetch(
        `https://tester-server.vercel.app/api/admin/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        }
      );

      // Handle 401 Unauthorized error
      if (response.status === 401) {
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login"); // Redirect to login page
        return;
      }

      // Handle other errors
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      // Parse JSON response
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to fetch requests. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data on component mount and when sort/filter/search changes
  useEffect(() => {
    fetchRequests();
  }, [sort, filter, search]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Garbage Collection Requests
      </h1>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="desc">Latest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <input
          type="text"
          placeholder="Search by name, phone, or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* No Requests Message */}
      {!loading && !error && requests.length === 0 && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          No garbage collection requests found.
        </div>
      )}

      {/* Table */}
      {!loading && !error && requests.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GarbageCollectionList;
