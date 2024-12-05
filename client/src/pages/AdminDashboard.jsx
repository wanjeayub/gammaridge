import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User not authenticated. Please log in.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const loansResponse = await axios.get(
          "https://gammaridge-server.vercel.app/api/admin/loans",
          { headers }
        );

        setLoans(loansResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Sort loans by status
  const sortedLoans = [...loans].sort((a, b) =>
    a.status.localeCompare(b.status)
  );

  // Group loans by creation month
  const loansByMonth = sortedLoans.reduce((acc, loan) => {
    const month = new Date(loan.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[month] = acc[month] || [];
    acc[month].push(loan);
    return acc;
  }, {});

  const handleApproval = async (id, status) => {
    await fetch(`https://gammaridge-server.vercel.app/api/admin/loan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    });
    setLoans(
      loans.map((loan) => (loan._id === id ? { ...loan, status } : loan))
    );
  };

  const handlePay = async (id) => {
    await fetch(
      `https://gammaridge-server.vercel.app/api/admin/loan/repay/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isPaid: true }),
      }
    );
    setLoans(
      loans.map((loan) => (loan._id === id ? { ...loan, isPaid: true } : loan))
    );
  };

  return (
    <section className="max-w-6xl mx-auto text-white">
      <div>
        <span className="text-3xl">Admin Dashboard</span>
      </div>
      {Object.entries(loansByMonth).map(([month, loans]) => (
        <div key={month} className="mt-6">
          <h2 className="text-2xl font-bold mb-4">{month}</h2>
          <div className="flex flex-col gap-4">
            {loans.map((loan) => (
              <div key={loan._id} className="p-4 border rounded-md bg-gray-800">
                {loan.status === "pending" && (
                  <Link to={loan.user.photoURLFront} target="_blank">
                    <img
                      src={loan.user.photoURLFront}
                      alt="ID Front"
                      className="w-[200px] mb-4"
                    />
                  </Link>
                )}
                <div>
                  <span>User: {loan.user.name}</span>
                  <span>Mobile: {loan.user.mobile}</span>
                  <span>Alternate Mobile: {loan.user.alternatemobile}</span>
                  <span>Loan Amount: {loan.totalLoan}</span>
                  <span>Principal Amount: {loan.amount}</span>
                  <span>Status: {loan.status}</span>
                  <span>
                    Payment Status: {loan.isPaid ? "Paid" : "In Progress"}
                  </span>
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleApproval(loan._id, "approved")}
                    className="bg-green-500 text-white p-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(loan._id, "rejected")}
                    className="bg-red-500 text-white p-2"
                  >
                    Reject
                  </button>
                  {!loan.isPaid && (
                    <button
                      className="bg-blue-500 p-2 text-white"
                      onClick={() => handlePay(loan._id)}
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default AdminDashboard;
