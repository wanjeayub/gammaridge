// Backend: Node.js using Express
// Install dependencies: express, mongoose

// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/loanManagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const loanSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  isPaid: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
});

const Loan = mongoose.model("Loan", loanSchema);

// Update loan status
app.put("/api/loans/:id", async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { isPaid: true, status: "approved" },
      { new: true }
    );
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.json(loan);
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// Frontend: Vite + React
// Install dependencies: react, axios, react-router-dom

// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/loans");
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };
    fetchLoans();
  }, []);

  const markAsPaidAndApprove = async (loanId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/loans/${loanId}`
      );
      const updatedLoan = response.data;

      setLoans((prevLoans) =>
        prevLoans.map((loan) => (loan._id === loanId ? updatedLoan : loan))
      );
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan._id}</td>
              <td>{loan.amount}</td>
              <td>{loan.isPaid ? "Paid & Approved" : "Pending"}</td>
              <td>
                {!loan.isPaid && (
                  <button onClick={() => markAsPaidAndApprove(loan._id)}>
                    Mark as Paid & Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
