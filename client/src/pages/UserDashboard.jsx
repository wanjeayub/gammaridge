import { useState, useEffect } from "react";
import axios from "axios";
import "./userdashboard.css";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/user", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch(() => (window.location.href = "/login")); // Redirect if not authenticated

    axios
      .get("https://gammaridge-server.vercel.app/api/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLoans(res.data));
  }, []);

  const applyForLoan = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://gammaridge-server.vercel.app/api/users/loans",
        { amount: loanAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setModalOpen(false);
        setLoanAmount("");
      });
  };

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center">
        <h1>
          Hello {user?.firstName} {user?.lastName}
        </h1>
        <button
          onClick={() => localStorage.clear() && (window.location.href = "/")}
          className="btn btn-danger"
        >
          Logout
        </button>
      </header>

      <section>
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
            <div key={loan._id}>
              <p>Amount: {loan.totalLoan}</p>
              <p>Status: {loan.status}</p>
              <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </section>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Apply for Loan</h3>
            <input
              type="number"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <button onClick={applyForLoan} className="btn btn-success">
              Submit Loan
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
