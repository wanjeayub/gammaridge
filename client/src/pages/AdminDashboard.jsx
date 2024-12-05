import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import dayjs from "dayjs";
import ReactPaginate from "react-paginate";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale
);

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeMonth, setActiveMonth] = useState(dayjs().format("YYYY-MM"));
  const [statusMessage, setStatusMessage] = useState("");
  const [perPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalImage, setModalImage] = useState(""); // Image URL for modal

  // Fetch loans on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setStatusMessage("User not authenticated. Please log in.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const loansResponse = await axios.get(
          "https://gammaridge-server.vercel.app/api/admin/loans",
          { headers }
        );

        setLoans(loansResponse.data);
        setStatusMessage("Loans fetched successfully.");
      } catch (err) {
        setStatusMessage("Error fetching data. Please try again later.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-red-500 font-bold text-lg"
              onClick={closeModal}
            >
              X
            </button>
            <img
              src={modalImage}
              alt="Loan Document"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}

      {/* Side Menu */}
      <aside className="w-64 bg-gray-900 text-white h-full flex-shrink-0">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-500">Admin Dashboard</h1>
        </div>
        <nav className="mt-10 space-y-4">
          <button
            onClick={() => setActiveSection("overview")}
            className={`block w-full text-left px-6 py-3 ${
              activeSection === "overview" ? "bg-gray-800" : "hover:bg-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("loans")}
            className={`block w-full text-left px-6 py-3 ${
              activeSection === "loans" ? "bg-gray-800" : "hover:bg-gray-700"
            }`}
          >
            Loans
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div>{statusMessage && <div>{statusMessage}</div>}</div>

        {/* Loans Section */}
        {activeSection === "loans" && (
          <section>
            <div className="flex justify-between mb-6">
              <input
                type="text"
                placeholder="Search by user or loan ID..."
                className="p-3 border rounded w-1/3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="p-3 border rounded"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* Loans List */}
            <div className="overflow-auto">
              {loans.map((loan) => (
                <div
                  key={loan._id}
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <img
                    src={loan.user.photoURLFront}
                    alt="ID Front"
                    className="w-full h-40 object-cover mb-4 rounded cursor-pointer"
                    onClick={() => openModal(loan.user.photoURLFront)}
                  />
                  <h3 className="text-lg font-semibold">Loan ID: {loan._id}</h3>
                  <p>User: {loan.user.name}</p>
                  <p>Full Loan: {loan.totalAmount}</p>
                  <p>Mobile Number 1: {loan.user.mobile}</p>
                  <p>Mobile Number 2: {loan.user.alternatemobile}</p>
                  <p>Status: {loan.status}</p>
                  {loan.status === "approved" && !loan.isPaid && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                      onClick={() => console.log("Mark as paid")}
                    >
                      Mark as Paid
                    </button>
                  )}
                  {loan.isPaid && (
                    <span className="text-green-500 mt-2 block">Paid</span>
                  )}
                </div>
              ))}
            </div>

            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(loans.length / perPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(data) => setPageNumber(data.selected)}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
