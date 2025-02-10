import { useState, useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

// Pagination Constants
const ITEMS_PER_PAGE = 10;

const Loans = ({ loans, fetchLoans, fetchLoanStats }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // New state for status filter
  const [isPartialPaymentModalOpen, setIsPartialPaymentModalOpen] =
    useState(false);
  const [isMarkPaidModalOpen, setIsMarkPaidModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState("");
  const [validationError, setValidationError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Apply all filters
  const filteredLoans = useMemo(() => {
    return filterLoansBySearch(
      filterLoansByStatus(filterLoansByDate(loans, dateFilter), statusFilter),
      searchQuery
    );
  }, [
    loans,
    dateFilter,
    statusFilter,
    searchQuery,
    filterLoansByDate,
    filterLoansByStatus,
    filterLoansBySearch,
  ]);

  // Paginate loans
  const totalPages = Math.ceil(filteredLoans.length / ITEMS_PER_PAGE);
  const paginatedLoans = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredLoans.slice(startIndex, endIndex);
  }, [filteredLoans, currentPage]);

  // Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>All Loans</h1>

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

      {/* Loan List */}
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>User</th>
            <th>Loan Amount</th>
            <th>Interest</th>
            <th>Total Repayment</th>
            <th>Paid Amount</th>
            <th>Remaining Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLoans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan.userId?.fullName}</td>
              <td>Ksh {loan.loanAmount}</td>
              <td>Ksh {loan.interest}</td>
              <td>Ksh {loan.totalRepayment}</td>
              <td>Ksh {loan.paidAmount}</td>
              <td>Ksh {loan.remainingBalance}</td>
              <td>{loan.status}</td>
              <td>
                {loan.status === "pending" && (
                  <button
                    onClick={() => approveLoan(loan._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                  >
                    Approve
                  </button>
                )}
                {(loan.status === "approved" ||
                  loan.status === "partially paid") && (
                  <>
                    <button
                      onClick={() => openPartialPaymentModal(loan)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Partial Pay
                    </button>
                    <button
                      onClick={() => openMarkPaidModal(loan)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                    >
                      Mark Paid
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded-lg ${
              page === currentPage ? "bg-gray-200" : "bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

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
