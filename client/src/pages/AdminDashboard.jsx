import { useState, useEffect } from "react";
import ShowSpecialLoans from "../specialLoans/ShowSpecialLoans";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch("/api/admin/loans", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setLoans(data);
    };
    fetchLoans();
  }, []);

  const handleApproval = async (id, status) => {
    await fetch(`/api/admin/loan/${id}`, {
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

  return (
    <section className="container mx-auto">
      <div>
        <span className="text-3xl">Admin Dashboard</span>
      </div>
      <div>
        <span className="text-3xl">Normal Loans</span>
        <div>
          <div>
            {loans.length === 0 ? (
              <p>No loans found</p>
            ) : (
              <ul className="flex gap-4 flex-col">
                {loans.map((loan) => (
                  <li key={loan._id}>
                    User: {loan.user.name} - Amount: {loan.amount} - Duration:{" "}
                    {loan.duration} months - Status: {loan.status}
                    <button
                      onClick={() => handleApproval(loan._id, "approved")}
                      className="bg-green-500 text-white ml-4 p-3"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(loan._id, "rejected")}
                      className="bg-red-500 text-white ml-2"
                    >
                      Reject
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div>
        <span className="text-3xl">Special Loans</span>
        <div>
          <ShowSpecialLoans />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
