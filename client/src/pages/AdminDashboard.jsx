import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");

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

  // Segregate loans by status
  const pendingLoans = loans.filter((loan) => loan.status === "pending");
  const approvedLoans = loans.filter((loan) => loan.status === "approved");
  const paidLoans = loans.filter((loan) => loan.isPaid);

  return (
    <div className="flex h-screen">
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
      <main className="flex-1 p-6 bg-gray-100">
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
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-600">
                  Pending Loans
                </h3>
                <p className="text-2xl font-bold text-yellow-500">
                  {pendingLoans.length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-600">
                  Approved Loans
                </h3>
                <p className="text-2xl font-bold text-green-500">
                  {approvedLoans.length}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Loans Section */}
        {activeSection === "loans" && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Loans</h2>
            <div className="space-y-8">
              <LoanTable loans={pendingLoans} title="Pending Loans" />
              <LoanTable loans={approvedLoans} title="Approved Loans" />
              <LoanTable loans={paidLoans} title="Paid Loans" />
            </div>
          </section>
        )}

        {/* Transactions Section */}
        {activeSection === "transactions" && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Transactions</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p>
                Transaction data will go here. Add filters and tables as needed.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

const LoanTable = ({ loans, title }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold text-gray-600 mb-4">{title}</h3>
    {loans.length === 0 ? (
      <p className="text-gray-500">No loans in this category.</p>
    ) : (
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-gray-600 uppercase text-sm border-b">
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{loan.user.name}</td>
              <td className="px-4 py-2">${loan.amount}</td>
              <td className="px-4 py-2">{loan.status}</td>
              <td className="px-4 py-2">
                {loan.status === "pending" && (
                  <>
                    <button className="text-green-500 hover:underline">
                      Approve
                    </button>{" "}
                    |{" "}
                    <button className="text-red-500 hover:underline">
                      Reject
                    </button>
                  </>
                )}
                {loan.isPaid && <span className="text-blue-500">Paid</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default AdminDashboard;
