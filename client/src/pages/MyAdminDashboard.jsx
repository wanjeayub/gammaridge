import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalBorrowed: 0,
    totalUsers: 0,
    totalInterest: 0,
  });
  const [loans, setLoans] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loanStats, setLoanStats] = useState({
    approved: 0,
    pending: 0,
    fullyPaid: 0,
  });
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({ username: "", password: "" });
  const [isPartialPaymentModalOpen, setIsPartialPaymentModalOpen] =
    useState(false);
  const [isMarkPaidModalOpen, setIsMarkPaidModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState("");
  const [validationError, setValidationError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // "all", "day", "week", "month"

  // Function to open the modal with the selected image
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };
  // Fetch summary data
  const fetchSummary = async () => {
    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/admin/summary",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch summary data.");
    }
  };

  // Fetch all loans
  const fetchLoans = async () => {
    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/admin/loans",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch loans.");
    }
  };

  // Fetch activity logs
  const fetchActivityLogs = async () => {
    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/admin/activity-logs",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setActivityLogs(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch activity logs.");
    }
  };

  // Fetch loan statistics
  const fetchLoanStats = async () => {
    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/admin/loan-stats",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setLoanStats(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch loan statistics.");
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/admin/users",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users.");
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/admin/notifications",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch notifications.");
    }
  };

  // Approve a loan
  const approveLoan = async (loanId) => {
    try {
      const response = await fetch(
        `https://gammaridge-server.vercel.app/api/admin/approve-loan/${loanId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.ok) {
        toast.success("Loan approved successfully.");
        fetchLoans(); // Refresh loans
        fetchLoanStats(); // Refresh loan stats
      } else {
        toast.error("Failed to approve loan.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve loan.");
    }
  };

  // Open partial payment modal
  const openPartialPaymentModal = (loan) => {
    setSelectedLoan(loan);
    setIsPartialPaymentModalOpen(true);
  };

  // Close partial payment modal
  const closePartialPaymentModal = () => {
    setIsPartialPaymentModalOpen(false);
    setPartialPaymentAmount("");
    setValidationError("");
  };

  // Handle partial payment
  const handlePartialPayment = async () => {
    if (
      !partialPaymentAmount ||
      isNaN(partialPaymentAmount) ||
      partialPaymentAmount <= 0
    ) {
      setValidationError("Please enter a valid amount.");
      return;
    }

    try {
      const response = await fetch(
        `https://gammaridge-server.vercel.app/api/admin/partial-payment/${selectedLoan._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: partialPaymentAmount }),
        }
      );
      if (response.ok) {
        toast.success("Partial payment recorded successfully.");
        fetchLoans(); // Refresh loans
        closePartialPaymentModal();
      } else {
        toast.error("Failed to record partial payment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to record partial payment.");
    }
  };

  // Open mark paid modal
  const openMarkPaidModal = (loan) => {
    setSelectedLoan(loan);
    setIsMarkPaidModalOpen(true);
  };

  // Close mark paid modal
  const closeMarkPaidModal = () => {
    setIsMarkPaidModalOpen(false);
  };

  // Mark loan as fully paid
  const markLoanAsPaid = async () => {
    try {
      const response = await fetch(
        `https://gammaridge-server.vercel.app/api/admin/mark-paid/${selectedLoan._id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.ok) {
        toast.success("Loan marked as fully paid.");
        fetchLoans(); // Refresh loans
        closeMarkPaidModal();
      } else {
        toast.error("Failed to mark loan as paid.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark loan as paid.");
    }
  };

  // Open Delete Modal
  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  // Handle Delete Request
  const handleConfirmDelete = async () => {
    if (!userToDelete) {
      console.error("No user selected for deletion");
      return;
    }

    try {
      const response = await fetch(
        `https://gammaridge-server.vercel.app/api/admin/delete/${userToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete user");

      // Remove user from state
      setUsers(users.filter((user) => user._id !== userToDelete));

      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    } finally {
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  // Handle Close Modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Toggle user status (block/unblock)
  const toggleUserStatus = async (userId, isActive) => {
    try {
      const response = await fetch(
        `https://gammaridge-server.vercel.app/api/admin/toggle-user-status/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive }),
        }
      );
      if (response.ok) {
        toast.success(
          `User ${isActive ? "unblocked" : "blocked"} successfully.`
        );
        fetchUsers(); // Refresh users
      } else {
        toast.error("Failed to update user status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status.");
    }
  };

  // Update admin credentials
  const updateCredentials = async () => {
    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/admin/update-credentials",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        }
      );
      if (response.ok) {
        toast.success("Credentials updated successfully.");
      } else {
        toast.error("Failed to update credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update credentials.");
    }
  };

  // Filter loans by date
  const filterLoansByDate = (loans, filter) => {
    const now = new Date();
    switch (filter) {
      case "day":
        return loans.filter((loan) => {
          const loanDate = new Date(loan.createdAt);
          return loanDate >= startOfDay(now) && loanDate <= endOfDay(now);
        });
      case "week":
        return loans.filter((loan) => {
          const loanDate = new Date(loan.createdAt);
          return loanDate >= startOfWeek(now) && loanDate <= endOfWeek(now);
        });
      case "month":
        return loans.filter((loan) => {
          const loanDate = new Date(loan.createdAt);
          return loanDate >= startOfMonth(now) && loanDate <= endOfMonth(now);
        });
      default:
        return loans;
    }
  };

  // Filter loans by search query
  const filterLoansBySearch = (loans, query) => {
    return loans.filter(
      (loan) =>
        loan.userId?.fullName?.toLowerCase().includes(query.toLowerCase()) ||
        loan.loanAmount.toString().includes(query) ||
        loan.status.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Apply filters
  const filteredLoans = filterLoansBySearch(
    filterLoansByDate(loans, dateFilter),
    searchQuery
  );

  useEffect(() => {
    fetchSummary();
    fetchLoans();
    fetchActivityLogs();
    fetchLoanStats();
    fetchUsers();
    fetchNotifications();
  }, []);

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome to the Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Borrowed</h2>
          <p className="text-2xl">Ksh {summary.totalBorrowed}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl">{summary.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Interest</h2>
          <p className="text-2xl">Ksh {summary.totalInterest}</p>
        </div>
      </div>

      {/* Loan Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Loan Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Approved Loans</h3>
            <p className="text-2xl">{summary.approvedLoans}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Pending Loans</h3>
            <p className="text-2xl">{summary.pendingLoans}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Fully Paid Loans</h3>
            <p className="text-2xl">{summary.fullyPaidLoans}</p>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">All Loans</h2>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search loans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border rounded-lg"
          />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="ml-4 px-3 py-2 border rounded-lg"
          >
            <option value="all">All Time</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Loan Amount</th>
              <th className="px-4 py-2 text-left">Interest</th>
              <th className="px-4 py-2 text-left">Total Repayment</th>
              <th className="px-4 py-2 text-left">Paid Amount</th>
              <th className="px-4 py-2 text-left">Remaining Balance</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan._id} className="border-b">
                <td className="px-4 py-2">{loan.userId?.fullName}</td>
                <td className="px-4 py-2">Ksh {loan.loanAmount}</td>
                <td className="px-4 py-2">Ksh {loan.interest}</td>
                <td className="px-4 py-2">Ksh {loan.totalRepayment}</td>
                <td className="px-4 py-2">Ksh {loan.paidAmount}</td>
                <td className="px-4 py-2">Ksh {loan.remainingBalance}</td>
                <td className="px-4 py-2">{loan.status}</td>
                <td className="px-4 py-2">
                  {loan.status === "pending" && (
                    <button
                      onClick={() => approveLoan(loan._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Approve
                    </button>
                  )}
                  {(loan.status === "approved" ||
                    loan.status === "partially paid") && (
                    <>
                      <button
                        onClick={() => openPartialPaymentModal(loan)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                      >
                        Partial Pay
                      </button>
                      <button
                        onClick={() => openMarkPaidModal(loan)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                      >
                        Mark Paid
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Partial Payment Modal */}
      {isPartialPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Partial Payment</h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={partialPaymentAmount}
              onChange={(e) => setPartialPaymentAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
            />
            {validationError && (
              <p className="text-red-500 text-sm mb-4">{validationError}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={closePartialPaymentModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handlePartialPayment}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark Paid Modal */}
      {isMarkPaidModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Mark Loan as Paid</h2>
            <p>Are you sure you want to mark this loan as fully paid?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeMarkPaidModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={markLoanAsPaid}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Activity Logs */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {activityLogs.map((log) => (
              <tr key={log._id} className="border-b">
                <td className="px-4 py-2">{log.userId?.fullName}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Management */}

      <div className="p-6">
        {/* User Management */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Profile</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Id Number</th>
                <th className="px-4 py-2 text-left">Mobile Number</th>
                <th className="px-4 py-2 text-left">Id photo Front</th>

                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      className="w-12 h-12 rounded-full cursor-pointer"
                      onClick={() => openImageModal(user.profilePhoto)}
                    />
                  </td>
                  <td className="px-4 py-2">{user.fullName}</td>
                  <td className="px-4 py-2">{user.idNumber}</td>
                  <td className="px-4 py-2">{user.mobileNumber}</td>
                  <td className="px-4 py-2">
                    <img
                      src={user.idFrontPhoto}
                      alt="ID Front"
                      className="w-12 h-12 rounded-full cursor-pointer"
                      onClick={() => openImageModal(user.idFrontPhoto)}
                    />
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                      onClick={() => openDeleteModal(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{user.fullName}</td>
                  <td className="px-4 py-2">{user.idNumber}</td>
                  <td className="px-4 py-2">{user.mobileNumber}</td>
                  <td className="px-4 py-2">
                    <Link to={user.idFrontPhoto}>
                      <img
                        src={user.idFrontPhoto}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                    </Link>
                  </td>

                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => openDeleteModal(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="relative bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={selectedImage}
                  alt="Enlarged"
                  className="w-96 h-auto rounded-lg"
                />
                <button
                  onClick={closeImageModal}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">Confirm Deletion</h3>
              <p className="mt-2">Are you sure you want to delete this user?</p>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Profile</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Id Number</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.profilePhoto}</td>
                <td className="px-4 py-2">{user.fullName}</td>
                <td className="px-4 py-2">{user.idNumber}</td>
                <td className="px-4 py-2">
                  {user.isActive ? "Active" : "Blocked"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleUserStatus(user._id, !user.isActive)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    {user.isActive ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="border-b py-2">
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Settings Tab */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={settings.username}
              onChange={(e) =>
                setSettings({ ...settings, username: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={settings.password}
              onChange={(e) =>
                setSettings({ ...settings, password: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            onClick={updateCredentials}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Update Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
