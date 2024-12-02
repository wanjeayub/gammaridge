import { useState, useEffect } from "react";

import React, { useState, useEffect } from "react";
import axios from "axios";

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

// const UserDashboard = () => {
//   const [loans, setLoans] = useState([]);
//   const [loanData, setLoanData] = useState({ amount: "", duration: "" });

//   useEffect(() => {
//     const fetchLoans = async () => {
//       const response = await fetch(
//         "https://gammaridge-server.vercel.app/api/users/loans",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//       setLoans(data);
//     };
//     fetchLoans();
//   }, []);

//   const paidLoans = loans.filter((loan) => loan.isPaid);
//   const pendingLoans = loans.filter((loan) => loan.status === "pending");

//   const handleChange = (e) => {
//     setLoanData({ ...loanData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch(
//       "https://gammaridge-server.vercel.app/api/users/loan",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(loanData),
//       }
//     );
//     const data = await response.json();

//     // Inform the user about the unpaid loan
//     if (!response.ok) {
//       alert(data.message);
//       setLoanData({
//         amount: "",
//       });
//       return;
//     }
//     setLoans([...loans, data]);
//     setLoanData({
//       amount: "",
//     });
//   };

//   return (
//     <div className="container mx-auto p-3 text-white">
//       <div>
//         <h1 className="text-2xl font-bold">User Dashboard</h1>

//         <div className="flex flex-col gap-4">
//           <h2 className="text-xl">Apply for a new loan</h2>
//           <form onSubmit={handleSubmit} className="max-w-md gap-3 flex">
//             <input
//               name="amount"
//               value={loanData.amount}
//               onChange={handleChange}
//               placeholder="Amount"
//               required
//               className="border p-2 w-full bg-gray-600 text-white"
//             />

//             <button
//               type="submit"
//               className="bg-[#b9283b] text-white py-2 px-4 w-full"
//             >
//               Apply
//             </button>
//           </form>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl mt-8">My Loans</h2>
//         {loans.length === 0 ? (
//           <p>You have no pending loans</p>
//         ) : (
//           <div className="flex p-4 flex-col">
//             {loans.map((loan) => (
//               <div key={loan._id} className="mb-2 border p-3">
//                 Amount: <span className="font-semibold">Ksh</span> {loan.amount}{" "}
//                 - Interest: <span className="font-semibold">Ksh</span>
//                 {loan.interest} - Total Amount:
//                 <span className="font-semibold"> Ksh</span> {loan.totalLoan} -
//                 Status: {loan.status}
//                 Payment Status: {loan.isPaid ? "Fully Paid" : "In Progress"}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

// can i add some notes here?
// https://gammaridge-server.vercel.app/api/users/loans
