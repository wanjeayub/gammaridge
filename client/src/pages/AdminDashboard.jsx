import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ShowSpecialLoans from "../specialLoans/ShowSpecialLoans";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingLoans, setPendingLoans] = useState([]);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [rejectedLoans, setRejectedLoans] = useState([]);
  const [paidLoans, setPaidLoans] = useState([]);

  useEffect(() => {
    axios
      .get("https://gammaridge-server.vercel.app/api/admin/loans")
      .then((response) => setLoans(response.data))
      .catch((error) => console.error("Error fetching loans:", error));

    // Fetch users
    axios
      .get("https://gammaridge-server.vercel.app/api/admin/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    //   const fetchLoans = async () => {
    //     const response = await fetch(
    //       "https://gammaridge-server.vercel.app/api/admin/loans",
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     );
    //     const data = await response.json();
    //     setLoans(data);
    //   };
    //  const fetchUserData = async () => {
    //    const response = await fetch(
    //      "https://gammaridge-server.vercel.app/api/admin/users",
    //      {
    //        method: "GET",
    //        headers: {
    //          Authorization: `Bearer ${localStorage.getItem("token")}`,
    //        },
    //      }
    //    );
    //    const userData = response.json();
    //    setUsers(userData);
    //  };
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
                      <Link to={loan.user.photoURLFront} target="_blank">
                        <img
                          src={loan.user.photoURLFront}
                          alt="id front image"
                          className="w-[200px]"
                        />
                      </Link>
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
        <div>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <div>
              {users.map((user) => (
                <div key={user._id}>
                  <div>
                    <span>My Name: {user.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
