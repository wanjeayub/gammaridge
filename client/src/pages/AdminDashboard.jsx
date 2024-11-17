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
  const handlePay = async (id, isPaid) => {
    await fetch(`https://gammaridge-server.vercel.app/api/admin/loan/repay/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ isPaid }),
    });
    setLoans(
      loans.map((loan) => (loan._id === id ? { ...loan, isPaid:true } : loan))
    );
  };

  const approvedLoans = loans.filter((loan)=>{loan.amount > 1000})
  console.log(loans)
  const rejectedLoans = loans.filter((loan)=>{loan.status === "rejected"})
  const pendingLoans = loans.filter((loan)=>{loan.status === "pending"})

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
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span>User: {loan.user.name}</span>
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
                          <button className="bg-[#b9283b] p-2 ml-2 text-white" onClick={() => handlePay(loan._id)}>
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
      <div>
        <div className="flex flex-col gap-4">
          <span className="text-3xl">Sorted Loans</span>
        <div>
          <span>Approved Loans</span>
        <div>
          {approvedLoans.length === 0 ? (<div><p>No Approved Loans</p></div>):(<div>{approvedLoans.map((loan)=>(<div key={loan._id}><div className="flex flex-row">
            <span>User: {loan.user.name}</span>
            </div></div>))}</div>)}
        </div>
        </div>
        <div>
          <span>Rejected Loans</span>
        <div>
          {approvedLoans.length === 0 ? (<div><p>No Rejected Loans</p></div>):(<div>{rejectedLoans.map((loan)=>(<div key={loan._id}><div className="flex flex-row">
            <span>User: {loan.user.name}</span>
            </div></div>))}</div>)}
        </div>
        </div>
        <div>
          <span>Pending Loans</span>
        <div>
          {approvedLoans.length === 0 ? (<div><p>No Pending Loans</p></div>):(<div>{pendingLoans.map((loan)=>(<div key={loan._id}><div className="flex flex-row">
            <span>User: {loan.user.name}</span>
            </div></div>))}</div>)}
        </div>
        </div>
        
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
