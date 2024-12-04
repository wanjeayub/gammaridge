import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [user, setUser] = useState("");
  const [loanData, setLoanData] = useState({ amount: "" });

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
      console.log(data);
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
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
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
        body: JSON.stringify(loanData),
      }
    );
    const data = await response.json();
    // Inform the user about the unpaid loan
    if (!response.ok) {
      alert(data.message);
      setLoanData({
        amount: "",
      });
      return;
    }
    setLoans([...loans, data]);
    setLoanData({
      amount: "",
    });
  };

  async function handleEditLoan(loanId, newAmount) {
    try {
      const response = await fetch(
        `https://gammaridge-server.vercel.app/api/users/loans/edit/${loanId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ amount: newAmount }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Loan updated successfully!");
        console.log(result.loan);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error editing loan:", error);
    }
  }

  async function handleDeleteLoan(loanId) {
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
        alert("Loan deleted successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  }

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
                  value={loanData.amount}
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
                <p>
                  Status: {loan.status}
                  Payment Status: {loan.isPaid ? "Fully Paid" : "In Progress"}
                </p>
                <p>Due date: {loan.dueDate}</p>
                <div>
                  <button onClick={handleEditLoan} className="bg-[#2d2197]">
                    Edit Loan
                  </button>
                  <button onClick={handleDeleteLoan} className="bg-red-600">
                    Delete Loan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserDashboard;
