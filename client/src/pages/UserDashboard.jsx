import { useState, useEffect } from "react";
import EditUserProfile from "./EditUserProfile";

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [user, setUser] = useState("");
  const [id, setId] = useState(null);
  const [newLoanData, setNewLoanData] = useState({ amount: "" });

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
      setLoans(data);
    };

    const fetchUser = async () => {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/users/user",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setUser(data);
    };

    fetchLoans();
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setNewLoanData({ ...newLoanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://gammaridge-server.vercel.app/api/users/loans/apply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newLoanData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setLoans([...loans, data]);
      setNewLoanData({ amount: "" });
    } else {
      alert(data.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const LoanCard = ({ loan }) => (
    <div className="border rounded-lg p-4 bg-gray-100">
      <p className="text-sm text-gray-700">
        <span className="font-medium">Amount:</span> Ksh {loan.amount}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Interest:</span> Ksh {loan.interest}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Total:</span> Ksh {loan.totalLoan}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Status:</span> {loan.status}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Due:</span> {formatDate(loan.dueDate)}
      </p>
    </div>
  );

  return (
    <div className="container mx-auto p-4 text-gray-900">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p className="text-lg text-gray-600">
          Welcome back, <span className="font-medium">{user?.name}</span>!
        </p>
      </header>
      <main>
        {editingProfile ? (
          <EditUserProfile
            user={user}
            onSave={() => setEditingProfile(false)}
          />
        ) : (
          <section>
            <h2 className="text-xl font-bold mb-4">My Loans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loans.map((loan) => (
                <LoanCard key={loan._id} loan={loan} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
