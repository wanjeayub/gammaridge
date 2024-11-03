const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const Loan = require("../models/loanModel.js");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    mobile,
    alternatemobile,
    photoURLFront,
    photoURLBack,
    terms,
  } = req.body;

  // Check if mobile numbers are the same (redundant as frontend should handle this too)
  if (mobile === alternatemobile) {
    return res
      .status(400)
      .json({ message: "Mobile numbers cannot be the same" });
  }

  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    name,
    email,
    password,
    mobile,
    alternatemobile,
    photoURLFront,
    photoURLBack,
    terms,
  });

  if (user) {
    res.status(201).json({ message: "User added successfully!" });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(404).json({ message: "User not found!" });

  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};

// Apply for Loan
const applyLoan = async (req, res) => {
  const { amount } = req.body;
  const myAmount = parseFloat(amount);
  const interest = 0.2 * myAmount;
  const totalLoan = parseFloat(myAmount + interest);

  try {
    // Check if the user has any unpaid loans
    const unpaidLoan = await Loan.findOne({
      userId,
      status: { $ne: "pending" },
    });

    if (unpaidLoan) {
      // User has an unpaid loan, block the new application
      return res.status(400).json({
        message:
          "You cannot apply for a new loan until the previous loan is paid in full.",
      });
    }

    const loan = await Loan.create({
      user: req.user._id,
      amount: myAmount,
      interest,
      totalLoan,
    });

    res.status(201).json(loan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

// Get User Loans
const getUserLoans = async (req, res) => {
  const loans = await Loan.find({ user: req.user._id });
  res.json(loans);
};

module.exports = { registerUser, loginUser, applyLoan, getUserLoans };
