import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [user, setUser] = useState("");
  const [loanData, setLoanData] = useState({ amount: "" });
  const [editLoanId, setEditLoanId] = useState(null); // For tracking the loan being edited
  const [newLoanData, setNewLoanData] = useState({ amount: "" }); // For new loan form

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/users/loans",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setLoans(data);
    };
    const fetchUser = async () => {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/users/user",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setUser(data);
    };
    fetchLoans();
    fetchUser();
  }, []);

  const paidLoans = loans.filter((loan) => loan.isPaid);
  const pendingLoans = loans.filter((loan) => loan.status === "pending");

  const handleChange = (e) => {
    setNewLoanData({ ...newLoanData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setNewLoanData({ ...newLoanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://gammaridge-server.vercel.app/api/users/loans/apply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newLoanData),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      setNewLoanData({ amount: "" });
      return;
    }
    setLoans([...loans, data]);
    setNewLoanData({ amount: "" });
  };

  const handleEditLoan = async (loanId) => {
    const loan = loans.find((loan) => loan._id === loanId);
    setEditLoanId(loanId);
    setNewLoanData({ amount: loan.amount }); // Pre-fill the form with current loan data
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://gammaridge-server.vercel.app/api/users/loans/edit/${editLoanId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newLoanData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setLoans(
        loans.map((loan) =>
          loan._id === editLoanId ? { ...loan, ...newLoanData } : loan
        )
      );
      setEditLoanId(null); // Close the edit form
      alert("Loan updated successfully!");
    } else {
      alert(data.message);
    }
  };

  const handleDeleteLoan = async (loanId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this loan?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://gammaridge-server.vercel.app/api/users/loans/delete/${loanId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setLoans(loans.filter((loan) => loan._id !== loanId)); // Remove the loan from the UI
        alert("Loan deleted successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  };

  return (
    <div className="container mx-auto p-3 text-white">
      <div>
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <h1>Welcome back {user?.name}, we are glad you are here</h1>
      </div>

      <div>
        <h2 className="text-xl mt-8">My Loans</h2>

        {loans.length === 0 || pendingLoans.length === 0 ? (
          <div>
            <p>You have no pending loans</p>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl">Apply for a new loan</h2>
              <form onSubmit={handleSubmit} className="max-w-md gap-3 flex">
                <input
                  name="amount"
                  value={newLoanData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  required
                  className="border p-2 w-full bg-gray-600 text-white"
                />
                <button
                  type="submit"
                  className="bg-[#b9283b] text-white py-2 px-4 w-full"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex p-4 flex-col">
            {pendingLoans.map((loan) => (
              <div
                key={loan._id}
                className="mb-2 border p-3 flex flex-col bg-slate-500"
              >
                <p>
                  Amount: <span className="font-semibold">Ksh</span>{" "}
                  {loan.amount}
                </p>
                <p>
                  Interest: <span className="font-semibold">Ksh</span>
                  {loan.interest}
                </p>
                <p>
                  Total Amount:
                  <span className="font-semibold"> Ksh</span> {loan.totalLoan}
                </p>
                <p>Status: {loan.status}</p>
                <p>
                  Payment Status: {loan.isPaid ? "Fully Paid" : "In Progress"}
                </p>
                <p>Due date: {loan.dueDate}</p>

                <div>
                  <button
                    onClick={() => handleEditLoan(loan._id)}
                    className="bg-[#2d2197] text-white py-2 px-4"
                  >
                    Edit Loan
                  </button>
                  <button
                    onClick={() => handleDeleteLoan(loan._id)}
                    className="bg-red-600 text-white py-2 px-4"
                  >
                    Delete Loan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editLoanId && (
        <div className="mt-8 p-4 bg-gray-600">
          <h2 className="text-xl">Edit Loan</h2>
          <form onSubmit={handleSubmitEdit} className="flex gap-3">
            <input
              name="amount"
              value={newLoanData.amount}
              onChange={handleEditChange}
              placeholder="New Amount"
              required
              className="border p-2 w-full bg-gray-600 text-white"
            />
            <button type="submit" className="bg-[#2d2197] text-white py-2 px-4">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditLoanId(null)}
              className="bg-red-600 text-white py-2 px-4"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
