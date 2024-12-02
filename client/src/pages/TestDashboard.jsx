import { useState, useEffect } from "react";

import axios from "axios";

const TestDashboard = () => {
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://gammaridge-server.vercel.app/api/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => (window.location.href = "/login")); // Redirect if not authenticated

    axios
      .get("https://gammaridge-server.vercel.app/api/users/loans", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLoans(res.data));
  }, []);

  // pending loans
  const pendingLoans = loans.filter((loan) => loan.status === "pending");

  //   const applyForLoan = () => {
  //     const token = localStorage.getItem("token");
  //     axios
  //       .post(
  //         "https://gammaridge-server.vercel.app/api/users/loans",
  //         { amount: loanAmount },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       )
  //       .then(() => {
  //         setModalOpen(false);
  //         setLoanAmount("");
  //       });
  //   };

  const handleSubmit = async () => {
    e.preventDefault();
    const response = await fetch(
      "https://gammaridge-server.vercel.app/api/users/loan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(loanAmount),
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
    setLoanAmount({
      amount: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center text-white p-3">
        <h1 className="text-3xl ">
          Hello <span className="text-[#b9283b] capitalize">{user?.name}</span>
        </h1>

        <button
          onClick={() => localStorage.clear() && (window.location.href = "/")}
          className="text-[#b9283b] bg-zinc-700 px-2 py-1 rounded-md hover:opacity-80 shadow-md"
        >
          Logout
        </button>
      </header>

      <section className="p-3">
        <h2>Loans</h2>
        {loans.length === 0 || loans.some((loan) => loan.status === "paid") ? (
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary"
          >
            Apply for Loan
          </button>
        ) : (
          loans.map((loan) => (
            <div key={loan._id} className="flex mt-3">
              <div className="bg-[#3d3d3d] flex flex-row p-2">
                <p>Amount: {loan.amount}</p>
                <p>Status: {loan.status}</p>
                <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </section>
      <section className="p-3">
        {pendingLoans.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p>No pending Loans...</p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#b9283b] text-white px-2 py-1 hover:opacity-70 max-w-[100px]"
            >
              Apply Loan
            </button>
          </div>
        ) : (
          pendingLoans.map((loan) => (
            <div key={loan._id}>
              <p>Loan amount: {loan.totalAmount}</p>
            </div>
          ))
        )}
      </section>

      {modalOpen && (
        <div className="flex flex-col gap-3 p-3">
          <div className="flex flex-col max-w-[200px] gap-2">
            <h3 className="text-2xl text-white">Apply for Loan</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white"
              >
                Submit Loan
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDashboard;
