const express = require("express");
const router = express.Router();
const Loan = require("../models/Loan.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Example backend route for applying for a loan
router.post("/apply", authMiddleware, async (req, res) => {
  const { loanAmount, repaymentDate } = req.body;
  const userId = req.user.id;

  try {
    // Check if the user has any active loans (not fully paid)
    const activeLoan = await Loan.findOne({
      userId,
      status: { $ne: "fully paid" }, // Find loans that are not fully paid
    });

    if (activeLoan) {
      return res.status(400).json({
        message:
          "You already have an active loan. Please repay it before applying for a new one.",
      });
    }

    // Calculate interest and total repayment
    const daysToRepayment = Math.ceil(
      (new Date(repaymentDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    const interestRate = 0.2;
    const interest = Number(loanAmount) * interestRate;
    const totalRepayment = Number(loanAmount) + Number(interest);

    // Create a new loan
    const loan = new Loan({
      userId,
      loanAmount,
      repaymentDate,
      interest,
      totalRepayment,
      remainingBalance: totalRepayment,
      status: "pending",
    });

    await loan.save();
    res
      .status(201)
      .json({ message: "Loan application submitted successfully!", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

// Fetch user loans
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a pending loan
router.put("/update/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { loanAmount, repaymentDate } = req.body;

  try {
    // Validate loan amount and repayment date
    if (!loanAmount || isNaN(loanAmount) || loanAmount <= 0) {
      return res
        .status(400)
        .json({ error: "Please enter a valid loan amount." });
    }

    if (!repaymentDate || new Date(repaymentDate) < new Date()) {
      return res
        .status(400)
        .json({ error: "Please select a valid future date." });
    }

    // Find the loan
    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found." });
    }

    // Check if the loan is pending
    if (loan.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending loans can be updated." });
    }

    // Calculate days to repayment
    const daysToRepayment = Math.ceil(
      (new Date(repaymentDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

    // Calculate interest and total repayment
    const interestRate = daysToRepayment <= 15 ? 0.15 : 0.2;
    const interest = Number(loanAmount) * interestRate;
    const totalRepayment = Number(loanAmount) + Number(interest);

    // Update the loan
    loan.loanAmount = Number(loanAmount);
    loan.repaymentDate = repaymentDate;
    loan.totalRepayment = totalRepayment;
    loan.interest = interest;
    loan.daysToRepayment = daysToRepayment;

    await loan.save();
    res.status(200).json({ message: "Loan updated successfully.", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

// Delete a pending loan
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found." });
    }

    // Check if the loan is pending
    if (loan.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending loans can be deleted." });
    }

    // Delete the loan
    await Loan.findByIdAndDelete(id);

    res.status(200).json({ message: "Loan deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

// Make a partial payment
router.post("/pay", authMiddleware, async (req, res) => {
  const { loanId, amount } = req.body;

  try {
    // Validate payment amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Please enter a valid payment amount." });
    }

    // Find the loan
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found." });
    }

    // Check if the loan is approved
    if (loan.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Only approved loans can be paid." });
    }

    // Check if the payment amount exceeds the remaining balance
    if (amount > loan.remainingBalance) {
      return res
        .status(400)
        .json({ message: "Payment amount exceeds remaining balance." });
    }

    // Update paidAmount and remainingBalance
    loan.paidAmount += amount;
    loan.remainingBalance -= amount;

    // Update loan status
    if (loan.remainingBalance === 0) {
      loan.status = "fully paid";
    } else {
      loan.status = "partially paid";
    }

    await loan.save();
    res.status(200).json({ message: "Payment successful.", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

module.exports = router;
