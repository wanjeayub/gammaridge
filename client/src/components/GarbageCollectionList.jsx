import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GarbageCollectionList() {
  const [requests, setRequests] = useState([]);
  const [sort, setSort] = useState("desc");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null); // State for editing a request
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal
  const [newRequest, setNewRequest] = useState({
    plotCode: "",
    fullName: "",
    phoneNumber: "",
    numberOfBags: 0,
    amountPaid: 0,
    expectedAmount: 0,
    status: "pending",
  }); // State for new request
  const navigate = useNavigate();

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/adminogin");
        return;
      }

      setLoading(true);
      setError(null);

      const params = new URLSearchParams({ sort, filter, search });
      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to fetch requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [sort, filter, search]);

  // Handle marking a request as paid
  const handlePay = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/adminogin");
        return;
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/request/mark-paid/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "paid" }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error("Error updating request:", error);
      setError("Failed to update request. Please try again later.");
    }
  };

  // Handle editing a request
  const handleEdit = (request) => {
    setEditingRequest(request);
  };

  // Handle deleting a request
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/adminogin");
        return;
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/request/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error("Error deleting request:", error);
      setError("Failed to delete request. Please try again later.");
    }
  };

  // Handle saving edits
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/adminogin");
        return;
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/request/edit/${editingRequest._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingRequest),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      fetchRequests(); // Refresh the list
      setEditingRequest(null); // Close the edit modal
    } catch (error) {
      console.error("Error updating request:", error);
      setError("Failed to update request. Please try again later.");
    }
  };

  // Handle adding a new request
  const handleAddRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/adminogin");
        return;
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newRequest),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add request");
      }

      fetchRequests(); // Refresh the list
      setIsAddModalOpen(false); // Close the add modal
      setNewRequest({
        // Reset the form
        plotCode: "",
        fullName: "",
        phoneNumber: "",
        numberOfBags: 0,
        amountPaid: 0,
        expectedAmount: 0,
        status: "pending",
      });
    } catch (error) {
      console.error("Error adding request:", error);
      setError("Failed to add request. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Garbage Collection Requests
      </h1>

      {/* Add Request Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-6"
      >
        Add Request
      </button>

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
                  Plot Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number of Bags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.plotCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.numberOfBags}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.amountPaid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.expectedAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handlePay(request._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => handleEdit(request)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Request Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Request</h2>
            <form onSubmit={handleAddRequest}>
              <div className="mb-4">
                <label className="block text-gray-700">Plot Code</label>
                <input
                  type="text"
                  value={newRequest.plotCode}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, plotCode: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={newRequest.fullName}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, fullName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={newRequest.phoneNumber}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number of Bags</label>
                <input
                  type="number"
                  value={newRequest.numberOfBags}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      numberOfBags: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount Paid</label>
                <input
                  type="number"
                  value={newRequest.amountPaid}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, amountPaid: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Expected Amount</label>
                <input
                  type="number"
                  value={newRequest.expectedAmount}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      expectedAmount: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  value={newRequest.status}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Add Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Request</h2>
            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label className="block text-gray-700">Plot Code</label>
                <input
                  type="text"
                  value={editingRequest.plotCode}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      plotCode: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={editingRequest.fullName}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={editingRequest.phoneNumber}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number of Bags</label>
                <input
                  type="number"
                  value={editingRequest.numberOfBags}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      numberOfBags: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount Paid</label>
                <input
                  type="number"
                  value={editingRequest.amountPaid}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      amountPaid: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Expected Amount</label>
                <input
                  type="number"
                  value={editingRequest.expectedAmount}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      expectedAmount: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  value={editingRequest.status}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      status: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GarbageCollectionList;
