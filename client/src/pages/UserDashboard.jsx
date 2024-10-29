import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loanData, setLoanData] = useState({ amount: "", duration: "" });

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch("/api/users/loans", {
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
    setLoanData({
      amount: "",
    });
  };

  return (
    <div className="container mx-auto p-3 text-white">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
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

      <h2 className="text-xl mt-8">My Loans</h2>
      {loans.length === 0 ? (
        <p>You have no running loans</p>
      ) : (
        <ul className="flex p-4 flex-col">
          {loans.map((loan) => (
            <li key={loan._id} className="mb-2">
              Amount: <span className="font-semibold">Ksh</span> {loan.amount} -
              Interest: <span className="font-semibold">Ksh</span>
              {loan.interest} - Total Amount:
              <span className="font-semibold"> Ksh</span> {loan.totalLoan} -
              Status: {loan.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
