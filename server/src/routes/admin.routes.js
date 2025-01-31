const express = require("express");
const router = express.Router();
const Loan = require("../models/Loan"); // Loan model
const User = require("../models/User"); // User model
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const {
    fullName,
    email,
    password,
    mobileNumber,
    alternateMobileNumber,
    profilePhoto,
    idFrontPhoto,
    idBackPhoto,
    idNumber,
  } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
      alternateMobileNumber,
      profilePhoto,
      idFrontPhoto,
      idBackPhoto,
      idNumber,
      role: "admin",
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// loan summary data
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    // Total amount borrowed
    const totalBorrowed = await Loan.aggregate([
      { $group: { _id: null, total: { $sum: "$loanAmount" } } },
    ]);

    // Total users registered (excluding admins)
    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });

    // Total interest earned
    const totalInterest = await Loan.aggregate([
      { $group: { _id: null, total: { $sum: "$interest" } } },
    ]);

    // Count pending loans
    const pendingLoans = await Loan.countDocuments({ status: "pending" });

    // Count approved loans
    const approvedLoans = await Loan.countDocuments({ status: "approved" });

    // Count fully paid loans
    const fullyPaidLoans = await Loan.countDocuments({ status: "fully paid" });

    res.json({
      totalBorrowed: totalBorrowed[0]?.total || 0,
      totalUsers,
      totalInterest: totalInterest[0]?.total || 0,
      pendingLoans,
      approvedLoans,
      fullyPaidLoans,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

// Approve a loan
router.put("/approve-loan/:id", authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

// Fetch all loans
router.get("/loans", authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.find().populate("userId", "fullName email");
    res.json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

// Mark loan as fully paid
router.put("/mark-paid/:id", authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found." });
    }

    // Update the loan details
    loan.paidAmount = loan.totalRepayment; // Mark the total amount as paid
    loan.remainingBalance = 0; // No remaining balance
    loan.status = "fully paid"; // Update status

    await loan.save(); // Save the changes

    res.json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

// Make a partial payment
router.put("/partial-payment/:id", authMiddleware, async (req, res) => {
  const { amount } = req.body;

  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found." });
    }

    // Validate the payment amount
    if (amount <= 0 || amount > loan.remainingBalance) {
      return res.status(400).json({ error: "Invalid payment amount." });
    }

    // Update the paid amount and remaining balance
    loan.paidAmount += amount;
    loan.remainingBalance = loan.totalRepayment - loan.paidAmount;

    // Update the loan status
    if (loan.remainingBalance === 0) {
      loan.status = "fully paid";
    } else {
      loan.status = "partially paid";
    }

    await loan.save();
    res.json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

// Change admin credentials
router.put("/change-credentials", authMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne();

    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    admin.username = username;
    admin.password = password; // Ensure password is hashed before saving
    await admin.save();

    res.json({ message: "Admin credentials updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

module.exports = router;
