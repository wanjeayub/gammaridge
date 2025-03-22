import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const Loans = ({ darkMode }) => {
  const [loans, setLoans] = useState([]);
  const [loanAmount, setLoanAmount] = useState("");
  const [repaymentDate, setRepaymentDate] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasActiveLoan, setHasActiveLoan] = useState(false);
  const [editingLoanId, setEditingLoanId] = useState(null);
  const navigate = useNavigate();

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Fetch loans on component mount
  useEffect(() => {
    fetchLoans();
  }, []);

  // Fetch all loans
  const fetchLoans = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://tester-server.vercel.app/api/loans/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("You are not authorized. Please log in.");
          navigate("/login");
        } else if (response.status === 404) {
          toast.error("Resource not found.");
        } else {
          throw new Error("Failed to fetch loans.");
        }
        return;
      }

      const data = await response.json();
      setLoans(data);

      // Check if the user has any active loans (not fully paid)
      const activeLoan = data.find((loan) => loan.status !== "fully paid");
      setHasActiveLoan(!!activeLoan);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Loan Amount Validation
    if (!loanAmount || isNaN(loanAmount) || loanAmount <= 0) {
      newErrors.loanAmount = "Please enter a valid loan amount.";
    } else if (loanAmount > 1000000) {
      newErrors.loanAmount = "Loan amount cannot exceed Ksh 1,000,000.";
    }

    // Repayment Date Validation
    const repaymentDateObj = new Date(repaymentDate);
    if (isNaN(repaymentDateObj.getTime())) {
      newErrors.repaymentDate = "Please select a valid date.";
    } else if (repaymentDateObj < new Date()) {
      newErrors.repaymentDate = "Please select a valid future date.";
    } else if (
      repaymentDateObj >
      new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    ) {
      newErrors.repaymentDate =
        "Repayment date cannot be more than 1 year in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle applying for a new loan
  const handleApplyLoan = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    if (hasActiveLoan) {
      toast.error(
        "You already have an active loan. Please repay it before applying for a new one."
      );
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://tester-server.vercel.app/api/loans/apply",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loanAmount, repaymentDate }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to apply for loan.");
      }

      const data = await response.json();
      toast.success("Loan application submitted successfully!");
      fetchLoans();
      setLoanAmount("");
      setRepaymentDate("");
      setHasActiveLoan(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  // Handle editing an existing loan
  const handleEditLoan = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    if (!editingLoanId) {
      toast.error("No loan selected for editing.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/loans/update/${editingLoanId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loanAmount, repaymentDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update loan.");
      }

      const data = await response.json();
      toast.success("Loan updated successfully!");
      fetchLoans();
      setLoanAmount("");
      setRepaymentDate("");
      setEditingLoanId(null);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle deleting a loan
  const handleDeleteLoan = async (loanId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/loans/delete/${loanId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete loan.");
      }

      toast.success("Loan deleted successfully!");
      fetchLoans();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle clicking the Edit button
  const handleEditClick = (loan) => {
    if (loan.status !== "pending" && loan.status !== "rejected") {
      toast.error("Only pending or rejected loans can be edited.");
      return;
    }
    setLoanAmount(loan.loanAmount);
    setRepaymentDate(new Date(loan.repaymentDate).toISOString().split("T")[0]);
    setEditingLoanId(loan._id);
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setLoanAmount("");
    setRepaymentDate("");
    setEditingLoanId(null);
  };

  // Handle navigating back to the dashboard
  const handleBackToDashboard = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  // Get status color based on loan status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-red-500";
      case "approved":
        return "text-orange-500";
      case "fully paid":
        return "text-green-500";
      case "rejected":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Loans Dashboard</h1>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={handleBackToDashboard}
          className={`${
            darkMode ? "bg-gray-700" : "bg-gray-700"
          } text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all mb-6`}
        >
          Back to Dashboard
        </button>

        {/* Loan Application Form */}
        <form
          onSubmit={editingLoanId ? handleEditLoan : handleApplyLoan}
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="loanAmount"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Loan Amount
              </label>
              <input
                id="loanAmount"
                type="number"
                placeholder="Loan Amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                aria-describedby="loanAmountError"
                disabled={isLoading || (hasActiveLoan && !editingLoanId)}
              />
              {errors.loanAmount && (
                <p id="loanAmountError" className="text-red-500 text-sm mt-1">
                  {errors.loanAmount}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="repaymentDate"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Repayment Date
              </label>
              <input
                id="repaymentDate"
                type="date"
                placeholder="Repayment Date"
                value={repaymentDate}
                onChange={(e) => setRepaymentDate(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                aria-describedby="repaymentDateError"
                disabled={isLoading || (hasActiveLoan && !editingLoanId)}
              />
              {errors.repaymentDate && (
                <p
                  id="repaymentDateError"
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.repaymentDate}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`mt-4 ${
              darkMode ? "bg-blue-600" : "bg-blue-600"
            } text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400`}
            disabled={isLoading || (hasActiveLoan && !editingLoanId)}
          >
            {editingLoanId ? "Update Loan" : "Apply for Loan"}
          </button>
          {editingLoanId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all ml-4"
            >
              Cancel Edit
            </button>
          )}
          {hasActiveLoan && (
            <p className="text-red-500 text-sm mt-2">
              You already have an active loan. Please repay it before applying
              for a new one.
            </p>
          )}
        </form>

        {/* Loan Summary */}
        <div
          className={`mt-6 p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Loan Summary</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <ImSpinner8 className="animate-spin text-4xl text-blue-600" />
            </div>
          ) : loans.length === 0 ? (
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              No loans found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loans.map((loan) => (
                <div
                  key={loan._id}
                  className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-all ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <FaMoneyCheckAlt className="text-2xl text-blue-600" />
                    <h3
                      className={`text-xl font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Loan Details
                    </h3>
                  </div>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span className="font-medium">Amount:</span> Ksh{" "}
                    {loan.loanAmount}
                  </p>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span className="font-medium">Total Repayment:</span> Ksh{" "}
                    {loan.totalRepayment}
                  </p>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span className="font-medium">Interest:</span> Ksh{" "}
                    {loan.interest}
                  </p>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span className="font-medium">Due Date:</span>{" "}
                    {formatDate(loan.repaymentDate)}
                  </p>
                  <p
                    className={`mt-2 font-semibold ${getStatusColor(
                      loan.status
                    )}`}
                  >
                    Status: {loan.status}
                  </p>
                  {(loan.status === "pending" ||
                    loan.status === "rejected") && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEditClick(loan)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLoan(loan._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loans;
