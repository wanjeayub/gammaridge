import { useEffect, useState } from "react";
import EditLoanForm from "./EditSpecialLoan";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editLoan, setEditLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await fetch("/api/admin/sloans", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/sloans/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchLoans(); // Refresh loans after deletion
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  };

  const handleEdit = (loan) => {
    setIsEditing(true);
    setEditLoan(loan);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">All Loans</h1>
      {loans.length === 0 ? (
        <p>No loans available</p>
      ) : (
        <ul>
          {loans.map((loan) => (
            <li
              key={loan._id}
              className="border p-4 mb-2 flex justify-between items-center"
            >
              <div>
                <span className="font-bold text-blue-800">Name:</span>{" "}
                {loan.fullname}{" "}
                <span className="font-bold text-blue-800">Loan Amount:</span>{" "}
                {loan.principal},
                <span className="font-bold text-blue-800"> Interest:</span>{" "}
                {loan.interest},{" "}
                <span className="font-bold text-blue-800">Total Amount:</span>{" "}
                {loan.totalLoan}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(loan)}
                  className="bg-yellow-500 text-white px-4 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(loan._id)}
                  className="bg-red-500 text-white px-4 py-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isEditing && (
        <EditLoanForm
          loan={editLoan}
          fetchLoans={fetchLoans}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default LoanList;
