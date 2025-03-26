import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Helper function defined outside component
function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function GarbageCollectionList() {
  const [requests, setRequests] = useState([]);
  const [locations, setLocations] = useState([]);
  const [paymentGroups, setPaymentGroups] = useState([]);
  const [sort, setSort] = useState("desc");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(getCurrentMonth());
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPaymentGroupModalOpen, setIsPaymentGroupModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedRequestForPayment, setSelectedRequestForPayment] =
    useState(null);

  const [newRequest, setNewRequest] = useState({
    plotCode: "",
    fullName: "",
    phoneNumber: "",
    numberOfBags: 0,
    amountPaid: 0,
    expectedAmount: 0,
    status: "pending",
    location: "",
    paymentGroup: "",
  });

  const [newLocation, setNewLocation] = useState({
    name: "",
    description: "",
  });

  const [newPaymentGroup, setNewPaymentGroup] = useState({
    name: "",
    location: "",
    expectedAmount: 0,
    description: "",
  });

  const navigate = useNavigate();

  // Add missing handleEdit function
  const handleEdit = (request) => {
    setEditingRequest({
      ...request,
      location: request.location?._id || request.location || "",
      paymentGroup: request.paymentGroup?._id || request.paymentGroup || "",
    });
  };

  // Fetch all data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        sort,
        filter,
        search,
        month,
        location: selectedLocation,
      });

      // Fetch requests
      const requestsResponse = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (requestsResponse.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!requestsResponse.ok) {
        throw new Error("Failed to fetch requests");
      }

      const requestsData = await requestsResponse.json();
      setRequests(requestsData);

      // Fetch summary
      const summaryParams = new URLSearchParams({
        month,
        location: selectedLocation,
      });
      const summaryResponse = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/summary?${summaryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json();
        setSummary(
          summaryData || {
            totalExpected: 0,
            totalPaid: 0,
            pendingCount: 0,
            partialCount: 0,
            paidCount: 0,
          }
        );
      }

      // Fetch locations
      const locationsResponse = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/locations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (locationsResponse.ok) {
        const locationsData = await locationsResponse.json();
        // Ensure we always set an array
        setLocations(Array.isArray(locationsData) ? locationsData : []);
      } else {
        setLocations([]); // Fallback to empty array if request fails
      }

      if (locationsResponse.ok) {
        const locationsData = await locationsResponse.json();
        setLocations(locationsData || []);
      }

      // Fetch payment groups
      const groupsResponse = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/payment-groups`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (groupsResponse.ok) {
        const groupsData = await groupsResponse.json();
        setPaymentGroups(groupsData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sort, filter, search, month, selectedLocation]);

  // Forward payment to next month
  const handleForward = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/${id}/forward`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        throw new Error("Failed to forward request");
      }

      fetchData();
    } catch (error) {
      console.error("Error forwarding request:", error);
      setError("Failed to forward request. Please try again later.");
    }
  };

  // Handle making a payment
  const handleMakePayment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Validate payment amount
      const amount = Number(paymentAmount);
      if (isNaN(amount) || amount < 0) {
        throw new Error("Invalid payment amount");
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/${selectedRequestForPayment._id}/pay`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: amount,
            paymentMethod,
          }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to process payment");
      }

      fetchData();
      setIsPaymentModalOpen(false);
      setPaymentAmount(0);
    } catch (error) {
      console.error("Error processing payment:", error);
      setError(
        error.message || "Failed to process payment. Please try again later."
      );
    }
  };

  // Handle adding a new location
  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (!newLocation.name) {
        throw new Error("Location name is required");
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/locations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newLocation),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add location");
      }

      const data = await response.json();
      setLocations([...locations, data]);
      setIsLocationModalOpen(false);
      setNewLocation({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding location:", error);
      setError(
        error.message || "Failed to add location. Please try again later."
      );
    }
  };

  // Handle adding a new payment group
  const handleAddPaymentGroup = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (!newPaymentGroup.name || !newPaymentGroup.location) {
        throw new Error("Name and location are required");
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/payment-groups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newPaymentGroup),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add payment group");
      }

      const data = await response.json();
      setPaymentGroups([...paymentGroups, data]);
      setIsPaymentGroupModalOpen(false);
      setNewPaymentGroup({
        name: "",
        location: "",
        expectedAmount: 0,
        description: "",
      });
    } catch (error) {
      console.error("Error adding payment group:", error);
      setError(
        error.message || "Failed to add payment group. Please try again later."
      );
    }
  };

  // Handle adding a new request
  const handleAddRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Validate required fields
      if (
        !newRequest.plotCode ||
        !newRequest.fullName ||
        !newRequest.phoneNumber
      ) {
        throw new Error("Plot Code, Full Name, and Phone Number are required.");
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...newRequest,
            month,
          }),
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

      fetchData();
      setIsAddModalOpen(false);
      setNewRequest({
        plotCode: "",
        fullName: "",
        phoneNumber: "",
        numberOfBags: 0,
        amountPaid: 0,
        expectedAmount: 0,
        status: "pending",
        location: "",
        paymentGroup: "",
      });
    } catch (error) {
      console.error("Error adding request:", error);
      setError(
        error.message || "Failed to add request. Please try again later."
      );
    }
  };

  // Handle editing a request
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Validate required fields
      if (
        !editingRequest.plotCode ||
        !editingRequest.fullName ||
        !editingRequest.phoneNumber
      ) {
        throw new Error("Plot Code, Full Name, and Phone Number are required.");
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/${editingRequest._id}`,
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

      fetchData();
      setEditingRequest(null);
    } catch (error) {
      console.error("Error updating request:", error);
      setError(
        error.message || "Failed to update request. Please try again later."
      );
    }
  };

  // Handle deleting a request
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://tester-server.vercel.app/api/garbage/requests/${id}`,
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

      fetchData();
    } catch (error) {
      console.error("Error deleting request:", error);
      setError("Failed to delete request. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Garbage Collection Requests - {month}
      </h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <>
          {/* Summary Card */}
          {summary && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Monthly Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800">
                    Expected Amount
                  </h3>
                  <p className="text-2xl font-bold">
                    ${summary.totalExpected ?? 0}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">Amount Paid</h3>
                  <p className="text-2xl font-bold">
                    ${summary.totalPaid ?? 0}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800">Balance</h3>
                  <p className="text-2xl font-bold">
                    ${(summary.totalExpected ?? 0) - (summary.totalPaid ?? 0)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800">Pending</h3>
                  <p className="text-2xl font-bold">
                    {summary.pendingCount ?? 0}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800">Partial</h3>
                  <p className="text-2xl font-bold">
                    {summary.partialCount ?? 0}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Paid</h3>
                  <p className="text-2xl font-bold">{summary.paidCount ?? 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add Request
            </button>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Location
            </button>
            <button
              onClick={() => setIsPaymentGroupModalOpen(true)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md"
            >
              Add Payment Group
            </button>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-wrap gap-4">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                const monthValue = `${date.getFullYear()}-${String(
                  date.getMonth() + 1
                ).padStart(2, "0")}`;
                const monthName = date.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                });
                return (
                  <option key={monthValue} value={monthValue}>
                    {monthName}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="desc">Latest First</option>
              <option value="asc">Oldest First</option>
              <option value="plotCodeAsc">Plot Code (Ascending)</option>
              <option value="plotCodeDesc">Plot Code (Descending)</option>
            </select>

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

            <input
              type="text"
              placeholder="Search by name, phone, or plot code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded-md flex-grow"
            />
          </div>

          {/* No Requests Message */}
          {requests.length === 0 && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
              No garbage collection requests found.
            </div>
          )}

          {/* Table */}
          {requests.length > 0 && (
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
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paid
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expected
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
                        {request.location?.name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.paymentGroup?.name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.numberOfBags ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${request.amountPaid ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${request.expectedAmount ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            request.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : request.status === "partial"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 space-x-1">
                        <button
                          onClick={() => {
                            setSelectedRequestForPayment(request);
                            setPaymentAmount(
                              (request.expectedAmount ?? 0) -
                                (request.amountPaid ?? 0)
                            );
                            setIsPaymentModalOpen(true);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Pay
                        </button>
                        <button
                          onClick={() => handleForward(request._id)}
                          className="bg-purple-500 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Forward
                        </button>
                        <button
                          onClick={() => handleEdit(request)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"
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
        </>
      )}

      {/* Add Request Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Request</h2>
            <form onSubmit={handleAddRequest}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Plot Code*</label>
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
                  <label className="block text-gray-700">Full Name*</label>
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
                  <label className="block text-gray-700">Phone Number*</label>
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
                  <label className="block text-gray-700">Location</label>
                  <select
                    value={newRequest.location}
                    onChange={(e) =>
                      setNewRequest({ ...newRequest, location: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location._id} value={location._id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Payment Group</label>
                  <select
                    value={newRequest.paymentGroup}
                    onChange={(e) =>
                      setNewRequest({
                        ...newRequest,
                        paymentGroup: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Payment Group</option>
                    {paymentGroups.map((group) => (
                      <option key={group._id} value={group._id}>
                        {group.name} (${group.expectedAmount ?? 0})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Number of Bags</label>
                  <input
                    type="number"
                    min="0"
                    value={newRequest.numberOfBags}
                    onChange={(e) =>
                      setNewRequest({
                        ...newRequest,
                        numberOfBags: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Amount Paid</label>
                  <input
                    type="number"
                    min="0"
                    value={newRequest.amountPaid}
                    onChange={(e) =>
                      setNewRequest({
                        ...newRequest,
                        amountPaid: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Expected Amount</label>
                  <input
                    type="number"
                    min="0"
                    value={newRequest.expectedAmount}
                    onChange={(e) =>
                      setNewRequest({
                        ...newRequest,
                        expectedAmount: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
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

      {/* Add Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Location</h2>
            <form onSubmit={handleAddLocation}>
              <div className="mb-4">
                <label className="block text-gray-700">Name*</label>
                <input
                  type="text"
                  value={newLocation.name}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={newLocation.description}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Payment Group Modal */}
      {isPaymentGroupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Payment Group</h2>
            <form onSubmit={handleAddPaymentGroup}>
              <div className="mb-4">
                <label className="block text-gray-700">Name*</label>
                <input
                  type="text"
                  value={newPaymentGroup.name}
                  onChange={(e) =>
                    setNewPaymentGroup({
                      ...newPaymentGroup,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                {loading ? (
                  <div className="p-2 border border-gray-300 rounded-md">
                    Loading locations...
                  </div>
                ) : (
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location._id} value={location._id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Expected Amount*</label>
                <input
                  type="number"
                  min="0"
                  value={newPaymentGroup.expectedAmount}
                  onChange={(e) =>
                    setNewPaymentGroup({
                      ...newPaymentGroup,
                      expectedAmount: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={newPaymentGroup.description}
                  onChange={(e) =>
                    setNewPaymentGroup({
                      ...newPaymentGroup,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPaymentGroupModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                >
                  Add Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedRequestForPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Make Payment</h2>
            <div className="mb-2">
              <span className="font-semibold">Plot Code:</span>{" "}
              {selectedRequestForPayment.plotCode}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Name:</span>{" "}
              {selectedRequestForPayment.fullName}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Expected Amount:</span> $
              {selectedRequestForPayment.expectedAmount ?? 0}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Amount Paid:</span> $
              {selectedRequestForPayment.amountPaid ?? 0}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Balance:</span> $
              {(selectedRequestForPayment.expectedAmount ?? 0) -
                (selectedRequestForPayment.amountPaid ?? 0)}
            </div>
            <form onSubmit={handleMakePayment}>
              <div className="mb-4">
                <label className="block text-gray-700">Payment Amount*</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) =>
                    setPaymentAmount(Number(e.target.value) || 0)
                  }
                  max={
                    (selectedRequestForPayment.expectedAmount ?? 0) -
                    (selectedRequestForPayment.amountPaid ?? 0)
                  }
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="cash">Cash</option>
                  <option value="mpesa">M-Pesa</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsPaymentModalOpen(false);
                    setSelectedRequestForPayment(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Process Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Request</h2>
            <form onSubmit={handleSaveEdit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Plot Code*</label>
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
                  <label className="block text-gray-700">Full Name*</label>
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
                  <label className="block text-gray-700">Phone Number*</label>
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
                  <label className="block text-gray-700">Location</label>
                  <select
                    value={
                      editingRequest.location?._id || editingRequest.location
                    }
                    onChange={(e) =>
                      setEditingRequest({
                        ...editingRequest,
                        location: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location._id} value={location._id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Payment Group</label>
                  <select
                    value={
                      editingRequest.paymentGroup?._id ||
                      editingRequest.paymentGroup
                    }
                    onChange={(e) =>
                      setEditingRequest({
                        ...editingRequest,
                        paymentGroup: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Payment Group</option>
                    {paymentGroups.map((group) => (
                      <option key={group._id} value={group._id}>
                        {group.name} (${group.expectedAmount ?? 0})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Number of Bags</label>
                  <input
                    type="number"
                    min="0"
                    value={editingRequest.numberOfBags}
                    onChange={(e) =>
                      setEditingRequest({
                        ...editingRequest,
                        numberOfBags: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Amount Paid</label>
                  <input
                    type="number"
                    min="0"
                    value={editingRequest.amountPaid}
                    onChange={(e) =>
                      setEditingRequest({
                        ...editingRequest,
                        amountPaid: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Expected Amount</label>
                  <input
                    type="number"
                    min="0"
                    value={editingRequest.expectedAmount}
                    onChange={(e) =>
                      setEditingRequest({
                        ...editingRequest,
                        expectedAmount: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
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
                  Save Changes
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
