import { useState, useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";

const Loans = ({ loans, fetchLoans, fetchLoanStats }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isPartialPaymentModalOpen, setIsPartialPaymentModalOpen] =
    useState(false);
  const [isMarkPaidModalOpen, setIsMarkPaidModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState("");
  const [validationError, setValidationError] = useState("");

  // Calculate summary data
  const summaryData = useMemo(() => {
    const totalLoans = loans.length;
    const pendingLoans = loans.filter(
      (loan) => loan.status === "pending"
    ).length;
    const approvedLoans = loans.filter(
      (loan) => loan.status === "approved"
    ).length;
    const fullyPaidLoans = loans.filter(
      (loan) => loan.status === "fully paid"
    ).length;
    const partiallyPaidLoans = loans.filter(
      (loan) => loan.status === "partially paid"
    ).length;
    const totalUsers = new Set(loans.map((loan) => loan.userId?._id)).size; // Unique users
    const totalLoanAmount = loans.reduce(
      (sum, loan) => sum + loan.loanAmount,
      0
    );
    const totalRepaymentAmount = loans.reduce(
      (sum, loan) => sum + loan.totalRepayment,
      0
    );
    const totalPaidAmount = loans.reduce(
      (sum, loan) => sum + loan.paidAmount,
      0
    );
    const totalRemainingBalance = loans.reduce(
      (sum, loan) => sum + loan.remainingBalance,
      0
    );

    return {
      totalLoans,
      pendingLoans,
      approvedLoans,
      fullyPaidLoans,
      partiallyPaidLoans,
      totalUsers,
      totalLoanAmount,
      totalRepaymentAmount,
      totalPaidAmount,
      totalRemainingBalance,
    };
  }, [loans]);

  // Approve a loan
  const approveLoan = useCallback(
    async (loanId) => {
      try {
        const response = await fetch(
          `https://tester-server.vercel.app/api/admin/approve-loan/${loanId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          toast.success("Loan approved successfully.");
          fetchLoans(); // Refresh loans
          fetchLoanStats(); // Refresh loan stats
        } else {
          toast.error("Failed to approve loan.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to approve loan.");
      }
    },
    [fetchLoans, fetchLoanStats]
  );

  // Reject loan offer
  const rejectLoan = useCallback(
    async (loanId) => {
      try {
        const response = await fetch(
          `https://tester-server.vercel.app/api/admin/reject-loan/${loanId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          toast.success("Loan rejected successfully.");
          fetchLoans(); // Refresh loans
          fetchLoanStats(); // Refresh loan stats
        } else {
          toast.error("Failed to reject loan.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to reject loan.");
      }
    },
    [fetchLoans, fetchLoanStats]
  );

  // Extend repayment date
  const extendRepaymentDate = useCallback(
    async (loanId) => {
      try {
        const response = await fetch(
          `https://tester-server.vercel.app/api/admin/extend-repayment/${loanId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          toast.success("Repayment date extended successfully.");
          fetchLoans(); // Refresh loans
        } else {
          toast.error("Failed to extend repayment date.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to extend repayment date.");
      }
    },
    [fetchLoans]
  );

  // Open partial payment modal
  const openPartialPaymentModal = (loan) => {
    setSelectedLoan(loan);
    setIsPartialPaymentModalOpen(true);
  };

  // Close partial payment modal
  const closePartialPaymentModal = () => {
    setIsPartialPaymentModalOpen(false);
    setPartialPaymentAmount("");
    setValidationError("");
  };

  // Handle partial payment
  const handlePartialPayment = useCallback(async () => {
    if (
      !partialPaymentAmount ||
      isNaN(partialPaymentAmount) ||
      partialPaymentAmount <= 0
    ) {
      setValidationError("Please enter a valid amount.");
      return;
    }
    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/admin/partial-payment/${selectedLoan._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: partialPaymentAmount }),
        }
      );
      if (response.ok) {
        toast.success("Partial payment recorded successfully.");
        fetchLoans(); // Refresh loans
        closePartialPaymentModal();
      } else {
        toast.error("Failed to record partial payment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to record partial payment.");
    }
  }, [partialPaymentAmount, selectedLoan, fetchLoans]);

  // Open mark paid modal
  const openMarkPaidModal = (loan) => {
    setSelectedLoan(loan);
    setIsMarkPaidModalOpen(true);
  };

  // Close mark paid modal
  const closeMarkPaidModal = () => {
    setIsMarkPaidModalOpen(false);
  };

  // Mark loan as fully paid
  const markLoanAsPaid = useCallback(async () => {
    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/admin/mark-paid/${selectedLoan._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        toast.success("Loan marked as fully paid.");
        fetchLoans(); // Refresh loans
        closeMarkPaidModal();
      } else {
        toast.error("Failed to mark loan as paid.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark loan as paid.");
    }
  }, [selectedLoan, fetchLoans]);

  // Filter loans by date
  const filterLoansByDate = useCallback((loans, filter) => {
    const now = new Date();
    switch (filter) {
      case "day":
        return loans.filter((loan) => {
          const loanDate = new Date(loan.createdAt);
          return loanDate >= startOfDay(now) && loanDate <= endOfDay(now);
        });
      case "week":
        return loans.filter((loan) => {
          const loanDate = new Date(loan.createdAt);
          return loanDate >= startOfWeek(now) && loanDate <= endOfWeek(now);
        });
      case "month":
        return loans.filter((loan) => {
          const loanDate = new Date(loan.createdAt);
          return loanDate >= startOfMonth(now) && loanDate <= endOfMonth(now);
        });
      default:
        return loans;
    }
  }, []);

  // Filter loans by status
  const filterLoansByStatus = useCallback((loans, status) => {
    if (status === "all") return loans;
    return loans.filter((loan) => loan.status === status);
  }, []);

  // Filter loans by search query
  const filterLoansBySearch = useCallback((loans, query) => {
    return loans.filter(
      (loan) =>
        loan.userId?.fullName?.toLowerCase().includes(query.toLowerCase()) ||
        loan.loanAmount.toString().includes(query) ||
        loan.status.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  // Filter loans by month
  const filterLoansByMonth = useCallback((loans, month) => {
    if (!month) return loans;
    return loans.filter((loan) => {
      const loanDate = new Date(loan.createdAt);
      return format(loanDate, "yyyy-MM") === month;
    });
  }, []);

  // Get unique months from loans
  const getAvailableMonths = useCallback((loans) => {
    const months = new Set();
    loans.forEach((loan) => {
      const loanDate = new Date(loan.createdAt);
      months.add(format(loanDate, "yyyy-MM"));
    });
    return Array.from(months).sort((a, b) => new Date(b) - new Date(a));
  }, []);

  // Apply all filters
  const filteredLoans = useMemo(() => {
    return filterLoansBySearch(
      filterLoansByStatus(
        filterLoansByDate(filterLoansByMonth(loans, selectedMonth), dateFilter),
        statusFilter
      ),
      searchQuery
    );
  }, [
    loans,
    dateFilter,
    statusFilter,
    searchQuery,
    selectedMonth,
    filterLoansByDate,
    filterLoansByStatus,
    filterLoansBySearch,
    filterLoansByMonth,
  ]);

  // Get available months
  const availableMonths = useMemo(
    () => getAvailableMonths(loans),
    [loans, getAvailableMonths]
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Loans</h1>

      {/* Summary Tab */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Loans */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Loans</h3>
          <p className="text-2xl font-bold text-blue-600">
            {summaryData.totalLoans}
          </p>
        </div>

        {/* Pending Loans */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Pending Loans</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {summaryData.pendingLoans}
          </p>
        </div>

        {/* Approved Loans */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Approved Loans
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {summaryData.approvedLoans}
          </p>
        </div>

        {/* Fully Paid Loans */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Fully Paid Loans
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {summaryData.fullyPaidLoans}
          </p>
        </div>

        {/* Partially Paid Loans */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Partially Paid Loans
          </h3>
          <p className="text-2xl font-bold text-orange-600">
            {summaryData.partiallyPaidLoans}
          </p>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {summaryData.totalUsers}
          </p>
        </div>

        {/* Total Loan Amount */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Loan Amount
          </h3>
          <p className="text-2xl font-bold text-red-600">
            Ksh {summaryData.totalLoanAmount.toLocaleString()}
          </p>
        </div>

        {/* Total Repayment Amount */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Repayment
          </h3>
          <p className="text-2xl font-bold text-teal-600">
            Ksh {summaryData.totalRepaymentAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        {/* Month Selection Dropdown */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 border rounded-lg mb-4 mr-4"
        >
          <option value="">All Months</option>
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {format(new Date(month), "MMM yyyy")}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search loans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded-lg"
        />

        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="ml-4 px-3 py-2 border rounded-lg"
        >
          <option value="all">All Time</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="ml-4 px-3 py-2 border rounded-lg"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="partially paid">Partially Paid</option>
          <option value="fully paid">Fully Paid</option>
        </select>
      </div>

      {/* Loan List */}
      <table className="w-full mt-4 text-sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Loan Amount</th>
            <th>Interest</th>
            <th>Total Repayment</th>
            <th>Paid Amount</th>
            <th>Remaining Balance</th>
            <th>Repayment Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.map((loan) => (
            <tr key={loan._id} className="">
              <td>{loan.userId?.fullName}</td>
              <td>Ksh {loan.loanAmount}</td>
              <td>Ksh {loan.interest}</td>
              <td>Ksh {loan.totalRepayment}</td>
              <td>Ksh {loan.paidAmount}</td>
              <td>Ksh {loan.remainingBalance}</td>
              <td>
                {format(new Date(loan.repaymentDate), "dd MMM yyyy")}
              </td>{" "}
              {/* Format the date */}
              <td>{loan.status}</td>
              <td>
                {loan.status === "pending" && (
                  <>
                    <button
                      onClick={() => approveLoan(loan._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectLoan(loan._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Reject
                    </button>
                  </>
                )}

                {(loan.status === "approved" ||
                  loan.status === "partially paid") && (
                  <div className="text-xs">
                    <button
                      onClick={() => openPartialPaymentModal(loan)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Partial Pay
                    </button>
                    <button
                      onClick={() => openMarkPaidModal(loan)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Mark Paid
                    </button>
                    <button
                      onClick={() => extendRepaymentDate(loan._id)}
                      className="bg-purple-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Extend Repayment
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Partial Payment Modal */}
      {isPartialPaymentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Partial Payment</h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={partialPaymentAmount}
              onChange={(e) => setPartialPaymentAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
            />
            {validationError && (
              <p className="text-red-500">{validationError}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={closePartialPaymentModal}
                className="mr-2 bg-gray-300 px-3 py-1 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handlePartialPayment}
                className="bg-green-500 text-white px-3 py-1 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark Paid Modal */}
      {isMarkPaidModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Mark Loan as Paid</h2>
            <p>Are you sure you want to mark this loan as fully paid?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeMarkPaidModal}
                className="mr-2 bg-gray-300 px-3 py-1 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={markLoanAsPaid}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
