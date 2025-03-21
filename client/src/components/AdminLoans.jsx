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
import { FaCheck, FaTimes, FaEdit, FaCalendarAlt, FaTag } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Loans = ({ loans, fetchLoans, fetchLoanStats }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isPartialPaymentModalOpen, setIsPartialPaymentModalOpen] =
    useState(false);
  const [isMarkPaidModalOpen, setIsMarkPaidModalOpen] = useState(false);
  const [isAssignCategoryModalOpen, setIsAssignCategoryModalOpen] =
    useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [validationError, setValidationError] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);

  // Group loans by category and status
  const groupLoans = (loans) => {
    const grouped = {
      permanent: {
        pending: [],
        approved: [],
        partiallyPaid: [], // Matches "partially paid" from backend
        fullyPaid: [], // Matches "fully paid" from backend
      },
      casual: {
        pending: [],
        approved: [],
        partiallyPaid: [], // Matches "partially paid" from backend
        fullyPaid: [], // Matches "fully paid" from backend
      },
    };

    loans.forEach((loan) => {
      const category = loan.category === "permanent" ? "permanent" : "casual";
      let status = loan.status.toLowerCase(); // Normalize to lowercase

      // Map backend statuses to frontend keys
      if (status === "partially paid") {
        status = "partiallyPaid";
      } else if (status === "fully paid") {
        status = "fullyPaid";
      }

      if (grouped[category][status]) {
        grouped[category][status].push(loan);
      }
    });

    return grouped;
  };

  // Toggle collapsible sections
  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

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

  // Filter loans by category
  const filterLoansByCategory = useCallback((loans, category) => {
    if (category === "all") return loans;
    return loans.filter((loan) => loan.category === category);
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
  const getAvailableMonths = (loans) => {
    const months = new Set();
    loans.forEach((loan) => {
      const loanDate = new Date(loan.createdAt);
      months.add(format(loanDate, "yyyy-MM"));
    });
    return Array.from(months).sort((a, b) => new Date(b) - new Date(a));
  };

  // Apply all filters
  const filteredLoans = useMemo(() => {
    return filterLoansBySearch(
      filterLoansByStatus(
        filterLoansByDate(
          filterLoansByMonth(
            filterLoansByCategory(loans, categoryFilter),
            selectedMonth
          ),
          dateFilter
        ),
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
    categoryFilter,
    filterLoansByDate,
    filterLoansByStatus,
    filterLoansBySearch,
    filterLoansByMonth,
    filterLoansByCategory,
  ]);

  // Group filtered loans
  const groupedLoans = groupLoans(filteredLoans);

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

  // Reject a loan
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

  // Open assign category modal
  const openAssignCategoryModal = (loan) => {
    setSelectedLoan(loan);
    setIsAssignCategoryModalOpen(true);
  };

  // Close assign category modal
  const closeAssignCategoryModal = () => {
    setIsAssignCategoryModalOpen(false);
    setSelectedCategory("");
  };

  // Assign category to loan
  const assignCategory = useCallback(async () => {
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/admin/assign-category/${selectedLoan._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: selectedCategory }),
        }
      );

      if (response.ok) {
        toast.success("Category assigned successfully.");
        fetchLoans(); // Refresh loans
        closeAssignCategoryModal();
      } else {
        toast.error("Failed to assign category.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign category.");
    }
  }, [selectedCategory, selectedLoan, fetchLoans]);

  // Render collapsible tables for each category and status
  const renderCategoryTable = (category, loansByStatus) => {
    return (
      <div key={category} className="mb-8">
        <h2 className="text-xl font-bold mb-4 capitalize">{category} Loans</h2>
        {Object.entries(loansByStatus).map(([status, loans]) => {
          const sectionId = `${category}-${status}`;
          const isExpanded = expandedSection === sectionId;

          return (
            <div key={status} className="mb-4">
              <div
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg cursor-pointer"
                onClick={() => toggleSection(sectionId)}
              >
                <h3 className="font-semibold capitalize">{status}</h3>
                <span>{isExpanded ? "▲" : "▼"}</span>
              </div>
              {isExpanded && (
                <table className="w-full striped-table sticky-header text-sm mt-2">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left">User</th>
                      <th className="px-4 py-3 text-left">Loan Amount</th>
                      <th className="px-4 py-3 text-left">Interest</th>
                      <th className="px-4 py-3 text-left">Total Repayment</th>
                      <th className="px-4 py-3 text-left">Paid Amount</th>
                      <th className="px-4 py-3 text-left">Remaining Balance</th>
                      <th className="px-4 py-3 text-left">Repayment Date</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => (
                      <tr
                        key={loan._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">{loan.userId?.fullName}</td>
                        <td className="px-4 py-3">Ksh {loan.loanAmount}</td>
                        <td className="px-4 py-3">Ksh {loan.interest}</td>
                        <td className="px-4 py-3">Ksh {loan.totalRepayment}</td>
                        <td className="px-4 py-3">Ksh {loan.paidAmount}</td>
                        <td className="px-4 py-3">
                          Ksh {loan.remainingBalance}
                        </td>
                        <td className="px-4 py-3">
                          {format(new Date(loan.repaymentDate), "dd MMM yyyy")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            {loan.status === "pending" && (
                              <>
                                <button
                                  data-tooltip-id="approve-tooltip"
                                  data-tooltip-content="Approve this loan"
                                  onClick={() => approveLoan(loan._id)}
                                  className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center"
                                >
                                  <FaCheck className="mr-2" /> Approve
                                </button>
                                <button
                                  data-tooltip-id="reject-tooltip"
                                  data-tooltip-content="Reject this loan"
                                  onClick={() => rejectLoan(loan._id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center"
                                >
                                  <FaTimes className="mr-2" /> Reject
                                </button>
                              </>
                            )}
                            {(loan.status === "approved" ||
                              loan.status === "partially paid") && (
                              <>
                                <button
                                  data-tooltip-id="partial-pay-tooltip"
                                  data-tooltip-content="Record partial payment"
                                  onClick={() => openPartialPaymentModal(loan)}
                                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center"
                                >
                                  <FaEdit className="mr-2" /> Partial Pay
                                </button>
                                <button
                                  data-tooltip-id="mark-paid-tooltip"
                                  data-tooltip-content="Mark as fully paid"
                                  onClick={() => openMarkPaidModal(loan)}
                                  className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center"
                                >
                                  <FaCheck className="mr-2" /> Mark Paid
                                </button>
                                {loan.extensionCount < 3 && (
                                  <button
                                    data-tooltip-id="extend-tooltip"
                                    data-tooltip-content="Extend repayment date"
                                    onClick={() =>
                                      extendRepaymentDate(loan._id)
                                    }
                                    className="bg-purple-500 text-white px-3 py-1 rounded-lg flex items-center"
                                  >
                                    <FaCalendarAlt className="mr-2" /> Extend
                                  </button>
                                )}
                                <button
                                  data-tooltip-id="assign-category-tooltip"
                                  data-tooltip-content="Assign category"
                                  onClick={() => openAssignCategoryModal(loan)}
                                  className="bg-indigo-500 text-white px-3 py-1 rounded-lg flex items-center"
                                >
                                  <FaTag className="mr-2" /> Assign
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Loans</h1>

      {/* Filters and Search */}
      <div className="mb-8">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 border rounded-lg mb-4 mr-4"
        >
          <option value="">All Months</option>
          {getAvailableMonths(loans).map((month) => (
            <option key={month} value={month}>
              {format(new Date(month), "MMM yyyy")}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search loans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded-lg"
        />

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

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="ml-4 px-3 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="permanent">Permanent</option>
          <option value="casual">Casual</option>
        </select>
      </div>

      {/* Collapsible Tables */}
      {Object.entries(groupedLoans).map(([category, loansByStatus]) =>
        renderCategoryTable(category, loansByStatus)
      )}

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

      {/* Assign Category Modal */}
      {isAssignCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Assign Category</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
            >
              <option value="">Select Category</option>
              <option value="permanent">Permanent</option>
              <option value="casual">Casual</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={closeAssignCategoryModal}
                className="mr-2 bg-gray-300 px-3 py-1 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={assignCategory}
                className="bg-indigo-500 text-white px-3 py-1 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tooltips */}
      <Tooltip id="approve-tooltip" />
      <Tooltip id="reject-tooltip" />
      <Tooltip id="partial-pay-tooltip" />
      <Tooltip id="mark-paid-tooltip" />
      <Tooltip id="extend-tooltip" />
      <Tooltip id="assign-category-tooltip" />
    </div>
  );
};

export default Loans;
