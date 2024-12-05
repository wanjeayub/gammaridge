import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv"; // For CSV export
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch loans on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setStatusMessage("User not authenticated. Please log in.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const loansResponse = await axios.get(
          "https://gammaridge-server.vercel.app/api/admin/loans",
          { headers }
        );

        setLoans(loansResponse.data);
        setStatusMessage("Loans fetched successfully.");
      } catch (err) {
        setStatusMessage("Error fetching data. Please try again later.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Handle loan approval or rejection
  const handleApproval = async (id, status) => {
    try {
      await axios.put(
        `https://gammaridge-server.vercel.app/api/admin/loan/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLoans(
        loans.map((loan) => (loan._id === id ? { ...loan, status } : loan))
      );
      setStatusMessage(
        `Loan ${status === "approved" ? "approved" : "rejected"} successfully.`
      );
    } catch (error) {
      setStatusMessage("Error updating loan. Please try again.");
      console.error(error);
    }
  };

  // Handle CSV export data preparation
  const handleExport = () =>
    loans.map(({ _id, user, amount, status, isPaid }) => ({
      LoanID: _id,
      UserName: user.name,
      Mobile: user.mobile,
      Amount: amount,
      Status: status,
      PaymentStatus: isPaid ? "Paid" : "In Progress",
    }));

  // Filtered and searched loans
  const filteredLoans = loans.filter((loan) =>
    filterStatus === "all" ? true : loan.status === filterStatus
  );
  const displayedLoans = filteredLoans.filter((loan) =>
    loan.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pie chart data for overview
  const loanStatuses = ["pending", "approved", "paid"];
  const loanStatusCounts = loanStatuses.map(
    (status) =>
      loans.filter(
        (loan) => loan.status === status || (status === "paid" && loan.isPaid)
      ).length
  );

  const chartData = {
    labels: ["Pending", "Approved", "Paid"],
    datasets: [
      {
        label: "Loan Status",
        data: loanStatusCounts,
        backgroundColor: ["#FBBF24", "#10B981", "#3B82F6"],
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Menu */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-500">Admin Dashboard</h1>
        </div>
        <nav className="mt-10 space-y-4">
          <button
            onClick={() => setActiveSection("overview")}
            className={`block w-full text-left px-6 py-3 ${
              activeSection === "overview" ? "bg-gray-800" : "hover:bg-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("loans")}
            className={`block w-full text-left px-6 py-3 ${
              activeSection === "loans" ? "bg-gray-800" : "hover:bg-gray-700"
            }`}
          >
            Loans
          </button>
          <button
            onClick={() => setActiveSection("transactions")}
            className={`block w-full text-left px-6 py-3 ${
              activeSection === "transactions"
                ? "bg-gray-800"
                : "hover:bg-gray-700"
            }`}
          >
            Transactions
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Status Message */}
        {statusMessage && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
            {statusMessage}
          </div>
        )}

        {/* Overview Section */}
        {activeSection === "overview" && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-600">
                  Total Loans
                </h3>
                <p className="text-2xl font-bold text-blue-500">
                  {loans.length}
                </p>
              </div>
              <Pie data={chartData} />
            </div>
          </section>
        )}

        {/* Loans Section */}
        {activeSection === "loans" && (
          <section>
            <div className="flex justify-between mb-6">
              <input
                type="text"
                placeholder="Search by user or loan ID..."
                className="p-3 border rounded w-1/3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="p-3 border rounded"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <CSVLink
              data={handleExport()}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Export CSV
            </CSVLink>
            <div className="mt-4">
              {displayedLoans.map((loan) => (
                <div
                  key={loan._id}
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <h3 className="text-lg font-semibold">Loan ID: {loan._id}</h3>
                  <p>User: {loan.user.name}</p>
                  <p>Amount: {loan.amount}</p>
                  <p>Status: {loan.status}</p>
                  <div className="flex gap-2 mt-2">
                    {loan.status === "pending" && (
                      <>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded"
                          onClick={() => handleApproval(loan._id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => handleApproval(loan._id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
