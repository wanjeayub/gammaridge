import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ShowSpecialLoans from "../specialLoans/ShowSpecialLoans";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/admin/loans",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setLoans(data);
    };
    fetchLoans();
  }, []);

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
  const handlePayment = async (id, isPaid) => {
    await fetch(`https://gammaridge-server.vercel.app/api/admin/loan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ isPaid }),
    });
    setLoans(
      loans.map((loan) => (loan._id === id ? { ...loan, isPaid } : loan))
    );
  };

  return (
    <section className="max-w-6xl mx-auto text-white">
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
                      <Link to={loan.user.photoURLFront} target="_blank">
                        <img
                          src={loan.user.photoURLFront}
                          alt="id front image"
                          className="w-[200px]"
                        />
                      </Link>
                      <Link to={loan.user.photoURLBack} target="_blank">
                        <img
                          src={loan.user.photoURLBack}
                          alt="id front image"
                          className="w-[200px]"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span>User: {loan.user.name}</span>
                        <span>Amount: {loan.amount}</span>
                        <span>Status: {loan.status}</span>
                        <span>Status: {loan.isPaid}</span>
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
                        <button
                          onClick={() => handlePayment(loan._id, true)}
                          className="bg-green-500 text-white ml-2 p-2"
                        >
                          Paid
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* removed special loans */}
      {/* <div>
        <span className="text-3xl">Special Loans</span>
        <div>
          <ShowSpecialLoans />
        </div>
      </div> */}
    </section>
  );
};

export default AdminDashboard;
