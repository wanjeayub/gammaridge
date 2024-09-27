import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loanData, setLoanData] = useState({ amount: "", duration: "" });

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch("http://localhost:5000/api/users/loans", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setLoans(data);
    };
    fetchLoans();
  }, []);

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users/loan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(loanData),
    });
    const data = await response.json();
    setLoans([...loans, data]);
    setLoanData({});
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <div>
        <h2 className="text-xl">Apply for a new loan</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <input
            name="amount"
            value={loanData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
            className="border p-2 w-full"
          />
          <input
            name="duration"
            value={loanData.duration}
            onChange={handleChange}
            placeholder="Duration (months)"
            required
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 w-full"
          >
            Apply
          </button>
        </form>
      </div>

      <h2 className="text-xl mt-8">Your Loans</h2>
      {loans.length === 0 ? (
        <p>No loans found</p>
      ) : (
        <ul>
          {loans.map((loan) => (
            <li key={loan._id}>
              Amount: {loan.amount} - Duration: {loan.duration} months - Status:{" "}
              {loan.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
