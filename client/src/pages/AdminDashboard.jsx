import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import ShowSpecialLoans from "../specialLoans/ShowSpecialLoans";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated. Please log in.");
          return;
        }

        // Set the headers for the requests
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch loans and users in parallel
        const [loansResponse, pendingLoansResponse, usersResponse] =
          await Promise.all([
            axios.get("https://gammaridge-server.vercel.app/api/admin/loans", {
              headers,
            }),
          ]);

        // Update state with the fetched data
        setLoans(loansResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const pendingLoans = loans.filter((loan) => loan.status === "pending");

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
  const handlePay = async (id, isPaid) => {
    await fetch(
      `https://gammaridge-server.vercel.app/api/admin/loan/repay/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isPaid }),
      }
    );
    setLoans(
      loans.map((loan) => (loan._id === id ? { ...loan, isPaid: true } : loan))
    );
  };

  return (
    <section className="max-w-6xl mx-auto text-white">
      <div>
        <Link to={"/admin/edit"}>
          <span>edit admin details</span>
        </Link>
      </div>
      <div>
        <span className="text-3xl">Admin Dashboard</span>
      </div>
      <div>
        <span className="text-3xl font-semibold">Normal Loans</span>
        <div>
          <div>
            {loans.length === 0 ? (
              <p>No loans found</p>
            ) : (
              <div className="flex gap-4 flex-col">
                {loans.map((loan) => (
                  <div key={loan._id}>
                    <div className="flex flex-row gap-3">
                      {/* <Link to={loan.user.photoURLFront} target="_blank">
                        <img
                          src={loan.user.photoURLFront}
                          alt="id front image"
                          className="w-[200px]"
                        />
                      </Link> */}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span>User: {loan.user.name}</span>
                        <span>Mobile: {loan.user.mobile}</span>
                        <span>
                          Alternate Mobile: {loan.user.alternatemobile}
                        </span>
                        <span>Amount: {loan.amount}</span>
                        <span>Status: {loan.status}</span>
                        <span>
                          Payment Status: {loan.isPaid ? "Paid" : "In Progress"}
                        </span>
                      </div>
                      <div className="flex flex-row gap-3">
                        <button
                          onClick={() => handleApproval(loan._id, "approved")}
                          className="bg-green-500 text-white ml-4 p-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproval(loan._id, "rejected")}
                          className="bg-red-500 text-white ml-2 p-2"
                        >
                          Reject
                        </button>
                        <div>
                          {/* <input type="text" placeholder="Enter amount paid" /> */}
                          <button
                            className="bg-[#b9283b] p-2 ml-2 text-white"
                            onClick={() => handlePay(loan._id)}
                          >
                            Pay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
