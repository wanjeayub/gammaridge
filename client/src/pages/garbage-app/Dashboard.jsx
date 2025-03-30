import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import paymentService from "../../api/payments";
import Button from "../../components/UI/Button";
import PaymentForm from "../../components/forms/PaymentsForm";
import Modal from "../../components/UI/Modal";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState({
    plot: { plotNumber: "" },
    expectedAmount: 0,
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await paymentService.getPaymentSchedules(
          currentMonth,
          currentYear
        );

        // Debug: Log the response to see its structure
        // console.log("API Response:", response);

        // Handle different response formats
        let schedulesData = [];

        if (Array.isArray(response)) {
          // If response is already an array
          schedulesData = response;
        } else if (response && Array.isArray(response.data)) {
          // If response is an object with a data array (common with Axios)
          schedulesData = response.data;
        } else if (response && response.schedules) {
          // If response has a schedules property
          schedulesData = response.schedules;
        }

        // Filter out any invalid schedules
        const validSchedules = schedulesData.filter((s) => s?.plot?.plotNumber);
        setSchedules(validSchedules);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch payment schedules:", error);
        toast.error("Failed to load payment schedules");
        setLoading(false);
        setSchedules([]); // Set to empty array on error
      }
    };

    fetchSchedules();
  }, [currentMonth, currentYear]);

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 2, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth, 1));
  };

  const handleCarryForward = async () => {
    try {
      const { message } = await paymentService.carryForwardSchedules(
        currentMonth,
        currentYear
      );
      toast.success(message);
      // Refresh the schedules
      const data = await paymentService.getPaymentSchedules(
        currentMonth,
        currentYear
      );
      setSchedules(data.filter((s) => s?.plot?.plotNumber));
    } catch (error) {
      console.error("Failed to carry forward schedules:", error);
      toast.error("Failed to carry forward schedules");
    }
  };

  const handleMarkPaid = (schedule) => {
    if (!schedule?.plot?.plotNumber) {
      toast.error("Invalid plot data");
      return;
    }
    setSelectedSchedule(schedule);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (paidAmount) => {
    try {
      await paymentService.markScheduleAsPaid(selectedSchedule._id, paidAmount);
      toast.success("Payment recorded successfully");
      setShowPaymentModal(false);

      // Refresh the schedules
      const data = await paymentService.getPaymentSchedules(
        currentMonth,
        currentYear
      );
      setSchedules(data.filter((s) => s?.plot?.plotNumber));
    } catch (error) {
      console.error("Failed to record payment:", error);
      toast.error(error.response?.data?.error || "Failed to record payment");
    }
  };
  // Calculate totals
  const totalExpected = schedules.reduce(
    (sum, s) => sum + (s?.expectedAmount || 0),
    0
  );
  const totalPaid = schedules.reduce(
    (sum, s) => sum + (s?.isPaid ? s.paidAmount : 0),
    0
  );
  const totalPending = totalExpected - totalPaid;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={handlePreviousMonth}
            icon={<ArrowLeftIcon className="h-4 w-4" />}
          >
            Previous
          </Button>
          <Button
            variant="success"
            onClick={handleCarryForward}
            icon={<ForwardIcon className="h-4 w-4" />}
          >
            Carry Forward
          </Button>
          <Button
            onClick={handleNextMonth}
            icon={<ArrowRightIcon className="h-4 w-4" />}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Expected
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              Ksh {totalExpected.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Collected
            </div>
            <div className="mt-1 text-3xl font-semibold text-green-600">
              Ksh {totalPaid.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-sm font-medium text-gray-500 truncate">
              Pending
            </div>
            <div className="mt-1 text-3xl font-semibold text-red-600">
              Ksh {totalPending.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Payment schedules table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {loading ? (
          <div className="p-6 text-center">Loading payment schedules...</div>
        ) : schedules.length === 0 ? (
          <div className="p-6 text-center">
            No payment schedules found for this month
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule) => {
                const balance =
                  schedule.expectedAmount - (schedule.paidAmount || 0);
                const isFullyPaid = balance <= 0;

                return (
                  <tr key={schedule._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        Plot #{schedule.plot.plotNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {schedule.plot.ownerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Ksh {schedule.expectedAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Ksh {(schedule.paidAmount || 0).toFixed(2)}
                      {schedule.payments?.length > 0 && (
                        <div className="text-xs text-gray-400">
                          {schedule.payments.length} payment(s)
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span
                        className={
                          balance > 0 ? "text-red-600" : "text-green-600"
                        }
                      >
                        Ksh {Math.max(balance, 0).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isFullyPaid
                            ? "bg-green-100 text-green-800"
                            : schedule.paidAmount > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isFullyPaid
                          ? "Paid"
                          : schedule.paidAmount > 0
                          ? "Partial"
                          : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {!isFullyPaid && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleMarkPaid(schedule)}
                        >
                          {schedule.paidAmount > 0 ? "Add Payment" : "Pay"}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Payment modal */}
      {/* Payment modal - updated to show current balance */}
      {showPaymentModal && (
        <Modal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          title={`Payment for Plot #${selectedSchedule.plot.plotNumber}`}
        >
          <PaymentForm
            expectedAmount={selectedSchedule.expectedAmount}
            currentBalance={
              selectedSchedule.expectedAmount -
              (selectedSchedule.paidAmount || 0)
            }
            onSubmit={handlePaymentSubmit}
            onCancel={() => setShowPaymentModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
