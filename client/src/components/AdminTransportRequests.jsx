import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminTransportRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch all transport requests
  const fetchTransportRequests = async () => {
    try {
      const response = await fetch(
        "https://tester-server.vercel.app/api/transport/requests",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching transport requests:", error);
      toast.error("Failed to fetch transport requests.");
    }
  };

  // Update transport request status
  const updateRequestStatus = async (id, status) => {
    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/transport/request/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        toast.success("Transport request updated successfully.");
        fetchTransportRequests(); // Refresh the list
      } else {
        toast.error("Failed to update transport request.");
      }
    } catch (error) {
      console.error("Error updating transport request:", error);
      toast.error("Failed to update transport request.");
    }
  };

  useEffect(() => {
    fetchTransportRequests();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Transport Requests</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Pickup Location</th>
            <th className="px-4 py-2 text-left">Destination</th>
            <th className="px-4 py-2 text-left">Item Description</th>
            <th className="px-4 py-2 text-left">Date & Time</th>
            <th className="px-4 py-2 text-left">Contact Info</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="border-b">
              <td className="px-4 py-2">{request.pickupLocation}</td>
              <td className="px-4 py-2">{request.destination}</td>
              <td className="px-4 py-2">{request.itemDescription}</td>
              <td className="px-4 py-2">
                {new Date(request.dateTime).toLocaleString()}
              </td>
              <td className="px-4 py-2">{request.contactInfo}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    request.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {request.status === "Pending" && (
                  <button
                    onClick={() =>
                      updateRequestStatus(request._id, "Completed")
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransportRequests;
