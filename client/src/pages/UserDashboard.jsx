import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loanData, setLoanData] = useState({ amount: "", duration: "" });

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
    fetchLoans();
  }, []);

  const paidLoans = loans.filter((loan) => loan.isPaid);
  const pendingLoans = loans.filter((loan) => loan.status === "pending");

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://gammaridge-server.vercel.app/api/users/loan",
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

  return (
    <div className="container mx-auto p-3 text-white">
      <div>
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
      </div>

      <div>
        <h2 className="text-xl mt-8">My Loans</h2>
        {loans.length === 0 ? (
          <p>You have no pending loans</p>
        ) : (
          <div className="flex p-4 flex-col">
            {loans.map((loan) => (
              <div key={loan._id} className="mb-2 border p-3">
                Amount: <span className="font-semibold">Ksh</span> {loan.amount}{" "}
                - Interest: <span className="font-semibold">Ksh</span>
                {loan.interest} - Total Amount:
                <span className="font-semibold"> Ksh</span> {loan.totalLoan} -
                Status: {loan.status}
                Payment Status: {loan.isPaid ? "Fully Paid" : "In Progress"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
